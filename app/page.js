'use client';
import axios from 'axios';
import { useEffect } from 'react';
import { Header } from '../components/header/Header';
import { Loader } from '../components/loader/Loader';
import { SideNav } from '../components/sideNav/SideNav';
import { useReduce } from '../providers/useReducerProvider';
import { useLoader } from '../providers/LoaderContextProvider';
import { VideoList } from '../components/home/VideoList';
import Interceptor from '@/providers/AxiosInterseptor';
import { fetchVideos } from '@/utils/CachedApiHelper.js/utils';

const Home = () => {
	const { isLoader, setIsLoader } = useLoader();
	const { dispatch, setIsSideNav } = useReduce();

	const fetchInitialData = async () => {
		try {
			setIsLoader(true);
			const { data } = await fetchVideos();
			dispatch({ type: 'INITIALIZE_DATA', payload: data });
			setIsLoader(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchInitialData();
	}, [dispatch, setIsLoader]);

	const closeSideNav = () => {
		document.getElementById('sideNav').style.width = '0%';
		setIsSideNav(false);
	};
	return (
		<>
			<Interceptor />
			<Header />
			<SideNav />
			<div className="main" onClick={() => closeSideNav()}>
				{isLoader ? <Loader /> : <VideoList />}
			</div>
		</>
	);
};

export default Home;
