import React, { useEffect, useRef, useState } from 'react'

import LinksSocialRegistration from '../../components/linksSocialRegistration/LinksSocialRegistration'
import InputFormRegistration from '../../containers/InputFormRegistration/InputFormRegistration'

import './Registration.scss'

import { useNavigate } from 'react-router-dom'

// store
import { useAppDispatch } from '../../store'
import { setUser } from '../../store/userSlice'

// animated checkbox
import { useSpring, config, useSpringRef, useChain } from 'react-spring'

// firebase
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// validation ------------------------------------------------------------
import { PWD_REGEX, EMAIL_REGEX } from '../../containers/validation/Validation'
import ParticlesBgMain from '../../containers/particlesBgMain/ParticlesBgMain'
// -----------------------------------------------------------------------

const Registration = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [emailHadle, setEmailHadle] = useState('')

	// custom checkbox animated ------------------------------------------
	const [isChecked, setIsChecked] = useState(false)
	const checkboxAnimationRef = useSpringRef()
	const checkmarkAnimationRef = useSpringRef()
	const [checkmarkLength, setCheckmarkLength] = useState(null)
	const checkboxAnimationStyle = useSpring({
		backgroundColor: isChecked ? 'var(--btn-send-com)' : '#fff',
		borderColor: isChecked ? 'var(--btn-send-com)' : '#ddd',
		config: config.gentle,
		ref: checkboxAnimationRef,
	})
	const checkmarkAnimationStyle = useSpring({
		x: isChecked ? 0 : checkmarkLength,
		config: config.gentle,
		ref: checkmarkAnimationRef,
	})
	useChain(
		isChecked
			? [checkboxAnimationRef, checkmarkAnimationRef]
			: [checkmarkAnimationRef, checkboxAnimationRef],
		[0, 0.1] // -> delay by 0.1 seconds
	)
	const wrapperRef = useRef<HTMLElement>(null)

	// validation ------------------------------------------------------------

	const errRef = useRef(null)

	const [email, setEmail] = useState('')
	const [validEmail, setValidEmail] = useState(false)
	const [pwd, setPwd] = useState('')
	const [validPwd, setValidPwd] = useState(false)

	const [matchPwd, setMatchPwd] = useState('')
	const [validMatch, setValidMatch] = useState(false)

	const [errMsg, setErrMsg] = useState('')

	// email ----------------------------------------------
	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email))
	}, [email])

	// password ------------------------------------------
	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd))
		const match = pwd === matchPwd
		setValidMatch(match)
	}, [pwd, matchPwd])

	// err Mesage ---------------------------------------
	useEffect(() => {
		setErrMsg('')
	}, [email, pwd, matchPwd])

	// handleSubmit проверка введеных данных ------------------------------------------------
	// const handleSubmit = async (e) => {
	//   e.preventDefault();

	//   const v1 = EMAIL_REGEX.test(email);
	//   const v2 = PWD_REGEX.test(pwd);

	//   if (!v1 || !v2) {
	//     setErrMsg('Не правильный ввод');
	//     return;
	//   }

	//   setSuccess(true);
	// };

	// handleLogin -----------------------------------------------------
	const handleRegister = (email: string, password: string) => {
		const auth = getAuth()

		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				console.log(user)

				dispatch(
					setUser({
						email: user.email,
						token: user.refreshToken,
						id: user.uid,
					})
				)
				// alert('Email отправлен на вашу почту. Письмо может быть в папке спам.');
				navigate(`../login/user/id:${user.uid}`)
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(errorCode, errorMessage)
				// if (errorCode === 'auth/missing-password') alert('Введите пароль!');
				if (errorCode === 'auth/email-already-in-use')
					alert(
						'Такой пользователь существует! Зайдите под своим email и пароль или восстановите пароль.'
					)
			})
	}

	return (
		<main ref={wrapperRef} className='main registaration'>
			<ParticlesBgMain wrapperHeight={wrapperRef?.current?.clientHeight} />
			{/* <canvas className='particles-canv' data-color='#B99970'></canvas> */}
			{/* <Particles wrapperRef={wrapperRef} /> */}

			<section className='registaration-block'>
				<h2 className='ls-media__title'>Регистрация</h2>
				<section className='lr-form__social-reg-icon'>
					<LinksSocialRegistration />
					{errMsg ? (
						<p ref={errRef} className='errmsg' aris-live='assertive'>
							{errMsg}
						</p>
					) : null}
				</section>
				<section className='lr-form__inp-form inp-form'>
					<InputFormRegistration
						title='Регистрация'
						setEmailHadle={setEmailHadle}
						handleClick={handleRegister}
					/>
				</section>
			</section>
		</main>
	)
}

export default Registration
