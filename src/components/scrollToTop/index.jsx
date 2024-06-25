import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
	const location = useLocation()
	// Scroll to top if path changes
	useLayoutEffect(() => {
		window.scrollTo(0, 0)
		// document.getElementById('root')?.scrollTo(0, 0);
	}, [location.pathname])

	return null
}

export default ScrollToTop
