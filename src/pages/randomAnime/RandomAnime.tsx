import './RandomAnime.scss'
import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'

// import { useToggle } from '../../hooks/useToggle';
import FullDescItem from '../fullDescItem/FullDescItem'

// store
import { itemsAnime } from '../../store/animeSlice'

import Particles from '../../containers/particles/Particles'
import ParticlesBg from 'particles-bg'

type ParticlesBgProps = {
	position: string
	marginLeft: string
	marginRight: string
	left: number
	right: number
	textAlign: string
	zIndex: number
	// width: string
	height: number
}

const RandomAnime = () => {
	// const [toggleRandom, setToggleRandom] = useState(true);
	const animeItems = useSelector(itemsAnime)
	const wrapperRef = useRef(null)
	return (
		<main ref={wrapperRef} className='main anime-random'>
			{animeItems.length !== 0 && (
				<ParticlesBg
					color='#d1aee3'
					num={150}
					type='cobweb'
					bg={
						{
							position: 'absolute',
							marginLeft: 'auto',
							marginRight: 'auto',
							left: 0,
							right: 0,
							textAlign: 'center',
							zIndex: -999,
							width: '100%',
							height: 1840,
						} as any
					}
				/>
			)}
			{/* <canvas className='particles-canv' data-color='#B99970'></canvas> */}
			{/* <Particles wrapperRef={wrapperRef} /> */}

			<div className='anime-random__wrap'>
				{/* <div className="anime__title"></div>
        <div className="anime__sort"></div> */}
				<div className='anime-random__list-items'>
					<FullDescItem flagRandomAnime={true} />
				</div>
			</div>
		</main>
	)
}
export default RandomAnime
