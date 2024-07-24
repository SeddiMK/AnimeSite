import './Main.scss'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import VideoListItem from '../../components/videoListItem/VideoListItem'

import Particles from '../../containers/particles/Particles'
import ParticlesBg from 'particles-bg'

// store
import { itemsAnime } from '../../store/animeSlice'
import ParticlesBgMain from '../../containers/particlesBgMain/ParticlesBgMain'

const Main = () => {
	const wrapperRef = useRef<HTMLElement>(null)
	const animeItems = useSelector(itemsAnime)
	// const location = useLocation()

	return (
		<main ref={wrapperRef} className='main anime'>
			{animeItems.length !== 0 && <ParticlesBgMain wrapperHeight={4475} />}

			<div className='anime__wrap'>
				{/* <div className="anime__title"></div>
        <div className="anime__sort"></div> */}
				<div className='anime__list-items'>
					<VideoListItem flagNewList={false} flagMain={true} />
				</div>
			</div>
		</main>
	)
}
export default Main
