import './Main.scss'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import VideoListItem from '../../components/videoListItem/VideoListItem'

import Particles from '../../containers/particles/Particles'
import ParticlesBg from 'particles-bg'

// store
import { itemsAnime } from '../../store/animeSlice'

const Main = () => {
	const wrapperRef = useRef(null)
	const animeItems = useSelector(itemsAnime)
	const location = useLocation()

	useEffect(() => {
		// console.log(
		// 	wrapperRef.current?.clientHeight,
		// 	'wrapperRef.current?.clientHeight'
		// )
		// console.log(height, 'height')
		console.log(location, 'location')
	}, [location.pathname])

	// console.log(animeItems)
	// console.log(animeItems.length)
	return (
		<main ref={wrapperRef} className='main anime'>
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
							height: 7220,
						} as any
					}
				/>
			)}
			{/* <canvas className='particles-canv' data-color='#B99970'></canvas> */}
			{/* <Particles wrapperRef={wrapperRef} /> */}

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
