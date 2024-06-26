import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ refEl }) => {
	const location = useLocation()
	// Scroll to top if path changes location.pathname
	useLayoutEffect(() => {
		if (!!document.getElementById('root')) {
			document.getElementById('root').scroll({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		}

		// console.log(performance.memory) // memory info
	}, [location.pathname])

	return null
}

export default ScrollToTop
