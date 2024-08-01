import React, { useRef } from 'react'
import style from './ErrorSearch.module.scss'

const ErrorSearch: React.FC = () => {
	const wrapperRef = useRef(null)
	return (
		<main ref={wrapperRef} className='main errorSearch'>
			<section className={style.error}>
				<div className={style.text}>
					<h1>Ой... такого аниме не существует. </h1>
					<p>Вы ввели недопустимое значение в строку поиска.</p>
					{/* <h3>На данный момент есть страницы: Home, About us, Contacts </h3> */}
				</div>
				{/* <div className={style.buttonBack}>
          <Link to="/" className="button btn">
            Вернуться на домашнюю страницу
          </Link>
        </div> */}
			</section>
		</main>
	)
}

export default ErrorSearch
