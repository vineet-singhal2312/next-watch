import { MdDelete } from 'react-icons/md';
import Link from 'next/link';
import { useAuth } from '../../providers/AuthProvider';
import { usePlaylist } from '../../providers/PlayListContextProvier';
import { ApiService } from '../../utils/ApiServices';
import Image from 'next/image';

export const PlaylistVideoCard = ({ video, playlistId }) => {
	const { playlistDispatch } = usePlaylist();
	const { token } = useAuth();

	const deleteVideoFromPlayList = async (playlistId, videoId) => {
		const data = await ApiService(
			'delete',
			{
				headers: { authorization: token },

				data: { playlistId, videoId },
			},
			'playlists/videos'
		);

		playlistDispatch({ type: 'ADD_PLAYLIST', payload: data.result });
	};
	return (
		<>
			{' '}
			<Link className="link playlist-videos-card" href={`/videos/${video._id}`}>
				<Image width={500} height={500} src={video.img} className="playlist-card-img" alt="img" />

				<div className="playlist-videos-card-content">
					<p>{video.name}</p>
					<Link className="link playlist-videos-card-delete-btn" href="/playlist">
						<div onClick={() => deleteVideoFromPlayList(playlistId, video._id)}>
							<MdDelete />
						</div>
					</Link>
				</div>
			</Link>
		</>
	);
};
