'use client';
import { VideoListCard } from './VideoListCard';
import { useReduce } from '../../providers/useReducerProvider';

export const VideoList = () => {
	const { state } = useReduce();

	return (
		<>
			<div className="product-list">
				{state.Data.map((item) => (
					<VideoListCard key={item._id} item={item} />
				))}
			</div>
		</>
	);
};
