import { MdDelete } from 'react-icons/md';
import Link from 'next/link';
import { useHistory } from '../../providers/HistoryContextProvider';
import { useAuth } from '../../providers/AuthProvider';
import { ApiService } from '../../utils/ApiServices';
import Image from 'next/image';

export const HistoryCard = ({ item }) => {
	const { setHistoryData } = useHistory();
	const { token } = useAuth();

	const deleteHistoryVideo = async (_id) => {
		try {
			const data = await ApiService(
				'delete',
				{
					headers: { authorization: token },

					data: { historyVideo_id: _id },
				},
				'historyvideos'
			);

			setHistoryData(data.result[0].videos);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{' '}
			<Link className="link history-card" href={`/videos/${item._id}`}>
				<Image src={item.img} width={500} height={500} className="history-card-img" alt="img" />

				<div className="history-card-content">
					{item.name}
					<Link href="/history" className="link history-card-delete-btn">
						<div onClick={() => deleteHistoryVideo(item._id)}>
							<MdDelete />
						</div>
					</Link>
				</div>
			</Link>
		</>
	);
};
