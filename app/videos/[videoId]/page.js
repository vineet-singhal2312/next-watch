'use client';
import { Header } from '../../../components/header/Header';
import { SideNav } from '../../../components/sideNav/SideNav';
// import { useParams } from 'react-router-dom';
// import { useRouter } from 'next/router';
import { useReduce } from '../../../providers/useReducerProvider';
import { usePlaylist } from '../../../providers/PlayListContextProvier';
import { useEffect } from 'react';
import axios from 'axios';
import { UserActivityModel } from '../../../components/userActivityModel/UserActivityModel';
import { Loader } from '../../../components/loader/Loader';
import { useLoader } from '../../../providers/LoaderContextProvider';
import { useAuth } from '../../../providers/AuthProvider';
// import { PlayListModal } from '@/components/videopage/PlayListModal';
// import { VideoCard } from '@/components/videopage/videoPageCard/VideoCard';
import { PlayListModal } from '@/components/videopage/PlayListModal';
import { VideoCard } from '@/components/videopage/videoPageCard/VideoCard';

const VideoPage = ({ params }) => {
	const { state, dispatch, setIsSideNav } = useReduce();
	const { isLoader, setIsLoader, isAddLoader } = useLoader();
	const { loginStatus } = useAuth();
	const { playlistState, isPlayListVideoAddModel, playlistDispatch } = usePlaylist();
	// const router = useRouter();
	const { videoId } = params;
	const fetchData = async () => {
		setIsLoader(true);

		try {
			const res2 = await axios.get(`https://blue-aware-cougar.cyclic.cloud/videos/${videoId}`);
			dispatch({
				type: 'INITIALIZE_PRODUCT',

				payload: res2.data,
			});

			playlistDispatch({
				type: 'CLOSE_MODAL',
			});
			setIsLoader(false);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchData();
	}, [playlistDispatch, setIsLoader, dispatch, videoId]);

	const item = state.product;

	const closeSideNav = () => {
		document.getElementById('sideNav').style.width = '0%';
		setIsSideNav(false);
	};
	return (
		<>
			<SideNav />
			<Header />
			{isPlayListVideoAddModel && <UserActivityModel description="Video is added..." />}
			{isAddLoader && <UserActivityModel description="Loading..." />}
			{loginStatus && <UserActivityModel description="You haven't logged in!!" />}
			
			{playlistState.isModal && <PlayListModal item={item} />}
			<div className="video-page-background" onClick={() => closeSideNav()}>
				<div className="Vedio-page-content">{isLoader ? <Loader /> : <VideoCard item={item} />}</div>
			</div>
		</>
	);
};

export default VideoPage;
