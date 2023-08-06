'use client';
import { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
	const [isLoader, setIsLoader] = useState(true);
	const [isSmallLoader, setIsSmallLoader] = useState(false);

	const [isAddLoader, setIsAddLoader] = useState(false);

	return (
		<LoaderContext.Provider
			value={{
				isLoader,
				setIsLoader,
				isAddLoader,
				setIsAddLoader,
				isSmallLoader,
				setIsSmallLoader,
			}}
		>
			{children}
		</LoaderContext.Provider>
	);
}

export function useLoader() {
	return useContext(LoaderContext);
}
