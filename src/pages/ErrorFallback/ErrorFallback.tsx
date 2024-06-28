'use client'
import React from 'react'
import style from './ErrorFallback.module.scss'
import { useErrorBoundary } from 'react-error-boundary'

export const ErrorFallback = ({ error }) => {
	const { resetBoundary } = useErrorBoundary()

	return (
		<div role='alert' className={style.error}>
			<p className={style.text}>
				Что то пошло те так... Попробуйте перезагрузить страницу.
			</p>
			<pre className={style.textError} style={{ color: '#d1aee3' }}>
				{error.message}
			</pre>
			<button className={style.button} onClick={() => window.location.reload()}>
				Нажмите, чтобы попробовать снова.
			</button>
		</div>
	)
}
