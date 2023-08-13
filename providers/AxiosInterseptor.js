import { useCallback, useEffect } from 'react';
import axios from 'axios';

const Interceptor = () => {
	const addErrorInterceptor = useCallback(() => {
		axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response) {
					const code = error.response.status;
					const message = error.response.data?.message;
					if (code === 401 && message === 'Invalid Token') {
						typeof window !== 'undefined' ? localStorage?.removeItem('login') : null;
					}
					console.log('interseptor');
				}
			}
		);
	}, []);

	useEffect(() => {
		addErrorInterceptor();
	}, [addErrorInterceptor]);

	return null;
};

export default Interceptor;
