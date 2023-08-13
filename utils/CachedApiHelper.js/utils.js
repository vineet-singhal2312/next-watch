import axios from 'axios';

export const fetchVideos = async () => {
	const result = await axios.get('https://blue-aware-cougar.cyclic.cloud/videos');
	return result;
};
