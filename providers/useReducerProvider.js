'use client';
import { createContext, useContext, useReducer, useState } from 'react';

const ReducerContext = createContext();

export function ReducerProvider({ children }) {
	const [isSideNav, setIsSideNav] = useState(false);
	const [state, dispatch] = useReducer(reducer, {
		history: [],
		watchLater: [],
		likedVideos: [],
		Data: [],
		product: {},
	});
	function reducer(state, value) {
		switch (value.type) {
			case 'INITIALIZE_DATA':
				return {
					...state,
					Data: value.payload,
				};
			case 'SET_LIKEDVIDEOS':
				return {
					...state,
					likedVideos: value.payload,
				};

			case 'SET_WATCHLATERVIDEOS':
				return {
					...state,
					watchLater: value.payload,
				};
			case 'INITIALIZE_PRODUCT':
				return {
					...state,
					product: value.payload,
				};

			default:
				return console.log('error');
		}
	}

	return <ReducerContext.Provider value={{ state, dispatch, isSideNav, setIsSideNav }}>{children}</ReducerContext.Provider>;
}

export function useReduce() {
	return useContext(ReducerContext);
}
