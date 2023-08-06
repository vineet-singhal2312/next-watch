'use client';
import { useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { Loader } from '../../components/loader/Loader';
import { SideNav } from '../../components/sideNav/SideNav';
import { useLoader } from '../../providers/LoaderContextProvider';
import { useReduce } from '../../providers/useReducerProvider';
// import { PlaylistCard } from './PlaylistCard';
import { usePlaylist } from '../../providers/PlayListContextProvier';
import { ApiService } from '../../utils/ApiServices';
import { useAuth } from '../../providers/AuthProvider';
import { PlaylistCard } from '@/components/playlist/PlaylistCard';
const PlayList = () => {
	const { playlistState, playlistDispatch } = usePlaylist();
	const { setIsSideNav } = useReduce();
	const { isLoader, setIsLoader } = useLoader();
	const { token } = useAuth();
	const fetchData = async () => {
		setIsLoader(true);
		try {
			const data = await ApiService('get', { headers: { authorization: token } }, 'playlists');

			playlistDispatch({ type: 'ADD_PLAYLIST', payload: data.result });
			setIsLoader(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [playlistDispatch, setIsLoader, token]);
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
				<div className="playlist-videos-main" onClick={() => closeSideNav()}>
					<h2 className="page-heading-playlist">PLAYLISTS</h2>

					{playlistState.playlist.length === 0 ? (
						<div className="playlist-videos-main">
							{' '}
							<h1>You haven't added any playlist yet... </h1>
						</div>
					) : (
						<div>
							{playlistState.playlist.map((item) => (
								<PlaylistCard key={item._id} playlist={item} />
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default PlayList;
