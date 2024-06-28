import './RandomAnime.scss'
import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'

// import { useToggle } from '../../hooks/useToggle';
import FullDescItem from '../fullDescItem/FullDescItem'

// store
import { itemsAnime } from '../../store/animeSlice'

import Particles from '../../containers/particles/Particles'
import ParticlesBg from 'particles-bg'
import ParticlesBgMain from '../../containers/particlesBgMain/ParticlesBgMain'

// type ParticlesBgProps = {
// 	position: string
// 	marginLeft: string
// 	marginRight: string
// 	left: number
// 	right: number
// 	textAlign: string
// 	zIndex: number
// 	// width: string
// 	height: number
// }

const RandomAnime = () => {
	// const [toggleRandom, setToggleRandom] = useState(true);
	// const animeItems = useSelector(itemsAnime)
	const wrapperRef = useRef<HTMLElement>(null)
	return (
		<main ref={wrapperRef} className='main anime-random'>
			<ParticlesBgMain wrapperHeight={wrapperRef?.current?.clientHeight} />

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
