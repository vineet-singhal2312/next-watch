import { FaThumbsDown } from 'react-icons/fa';
import { useReduce } from '../../providers/useReducerProvider';
import Link from 'next/link';
import { useAuth } from '../../providers/AuthProvider';
import { DeleteFromList } from '../../utils/DeleteFromList';
import Image from 'next/image';

export const LikedVideosCard = ({ item }) => {
	const { token } = useAuth();
	const { dispatch } = useReduce();
	return (
		<>
			{' '}
			<Link className="link like-videos-card" href={`/videos/${item._id}`}>
				<Image width={500} height={500} src={item.img} className="like-videos-card-img" alt="img" />

				<div className="like-videos-card-content">
					{item.name}
					<Link className="link like-videos-card-delete-btn" href="/liked">
						<div onClick={() => DeleteFromList(item, token, dispatch, 'likedvideos', 'SET_LIKEDVIDEOS')}>
							<FaThumbsDown />
						</div>
					</Link>
				</div>
			</Link>
		</>
	);
};
