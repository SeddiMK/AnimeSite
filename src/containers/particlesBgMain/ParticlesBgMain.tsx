import React, { useEffect, useState } from 'react'
import ParticlesBg from 'particles-bg'
import { useSelector } from 'react-redux'

// import { useWindowHeight } from '@react-hook/window-size'
// import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import { itemsAnimeSearch } from '../../store/searchSlice'

import { itemsAnime } from '../../store/animeSlice'

const ParticlesBgMain = ({ wrapperHeight }: any) => {
	const animeSearchItems = useSelector(itemsAnimeSearch)
	const animeItemsRedux = useSelector(itemsAnime)
	// const onlyHeight = useWindowHeight()
	let { status } = useSelector((state: RootState) => state.animeSlice)

	// const navigate = useNavigate()
	// const location = useLocation()
	const [heightWrp, setHeightWrp] = useState<string | number>('100vh')

	useEffect(() => {
		if (wrapperHeight !== undefined) setHeightWrp(wrapperHeight)
	}, [animeSearchItems, animeItemsRedux, wrapperHeight])

	// console.log(navigate, 'navigate') (animeSearchItems?.length !== 0 || animeItemsRedux?.length !== 0) &&
	// console.log(location.pathname, 'location.pathname')

	// console.log(
	// 	animeSearchItems?.length !== 0 || animeItemsRedux?.length !== 0,
	// 	'animeSearchItems?.length !== 0 || animeItemsRedux?.length !== 0'
	// )

	// console.log(heightWrp, 'heightWrp-----  ParticlesBgMain')
	// console.log(wrapperHeight, 'wrapperHeight')

	return (
		<ParticlesBg
			color='#d1aee3'
			num={100}
			type='cobweb'
			bg={
				{
					position: 'absolute',
					marginLeft: 'auto',
					marginRight: 'auto',

					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					textAlign: 'center',
					zIndex: -999,
					width: '100%',
					height: heightWrp,
				} as any
			}
		/>
	)
}
export default ParticlesBgMain
