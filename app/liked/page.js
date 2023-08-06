'use client';
import { Header } from '../../components/header/Header';
import { SideNav } from '../../components/sideNav/SideNav';
import { useReduce } from '../../providers/useReducerProvider';
import { useEffect } from 'react';
import { Loader } from '../../components/loader/Loader';
import { useLoader } from '../../providers/LoaderContextProvider';
import { useAuth } from '../../providers/AuthProvider';
import { ApiService } from '../../utils/ApiServices';
import { LikedVideosCard } from '@/components/likedvideos/LikedVideosCard';
const LikedVideos = () => {
	const { state, dispatch, setIsSideNav } = useReduce();
	const { isLoader, setIsLoader } = useLoader();
	const { token } = useAuth();
	const fetchData = async () => {
		setIsLoader(true);
		try {
			const data = await ApiService('get', { headers: { authorization: token } }, 'likedvideos');

			dispatch({ type: 'SET_LIKEDVIDEOS', payload: data.result[0]?.videos || [] });
			setIsLoader(false);
		} catch (error) {
			console.log(error, 'axios error');
		}
	};

	useEffect(() => {
		fetchData();
	}, [dispatch, setIsLoader, token]);

	const closeSideNav = () => {
		document.getElementById('sideNav').style.width = '0%';
		setIsSideNav(false);
	};
	return (
		<>
			<Header />
			<SideNav />

			{isLoader ? (
				<Loader />
			) : (
				<div className="like-videos-main" onClick={() => closeSideNav()}>
					<h2 className="page-heading-likedvideos">LIKED VIDEOS</h2>

					{state.likedVideos.length === 0 ? (
						<div className="like-videos-main">
							{' '}
							<h1>You haven't liked any video yet... </h1>
						</div>
					) : (
						<div className="like-videos-list">
							{state.likedVideos.map((item) => (
								<LikedVideosCard key={item._id} item={item} />
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default LikedVideos;
