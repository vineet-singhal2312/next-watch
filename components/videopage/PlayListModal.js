import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAuth } from '../../providers/AuthProvider';
import { ApiService } from '../../utils/ApiServices';
import { usePlaylist } from '../../providers/PlayListContextProvier';

export const PlayListModal = ({ item }) => {
	const { playlistDispatch, playlistState, setIsPlayListVideoAddModel } = usePlaylist();
	const [userPlaylistName, setUserPlaylistName] = useState('');
	const { token, setLoginStatus } = useAuth();
	const fetchData = async () => {
		try {
			const data = await ApiService(
				'get',
				{ headers: { authorization: token } },

				'playlists'
			);
			playlistDispatch({
				type: 'ADD_PLAYLIST',
				payload: data.result,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [playlistDispatch, token]);

	const takePlayListName = (e) => {
		e.preventDefault();
		const playlistNameGivenByUser = e.target.value;

		setUserPlaylistName(playlistNameGivenByUser);
	};

	const addPlayList = async (setLoginStatus) => {
		try {
			const data = await ApiService(
				'post',
				{
					playlistName: userPlaylistName,
				},
				'playlists',
				{ headers: { authorization: token } }
			);
			playlistDispatch({
				type: 'ADD_PLAYLIST',
				payload: data.result,
			});
			setUserPlaylistName('');
		} catch (error) {
			console.log(error, 'axios error');
			setLoginStatus(true);

			setTimeout(() => {
				setLoginStatus(false);
			}, 3000);
		}
	};

	const addVideoInPlayList = async (playlist) => {
		setIsPlayListVideoAddModel(true);

		try {
			ApiService(
				'post',
				{
					playlistId: playlist._id,
					videoId: item._id,
				},
				'playlists/videos',
				{ headers: { authorization: token } }
			);

			setTimeout(() => {
				setIsPlayListVideoAddModel(false);
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="playlist-modal">
			<div className="playlist-modal-title">
				<h3>ADD PLAYLIST</h3>
				<div className="close-model">
					<IoClose
						color="white"
						onClick={() =>
							playlistDispatch({
								type: 'CLOSE_MODAL',
							})
						}
					/>
				</div>{' '}
			</div>
			<div className="playlist-modal-list">
				<ul className="playlist-modal-list-list">
					{playlistState.playlist?.map((playlist) => (
						<li
							className="playlist-modal-list-item"
							onClick={() => {
								addVideoInPlayList(playlist);
								playlistDispatch({
									type: 'CLOSE_MODAL',
								});
							}}
						>
							{' '}
							{playlist.playlistName}
						</li>
					))}
				</ul>
			</div>
			<form className="playlist-modal-input-div">
				<input
					type="text"
					value={userPlaylistName}
					className="playlist-modal-input"
					placeholder="add playlist.."
					onChange={takePlayListName}
				/>
				<button
					className="playlist-modal-input-button"
					onClick={(e) => {
						e.preventDefault();
						addPlayList(setLoginStatus);
					}}
				>
					ADD
				</button>
			</form>
		</div>
	);
};
