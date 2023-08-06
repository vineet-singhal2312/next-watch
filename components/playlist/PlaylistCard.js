'use client';
import { PlaylistVideoCard } from './PlaylistVideoCard';
import { MdDelete } from 'react-icons/md';
import { usePlaylist } from '../../providers/PlayListContextProvier';
import { useAuth } from '../../providers/AuthProvider';
import { ApiService } from '../../utils/ApiServices';

export const PlaylistCard = ({ playlist }) => {
	const { playlistDispatch } = usePlaylist();
	const { token } = useAuth();
	const deletePlayList = async (playlistId) => {
		const data = await ApiService(
			'delete',
			{
				headers: { authorization: token },

				data: { playlistId },
			},
			'playlists'
		);

		playlistDispatch({ type: 'ADD_PLAYLIST', payload: data.result });
	};

	return (
		<>
			{' '}
			{playlist.videos.length > 0 ? (
				<div className="playlist-card ">
					<div className="playlist-name-div">
						<h1 className="playlist-name">{playlist.playlistName}</h1>
						<div className="playlis-delete-btn" onClick={() => deletePlayList(playlist._id)}>
							<MdDelete />
						</div>
					</div>
					<div className="playlist-videos">
						{playlist.videos.map((video) => (
							<PlaylistVideoCard key={video._id} video={video} playlistId={playlist._id} />
						))}
					</div>
				</div>
			) : (
				<div className="playlist-card ">
					<div className="playlist-name-div">
						<h1 className="playlist-name">{playlist.playlistName}</h1>{' '}
						<div className="playlis-delete-btn" onClick={() => deletePlayList(playlist._id)}>
							<MdDelete />
						</div>
					</div>
					<div className="empty-playlist-videos">
						<h1 className="empty-discription">This playlist is empty....</h1>
					</div>
				</div>
			)}
		</>
	);
};
