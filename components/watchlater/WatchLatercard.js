import { MdDelete } from 'react-icons/md';
import { useReduce } from '../../providers/useReducerProvider';
import { useAuth } from '../../providers/AuthProvider';
import { DeleteFromList } from '../../utils/DeleteFromList';
import Link from 'next/link';
import Image from 'next/image';

export const WatchLaterCard = ({ item }) => {
	const { dispatch } = useReduce();
	const { token } = useAuth();

	return (
		<>
			{' '}
			<Link className="link watchlater-card" href={`/videos/${item._id}`}>
				<Image width={200} height={200} src={item.img} className="watchlater-card-img" alt="img" />

				<div className="watchlater-card-content">
					{item.name}

					<Link className="link watchlater-card-delete-btn" href="/later">
						<div onClick={() => DeleteFromList(item, token, dispatch, 'watchlatervideos', 'SET_WATCHLATERVIDEOS')}>
							<MdDelete />
						</div>
					</Link>
				</div>
			</Link>
		</>
	);
};
