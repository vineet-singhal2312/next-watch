import axios from 'axios';

export const DeleteFromList = async (item, token, dispatch, routeEndPoint, dispatchType) => {
	try {
		const { data } = await axios.delete(
			`https://blue-aware-cougar.cyclic.cloud/${routeEndPoint}`,
			// `http://localhost:8000/${routeEndPoint}`,

			{
				headers: { authorization: token },

				data: { Id: item._id },
			}
		);

		dispatch({ type: dispatchType, payload: data.result[0].videos });
	} catch (error) {
		console.log(error, 'exios error');
	}
};
