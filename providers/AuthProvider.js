'use client';

import { createContext, useContext } from 'react';
import { useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const {
		isUserLoggedIn,
		token: savedToken,
		name: savedUserName,
	} = (typeof window !== 'undefined' ? JSON.parse(window.localStorage?.getItem('login')) : null) || {
		isUserLoggedIn: false,
		token: null,
		name: null,
	};

	const [isUserLogin, setLogin] = useState(isUserLoggedIn);
	const [token, setToken] = useState(savedToken);
	const [userName, setUserName] = useState(savedUserName);
	const [loginFailedModel, setLoginFailedModel] = useState(false);
	const [loginStatus, setLoginStatus] = useState(false);

	return (
		<AuthContext.Provider
			value={{
				isUserLogin,
				token,
				loginFailedModel,
				setLoginFailedModel,
				setToken,
				setLogin,
				userName,
				setUserName,
				loginStatus,
				setLoginStatus,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
