import './NewList.scss'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import VideoListItem from '../../components/videoListItem/VideoListItem'

// store
import { itemsAnime } from '../../store/animeSlice'

import Particles from '../../containers/particles/Particles'
import ParticlesBg from 'particles-bg'

const NewList = () => {
	const wrapperRef = useRef(null)
	const animeItems = useSelector(itemsAnime)

	return (
		<main ref={wrapperRef} className='main new-list'>
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

			<div className='new-list__wrap'>
				<div className='new-list__title'>
					Аниме {new Date().getFullYear()} года
				</div>
				{/* <div className="new-list__sort"></div> */}
				<div className='new-list__list-items'>
					<VideoListItem flagNewList={true} flagMain={false} />
				</div>
			</div>
		</main>
	)
}
export default NewList
