import './NewList.scss'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import VideoListItem from '../../components/videoListItem/VideoListItem'

// store
import { itemsAnime } from '../../store/animeSlice'

// import Particles from '../../containers/particles/Particles'
// import ParticlesBg from 'particles-bg'
import ParticlesBgMain from '../../containers/particlesBgMain/ParticlesBgMain'

const NewList = () => {
	const wrapperRef = useRef<HTMLElement>(null)
	const animeItems = useSelector(itemsAnime)

	console.log(animeItems)
	console.log(wrapperRef?.current?.clientHeight, 'newListRef?.current')

	return (
		<main ref={wrapperRef} className='main new-list'>
			{animeItems.length !== 0 && <ParticlesBgMain wrapperHeight={5130} />}

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
