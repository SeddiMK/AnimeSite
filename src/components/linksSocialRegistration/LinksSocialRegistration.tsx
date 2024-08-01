import React from 'react'
import { Link } from 'react-router-dom'
import { FaVk, FaGoogle, FaEnvelope } from 'react-icons/fa'
import './LinksSocialRegistration.scss'

const LinksSocialRegistration = () => {
	return (
		<section className='links-social-registration'>
			<div className='ls-media__block'>
				<div className='ls-media__top'>
					<h3 className='ls-media__text'>Через социальные сети</h3>
				</div>
				<div className='ls-media__links'>
					<Link
						className='ls-media__link vk-link'
						to='https://vk.com'
						target='blank'
					>
						<span>
							<FaVk />
						</span>
						<span>Вконтакте</span>
					</Link>
					<Link
						className='ls-media__link google-link'
						to='https://www.google.com'
						target='blank'
					>
						<span>
							<FaGoogle />
						</span>
						<span>Google</span>
					</Link>
					<Link
						className='ls-media__link mail-link'
						to='https://mail.ru'
						target='blank'
					>
						<span>
							<FaEnvelope />
						</span>
						<span>Mail</span>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default LinksSocialRegistration
