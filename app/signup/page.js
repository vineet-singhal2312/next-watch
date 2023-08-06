'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../providers/AuthProvider';
const SignUp = () => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const router = useRouter();
	const { loginFailedModel, setLoginFailedModel } = useAuth();
	const SignUpHandler = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				// "http://localhost:8000/signup",
				`https://blue-aware-cougar.cyclic.cloud/signup`,

				{
					userName,
					email,
					password: password1,
					confirmPassword: password2,
				}
			);

			setUserName('');
			setEmail('');
			setPassword1('');
			setPassword2('');
			router.push('/login');
		} catch (error) {
			setLoginFailedModel(true);
			setTimeout(() => {
				setLoginFailedModel(false);
			}, 5000);
			console.log(error.message);
			console.log(error.data);
		}
	};

	return (
		<div className="sign-up">
			<div className="contact-us">
				<form onSubmit={(e) => SignUpHandler(e)}>
					{loginFailedModel && (
						<p className="login-fail">
							Check your details!<br></br>Should have unique user name and Email!
						</p>
					)}
					<label>
						NAME <em>&#x2a;</em>
					</label>
					<input id="customerName" required type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
					<label>
						EMAIL <em>&#x2a;</em>
					</label>
					<input id="customerEmail" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<label>PASSWORD</label>
					<input id="customerPhone" type="password" value={password1} required onChange={(e) => setPassword1(e.target.value)} />
					<label>CONFIRM PASSWORD</label>
					<input id="customerPhone" type="password" value={password2} required onChange={(e) => setPassword2(e.target.value)} />

					<div className="login-signup-button-div">
						<button id="customerOrder" type="submit">
							SIGN UP
						</button>
						<Link href="/login">
							<button id="customerOrder">LOG IN</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
