import React from 'react'
import './Footer.scss'

const Footer: React.FC = () => {
	return (
		<footer className='footer'>
			<ul className='footer__nav'>
				<li className='footer__nav-link'>
					<a href='/'>Соглашение</a>
				</li>
				<li className='footer__nav-link'>
					<a href='/'>Конфиденциальность</a>
				</li>
				<li className='footer__nav-link'>
					<a href='/'>Для правообладателей</a>
				</li>
			</ul>
			<div className='footer__copy'>&copy; 2024 Copyright Text</div>
		</footer>
	)
}

export default Footer
