import './Main.scss'
import React, { useRef } from 'react'

import VideoListItem from '../../components/videoListItem/VideoListItem'
import Particles from '../../containers/particles/Particles'

const Main = () => {
	const wrapperRef = useRef(null)
	return (
		<main ref={wrapperRef} className='main anime'>
			<canvas className='particles-canv' data-color='#B99970'></canvas>
			<Particles wrapperRef={wrapperRef} />
			<div className='anime__wrap'>
				{/* <div className="anime__title"></div>
        <div className="anime__sort"></div> */}
				<div className='anime__list-items'>
					<VideoListItem flagMain={true} />
				</div>
			</div>
		</main>
	)
}
export default Main
