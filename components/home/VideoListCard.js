// import { Link } from "react-router-dom";
import Link from 'next/link';
import { useAuth } from '../../providers/AuthProvider';
import { ApiService } from '../../utils/ApiServices';
import Image from 'next/image';

export const VideoListCard = ({ item }) => {
	const { token } = useAuth();

	const postVideoInHistory = async (id) => {
		try {
			await ApiService(
				'post',
				{
					Id: id,
				},
				'historyvideos',
				{ headers: { authorization: token } }
			);
		} catch (error) {
			console.log(error, 'axios error');
		}
	};
	console.log(item.src);
	return (
		<>
			<Link className="link" href={`/videos/${item._id}`}>
				<div
					className="product-list-card"
					onClick={() => {
						postVideoInHistory(item._id);
					}}
				>
					{item.img && <Image src={item.img} className="video-list-videoplayer" width={500} height={500} alt="product list img" />}
					{/* <img alt="img" /> */}

					<div className="product-list-card-content">
						<h4 className="product-list-card-name">{item.name}</h4>
						<div className="product-list-card-details">
							<p>{item.views}</p>
							<p>{item.date}</p>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};
