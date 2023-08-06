'use client';
import axios from 'axios';
import { useEffect } from 'react';
import { Header } from '../components/header/Header';
import { Loader } from '../components/loader/Loader';
import { SideNav } from '../components/sideNav/SideNav';
import { useReduce } from '../providers/useReducerProvider';
import { useLoader } from '../providers/LoaderContextProvider';
import { VideoList } from '../components/home/VideoList';

const Home = () => {
	const { isLoader, setIsLoader } = useLoader();
	const { dispatch, setIsSideNav } = useReduce();
	useEffect(() => {
		setIsLoader(true);
		(async function () {
			try {
				const { data } = await axios.get('https://blue-aware-cougar.cyclic.cloud/videos');
				console.log({ data });
				dispatch({ type: 'INITIALIZE_DATA', payload: data });
				setIsLoader(false);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [dispatch, setIsLoader]);
	const closeSideNav = () => {
		document.getElementById('sideNav').style.width = '0%';
		setIsSideNav(false);
	};
	return (
		<>
			<Header />
			<SideNav />
			<div className="main" onClick={() => closeSideNav()}>
				{isLoader ? <Loader /> : <VideoList />}
			</div>
		</>
	);
};

export default Home;
