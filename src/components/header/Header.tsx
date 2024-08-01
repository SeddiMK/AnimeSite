import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import SearchHeader from '../searchHeader/SearchHeader'
import MenuList from '../menuList/MenuList'
import NavMobile from '../navMobile/NavMobile'

import { ErrorBoundary } from 'react-error-boundary'

import logoSvg from '../../assets/image/logo/ME.svg'

import './Header.scss'

// store -----------------------------------------------------------------
import { useAppDispatch } from '../../store'
import { removeUser } from '../../store/userSlice'
import { clickRandomHeder } from '../../store/searchSlice'

// hooks -----------------------------------------------------------------
import { useAuth } from '../../hooks/useAuth'

const Header: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { isAuth, id } = useAuth()
	const [toggleRandom, setToggleRandom] = useState(true)

	useEffect(() => {
		dispatch(clickRandomHeder(toggleRandom))
	}, [toggleRandom])

	// const { email, token, id } = useSelector(
	//   (state: RootState) => state.userSlice
	// );
	// const [burgerClick, setBurgerClick] = useState<boolean>(true);

	return (
		<header className='header'>
			<ErrorBoundary
				fallback={
					<p>Что то пошло не так. Попробуйте перезагрузить страницу.</p>
				}
			>
				<div className='header__container'>
					<Link to='/' className='header__logo'>
						{/* ME */}
						<img className='logo svg img ' src={logoSvg} alt='logo' />
						{/* <svg
							className='logo svg'
							version='1.0'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 124.000000 103.000000'
						>
							<g
								transform='translate(0.000000,103.000000) scale(0.100000,-0.100000)'
								fill='#000000'
								stroke='#FFFFFF'
							>
								<path
									d='M0 515 l0 -515 620 0 620 0 0 515 0 515 -620 0 -620 0 0 -515z m582
168 l48 -47 0 -188 0 -188 -50 0 -50 0 0 185 0 185 -45 0 -45 0 0 -185 0 -185
-50 0 -50 0 0 185 0 185 -45 0 -45 0 0 -185 0 -185 -50 0 -50 0 0 235 0 235
192 0 192 0 48 -47z m516 0 l-3 -48 -137 -3 -138 -3 0 -44 0 -45 140 0 140 0
0 -45 0 -45 -140 0 -140 0 0 -45 0 -44 138 -3 137 -3 3 -47 3 -48 -149 0 -149
0 -47 50 -46 49 0 179 c0 98 3 182 7 185 3 4 91 7 195 7 l189 0 -3 -47z'
								/>
							</g>
						</svg> */}
					</Link>
					<nav className='header__nav menu'>
						<ul className='nav-mobile'>
							<NavMobile />
						</ul>
						<ul className='menu__list active'>
							<MenuList />
						</ul>
						<ul className='menu__list-r'>
							<li className='menu__list-r search-header'>
								<SearchHeader />
							</li>
							<li
								className='menu__list-r login-btn'
								onClick={() => {
									if (isAuth) {
										dispatch(removeUser())
										navigate('/')
									}
								}}
							>
								<Link
									to={`/login`}
									preventScrollReset={true}
									className='menu__link'
									onClick={() =>
										localStorage.setItem(
											'remeberMe',
											JSON.stringify(Boolean(false))
										)
									}
									id='navbar-login'
								>
									<span className='material-symbols-outlined'>
										{isAuth ? 'logout' : 'login'}
									</span>
									<span>{isAuth ? 'Выйти' : 'Войти'}</span>
								</Link>
							</li>
							{isAuth && (
								<li className='menu__list-r log-user-cab'>
									<Link
										to={`login/user/id:${id}`}
										className='menu__link'
										id='cabinet'
									>
										Кабинет
									</Link>
								</li>
							)}
						</ul>
					</nav>
				</div>
			</ErrorBoundary>
		</header>
	)
}

export default Header
