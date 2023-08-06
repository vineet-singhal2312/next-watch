'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { SmallLoader } from '../../components/smallLoader/smallLoader';
import { useAuth } from '../../providers/AuthProvider';
import { useLoader } from '../../providers/LoaderContextProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LogIn = () => {
	const navigate = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setToken, setLogin, isUserLogin, setUserName, loginFailedModel, setLoginFailedModel } = useAuth();
	const { isSmallLoader, setIsSmallLoader } = useLoader();

	function loginUser(res) {
		setLogin(true);

		setToken(res.data.token);
		navigate.push('/');
		setUserName(res.data.userName);

		localStorage?.setItem(
			'login',
			JSON.stringify({
				isUserLoggedIn: true,
				token: res.data.token,
				name: res.data.userName,
			})
		);
		setIsSmallLoader(false);
	}
	const Logout = (e) => {
		e.preventDefault();
		localStorage?.removeItem('login');
		setLogin(false);
		setToken(null);
	};
	const LogInHandler = async (e) => {
		e.preventDefault();
		setIsSmallLoader(true);
		try {
			const res = await axios.post(
				// "http://localhost:8000/login",
				`https://blue-aware-cougar.cyclic.cloud/login`,

				{
					email,
					password,
				}
			);

			setEmail('');
			setPassword('');
			loginUser(res);
		} catch (error) {
			console.log({ error });
			setIsSmallLoader(false);
			setLoginFailedModel(true);
			setTimeout(() => {
				setLoginFailedModel(false);
			}, 3000);
			setEmail('');
			setPassword('');
		}
	};
	const loginAsGuest = async (e) => {
		e.preventDefault();
		setIsSmallLoader(true);

		try {
			const res = await axios.post(
				// 'http://localhost:8000/login',
				`https://blue-aware-cougar.cyclic.cloud/login`,

				{
					email: 'demoaccount@gmail.com',
					password: '123456',
				}
			);

			setEmail('');
			setPassword('');
			loginUser(res);
		} catch (error) {
			setIsSmallLoader(false);

			setLoginFailedModel(true);
			setTimeout(() => {
				setLoginFailedModel(false);
			}, 3000);
			setEmail('');
			setPassword('');
		}
	};
	return (
		<div className="log-in">
			{isSmallLoader ? (
				<SmallLoader />
			) : (
				<div className="contact-us">
					<form action="#" className="log-in-form" onSubmit={(e) => LogInHandler(e)}>
						{loginFailedModel && <p className="login-fail">Invalid Email address and Password!!</p>}

						<label htmlFor="customerEmail">
							EMAIL <em>&#x2a;</em>
						</label>
						<input id="customerEmail" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						<label htmlFor="customerPhone">
							PASSWORD <em>&#x2a;</em>
						</label>
						<input id="customerPhone" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />

						<div className="login-signup-button-div">
							{isUserLogin ? (
								<button id="customerOrder" onClick={(e) => Logout(e)}>
									LOG OUT
								</button>
							) : (
								<button disabled={isSmallLoader} id="customerOrder">
									{<p>LOG IN</p>}
								</button>
							)}
							<button id="customerOrder" disabled={isUserLogin || isSmallLoader} onClick={(e) => loginAsGuest(e)}>
								{<p>GUEST</p>}
							</button>
						</div>

						<p className="switch-page-description">
							create an account{' '}
							<Link href="/signup" className="switch-page-link">
								Sign Up
							</Link>
						</p>
					</form>
				</div>
			)}
		</div>
	);
};

export default LogIn;
