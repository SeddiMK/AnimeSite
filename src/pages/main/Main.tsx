import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import VideoListItem from '../../components/videoListItem/VideoListItem'
import './Main.scss'

import ParticlesBgMain from '../../containers/particlesBgMain/ParticlesBgMain'

// store
import { itemsAnime } from '../../store/animeSlice'

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
