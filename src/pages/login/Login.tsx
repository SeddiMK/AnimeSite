import './Login.scss'
import React, { useState, FC, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// firebase
import {
	getAuth,
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	sendPasswordResetEmail,
} from 'firebase/auth'

//store
import { useAppDispatch } from '../../store'
import { setUser } from '../../store/userSlice'
// import { fetchUserList } from '../../store/userSlice';

import InputFormRegistration from '../../containers/InputFormRegistration/InputFormRegistration'
import LinksSocialRegistration from '../../components/linksSocialRegistration/LinksSocialRegistration'

// import { useAuth } from '../../hooks/useAuth';

import Particles from '../../containers/particles/Particles'
import ParticlesBgMain from '../../containers/particlesBgMain/ParticlesBgMain'

// TS types
interface typeUserData {
	email: string | null
	token: string
	id: string
}

const Login: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const auth = getAuth()
	auth.useDeviceLanguage() // определение языка девайса

	const wrapperRef = useRef<HTMLElement>(null)

	const [emailHadle, setEmailHadle] = useState('')
	const [sendEmailReset, setSendEmailReset] = useState(false)
	const [notFaundEmail, setNotFaundEmail] = useState(false)

	// const { isAuth, email, id } = useAuth();
	// handleLogin -----------------------------------------------------------
	const handleLogin = (email: string, password: string) => {
		setEmailHadle(email)

		setPersistence(auth, browserSessionPersistence).then(() => {
			return signInWithEmailAndPassword(auth, email, password)
				.then(({ user }) => {
					dispatch(
						setUser({
							email: user.email,
							token: user.refreshToken,
							id: user.uid,
						})
					)

					// const userData: typeUserData = {
					//   email: user.email,
					//   token: user.refreshToken,
					//   id: user.uid,
					// };

					// localStorage.setItem('user', JSON.stringify(userData as any));
					// localStorage.clear();
					navigate(`user/id:${user.uid}`)
				})

				.catch(error => {
					const errorCode = error.code
					const errorMessage = error.message
					console.log(errorCode, errorMessage)
					if (errorMessage === 'auth/network-request-failed')
						alert('Что то пошло не так')
					if (email && password) alert('Такого пользователя не существует!')
				})
		})
	}

	// reset password ------------------------------------------------
	const resetPassword = async () => {
		try {
			if (emailHadle) {
				dispatch(
					setUser({
						email: emailHadle,
					})
				)
				console.log(emailHadle)

				await sendPasswordResetEmail(auth, emailHadle)
					.then(() => {
						console.log(auth, 'auth')

						// password reset email sent successfully
						if (auth.currentUser) setSendEmailReset(true)
						// alert(
						//   'Письмо с восстановдением пароля отправлено на вашу почту. Письмо может быть в папке спам.'
						// );
						// if (!isAuth) navigate(`resetPwd`);
						// if (auth.currentUser === null) alert('Не можем найти ваш email. Зарегестрируйтесь.');
						console.log(auth.currentUser, 'auth.currentUser')

						if (auth.currentUser === null) setNotFaundEmail(true)
					})
					.catch(error => {
						// There was an error verifying the email
						// Check the output of error.toString()
						// This is where you may want to show a pop-up dialog
						const errorCode = error.code
						const errorMessage = error.message
						if (errorCode === 'auth/email-already-in-use')
							alert(
								'Такой пользователь существует! Зайдите под своим email и пароль или восстановите пароль.'
							)
						console.log(errorCode, errorMessage)
					})
			} else {
				alert('Введите email для сброса. Не праильный email для сброса пароля.')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main ref={wrapperRef} className='main login'>
			<ParticlesBgMain wrapperHeight={wrapperRef?.current?.clientHeight} />

			<div className='form-login-registaration lr-form'>
				<div className='lr-form__social-media login-social-media'>
					<h2 className='ls-media__title'>Вход</h2>

					<LinksSocialRegistration />
					<span>- ИЛИ -</span>
				</div>
				<div className='lr-form__inp-form inp-form'>
					<InputFormRegistration
						title='Войти'
						handleClick={handleLogin}
						setEmailHadle={setEmailHadle}
					/>
					<div className='form__input form-group'></div>
					<div className='form__pass-request form-group'>
						<button className='btn-reset-pwd' onClick={() => resetPassword()}>
							Забыли пароль? Нажмите здесь.
						</button>{' '}
						<div className='poopup-reset-pwd'>
							{sendEmailReset && (
								<h3>
									Письмо с восстановлением пароля отправлено на указанную почту.
								</h3>
							)}
							{notFaundEmail && (
								<h3>Не можем найти ваш email. Зарегестрируйтесь.</h3>
							)}{' '}
						</div>
					</div>
					<div className='form__regisration-account'>
						<div className='form__regisration-account-block'>
							<div className='form__registration-link'>
								<Link to='/registration'>Зарегистрировать Аккаунт</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Login
