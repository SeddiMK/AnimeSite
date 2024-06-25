import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
	const location = useLocation()
	// Scroll to top if path changes
	useLayoutEffect(() => {
		// window.scroll({
		// 	top: 0,
		// 	left: 0,
		// 	behavior: 'smooth',
		// })
		// document.getElementById('root').scrollTo(0, 0)

		console.log(window.scrollY, 'window.scrollY')
		if (window.scrollY > 400) {
		}
		// document.getElementById('root').scroll({
		// 	top: 0,
		// 	left: 0,
		// 	behavior: 'smooth',
		// })
		document.querySelector('#root').scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}, [location.pathname])

	return null
}

export default ScrollToTop
