import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ refEl }) => {
	const location = useLocation()

	console.log(refEl)

	const [scroll, setScroll] = useState(false)
	// const updateScroll = () => {
	// 	if (!refEl.current) return

	// 	let isScroll = false
	// 	const heightTop = window.scrollY

	// 	if (refEl.current.offsetHeight < heightTop) isScroll = true

	// 	// if (heightHeaderRef.current.offsetHeight > heightTop) isScroll = false

	// 	setScroll(isScroll)
	// }
	// Scroll to top if path changes location.pathname
	useLayoutEffect(() => {
		// window.scroll({
		// 	top: 0,
		// 	left: 0,
		// 	behavior: 'smooth',
		// })
		// document.getElementById('root').scrollTo(0, 0)

		// console.log(
		// 	document.body.getBoundingClientRect(),
		// 	window.scrollY,
		// 	'document.body.getBoundingClientRect()'
		// )

		if (window.scrollY > 400) {
		}
		// document.getElementById('root').scroll({
		// 	top: 0,
		// 	left: 0,
		// 	behavior: 'smooth',
		// })

		// document.querySelector('#root').scroll({
		// 	top: 0,
		// 	left: 0,
		// 	behavior: 'smooth',
		// })

		// window.addEventListener('scroll', updateScroll)
		// updateScroll()
		// return () => {
		// 	window.removeEventListener('scroll', updateScroll)
		// }
	}, [location.pathname])

	return scroll
}

export default ScrollToTop
