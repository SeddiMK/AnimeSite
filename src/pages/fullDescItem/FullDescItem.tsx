import './FullDescItem.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSSTransition } from 'react-transition-group'

import useResizeObserver from 'use-resize-observer'

import FormMain from '../../components/formMain/FormMain'
import RatingStar from '../../components/ratingStar/RatingStar'
import VideoLink from '../../components/videoLink/VideoLink'

// store
import { RootState, useAppDispatch } from '../../store'
import {
	fetchAnimeListSlice,
	itemsAnime,
	type AnimeItems,
} from '../../store/animeSlice'
import { addListAnime } from '../../store/userSlice'
import {
	fetchAnimeSearchSlice,
	itemsAnimeSearch,
	setItemsSearch,
} from '../../store/searchSlice'

// skeleton
// import Skeleton from '../../containers/sceleton/Skeleton';
import SkeletonsFullDesc from '../../containers/SkeletonsFullDesc/SkeletonsFullDesc'

// error
import { ErrorFallback } from '../ErrorFallback/ErrorFallback'
import Error from '../error/Error'

import { useWindowHeight } from '@react-hook/window-size'
import ParticlesBgMain from '../../containers/particlesBgMain/ParticlesBgMain'

// ---------------------------------------------------------------------
type FullDescItemProps = {
	flagRandomAnime: boolean
	// elem: {
	// 	link: string
	// 	title: string
	// 	title_orig: string
	// }
}

const FullDescItem: React.FC<FullDescItemProps> = ({ flagRandomAnime }) => {
	const { id } = useParams<{
		id
	}>()

	const dispatch = useAppDispatch()
	let { status } = useSelector((state: RootState) => state.animeSlice)
	const randomHederClick = useSelector(
		(state: RootState) => state.searchSlice.randomHederClick
	)

	const skeletonsFullDesc = [...new Array(10)].map((_, i) => (
		<SkeletonsFullDesc key={i} />
	))

	// open form adaptiv
	const [leftOpenForm, setLeftOpenForm] = useState('37%')
	const [topOpenForm, setTopOpenForm] = useState('31rem')
	const [leftOpenFormComment, setLeftOpenFormComment] = useState('37%') // 37%
	const [topOpenFormComment, setTopOpenFormComment] = useState('') // 87rem

	// error -----------------------------------------------------------
	const [animeSearchItemsNetWTime, setAnimeSearchItemsNetWTime] =
		useState(false)

	// openComment ---------------------------------------------------
	const [openFormComent, setOpenFormComent] = useState(false)
	// const [openForm, setOpenForm] = useState(false);
	const [openFTop, setOpenFTop] = useState(false)
	const [openFBut, setOpenFBut] = useState(false)

	const [lengthComment, setLengthComment] = useState([])

	const [formStyle, setFormStyle] = useState({})
	const [limitPar, setLimitPar] = useState(100)

	const playerRef = useRef<null | HTMLDivElement>(null)
	const popupAddRef = useRef<null | HTMLDivElement>(null)
	const refWrp = useRef<null | HTMLDivElement>(null)
	const ref = useRef<null | HTMLDivElement>(null)

	const animeItems = useSelector(itemsAnime)

	const [popupAddList, setPopupAddList] = useState(false)

	const [isMount, setIsMount] = useState(false)

	const { width, height } = useResizeObserver<HTMLDivElement>({ ref })

	// adaptiv form comment -----------------------------------------------------
	// const { ref, width = 1920, height = 1500 } = useResizeObserver<HTMLElement>()
	// const onlyHeight = useWindowHeight()

	// добавляем в стили положение в зависимости от ширины viewport
	useEffect(() => {
		// 650+
		if (ref !== null && width !== undefined && width > 650) {
			setTopOpenFormComment('-35rem')
		}
		// 750
		if (ref !== null && width !== undefined && width <= 650) {
			setLeftOpenForm('-17%')
			setTopOpenForm('12rem')
			setLeftOpenFormComment('0%')
			setTopOpenFormComment('-32rem')
		}
		// 550
		if (ref !== null && width !== undefined && width <= 650) {
			// setLeftOpenForm('-17.5%')
		}

		if (ref !== null && width !== undefined && width <= 430) {
			setLeftOpenFormComment('0%')
		}

		// if (ref !== null && width !== undefined && width <= 515)
		//   setLeftOpenForm('7%');
	}, [width])

	const openFormTop = () => {
		setOpenFTop(true)
		setOpenFBut(false)
		setOpenFormComent(true)

		setFormStyle({
			left: leftOpenForm,
			top: topOpenForm,
		})
	}

	const openFormComment = () => {
		setOpenFBut(true)
		setOpenFTop(false)
		setOpenFormComent(true)

		setFormStyle({
			left: leftOpenFormComment,
			top: topOpenFormComment,
		})
	}

	// запрос для одного аниме
	const animeSearchItems = useSelector(itemsAnimeSearch)

	const [itemsAnmSch, setItemsAnmSch] = useState([])

	// const searchInpVal = useSelector(
	//   (state: RootState) => state.searchSlice.idFullDesc
	// );

	const itemAnime = animeSearchItems[0]?.material_data

	// fthAnimeSearchSlice -----------------------------
	const fthAnimeSearchSlice = (idAnime, searchInpVal) => {
		dispatch(fetchAnimeSearchSlice({ idAnime, searchInpVal, limitPar }))
		document.getElementById('root')?.scrollIntoView() // при перерисовке скорит на верх стр
	}
	// запрос fetch в redux
	const fthAnimeSlice = async yearNew => {
		dispatch(
			fetchAnimeListSlice({
				limitPar,
				yearNew,
			})
		)
		document.getElementById('root')?.scrollIntoView() // при перерисовке скорит на верх стр
	}

	// добавляем данные в redux при первом рендере -----------
	useEffect(() => {
		// console.log(
		//   !isMount,
		//   '!isMount ------11111111111111111111111111 ---------- первый рендер'
		// );
		if (!isMount) {
			if (id === undefined) fthAnimeSlice('')

			const array = ['q', 'w', 'x', 'a', 's', 'd', 'f', 'g', 't', 'i']
			const randomElement = array[Math.floor(Math.random() * array.length)]
			if (animeItems.length === 0 && id === undefined)
				fthAnimeSearchSlice('', randomElement)
			setIsMount(true)
		}
	}, [])
	// -------------------------------------------------------

	useEffect(() => {
		if (id !== undefined) fthAnimeSearchSlice(`&id=${id}`, '')
	}, [id])
	// --------------------------------------------------------

	useEffect(() => {
		if (flagRandomAnime && animeItems.length !== 0) {
			const randomItem = [
				...itemsAnmSch,
				animeItems[Math.floor(Math.random() * animeItems.length)],
			]
			// console.log(randomItem, '----------------------randomItem');

			dispatch(setItemsSearch(randomItem as []))
		}
	}, [flagRandomAnime, randomHederClick, isMount])

	// --- format date ------------------------------------------------------
	// Input date string
	const dateString = itemAnime?.aired_at

	// Parse the date string into a Date object
	const date = new Date(dateString)

	// Extract the month, day, and year
	const month = date.toLocaleString('default', { month: 'long' }) // "April"
	const day = date.getDate().toString().padStart(2, '0') // "04"
	const year = date.getFullYear() // 2024

	// Combine the parts into the desired format
	const formattedDate = `${day} ${month} ${year}` // Output: "04 April 2024"

	// open popup ---------------------------------------------------------
	const softOpeningPopup = () => {
		setPopupAddList(true)
		setTimeout(() => {
			setPopupAddList(false)
		}, 2000)
	}

	// error если долго(4000мс) грузится контент ------------------------------------
	// const error = useState((state: RootState) => state.searchSlice.error);
	useEffect(() => {
		// проверяем есть ли в массиве объект
		const errorInterval = () => {
			if (
				animeSearchItems[0]?.id === undefined ||
				animeSearchItems.length === 0 ||
				animeSearchItems === ('Network Error' as unknown as AnimeItems[])
			) {
				setInterval(() => {
					if (
						animeSearchItems[0]?.id === undefined ||
						animeSearchItems.length === 0 ||
						animeSearchItems === ('Network Error' as unknown as AnimeItems[])
					) {
						return setAnimeSearchItemsNetWTime(true)
					}
					// else return setAnimeSearchItemsNetWTime(false);
				}, 4000)
			}
		}

		return () => errorInterval()
	}, [])

	// console.log(itemRandomAnime, 'itemRandomAnime');
	// console.log(flagRandomAnime, 'flagRandomAnime');
	// console.log(animeItems, 'animeItems');
	// console.log(animeSearchItems, 'animeSearchItems');
	// console.log(itemAnimeSearchId, 'itemAnimeSearchId');
	// console.log(itemAnimeLink, 'itemAnimeLink');

	// {status === 'loading'

	// ref={ref} heightWrp={height}
	return (
		<main ref={ref} className='main full-desc-item'>
			{animeSearchItems.length !== 0 && (
				<ParticlesBgMain wrapperHeight={ref.current?.clientHeight} />
			)}

			{animeSearchItemsNetWTime && (
				<ErrorFallback
					error={
						'Время загрузки контента больше 4000мс. Попробуйте перезагрузить страницу.'
					}
				/>
			)}

			{animeSearchItems.length === 0 ||
			animeSearchItems === ('Network Error' as any) ||
			animeSearchItems[0]?.id === undefined ? (
				<SkeletonsFullDesc />
			) : (
				<>
					{animeSearchItems.length !== 0 &&
						animeSearchItems[0] !== undefined && (
							<>
								<div ref={refWrp} className='full-desc-item__wrap'>
									{/* <VideoLink linkVideo={animeSearchItems[0]?.link} />

            <div className="item-anime__title">
              {animeSearchItems[0]?.other_title}
            </div>

            <div className="item-anime__rating">
              {animeSearchItems[0]?.material_data.shikimori_rating}
              {'/ '}
              {animeSearchItems[0]?.material_data.shikimori_votes}
            </div>
            <div className="item-anime__kljkhkj"></div>
            <div className="item-anime__translation translation">
              <ul className="translation__list">
                {/* <li className="translation__item"> {elem.translation.title}</li>
              </ul>
            </div> */}

									<div className='main__content content'>
										<div className='content__media media'>
											<div className='media__left'>
												<div className='media__left-image wrap-img-media'>
													<img
														className='media__left-img img'
														src={
															itemAnime?.poster_url
																? itemAnime.poster_url
																: animeSearchItems[0]?.screenshots[0]
														}
														alt={`изображение постера аниме ${animeSearchItems[0]?.title}`}
													/>
												</div>
												<div className='media__left-buttons'>
													<button
														className='media__left-buttons-online btn-media-left btn'
														onClick={() =>
															playerRef.current?.scrollIntoView({
																behavior: 'smooth',
															})
														}
													>
														Смотреть онлайн
													</button>
													<button
														// ref={btnComTopRef}
														className='media__left-buttons-review btn-media-left btn'
														onClick={() => {
															openFormTop()
															// setOpenFormComent(!openFormComent);
														}}
													>
														Написать отзыв
													</button>
													{openFTop && (
														<FormMain
															setOpenFTop={setOpenFTop}
															setOpenFBut={setOpenFBut}
															openFormComent={openFormComent}
															setOpenFormComent={setOpenFormComent}
															setLengthComment={setLengthComment}
															formStyle={formStyle}
														/>
													)}

													<button
														className='media__left-add-list btn-media-left btn'
														onClick={() => {
															dispatch(addListAnime(animeSearchItems[0].id))
															softOpeningPopup()
															// setPopupAddList(!popupAddList);
														}}
													>
														Добавить в список
													</button>

													<CSSTransition
														nodeRef={popupAddRef}
														className='alert'
														in={popupAddList}
														unmountOnExit
														timeout={300}
													>
														{/* {popupAddList && (   )} */}
														<p
															ref={popupAddRef}
															className='media__left-add-list-popup'
														>
															Аниме добавлено в список.
														</p>
													</CSSTransition>
												</div>
												<div className='media__left-add'></div>
											</div>
											<div className='media__right'>
												<div className='media__rating-block rating'>
													<div className='rating__stars'>
														<span className='rating__star'>&#9733;</span>
														{itemAnime?.shikimori_rating ? (
															<>
																<span className='rating__num'>
																	{itemAnime?.shikimori_rating}
																</span>
																<span className='rating__votes'>
																	{' / '}
																	{itemAnime?.shikimori_votes}
																</span>
															</>
														) : (
															'нет рейтинга'
														)}
													</div>
													<div className='rating__grade-user'>
														<div className='rating__user-star'>
															<RatingStar />
														</div>
														<span>Оцените аниме</span>
													</div>
												</div>
												<div className='media__title title-top'>
													<h1 className='title-top__orign'>
														{animeSearchItems[0]?.title}
													</h1>
													<ul className='title-top__other-titles'>
														<li>
															<h4>{itemAnime?.other_titles_en}</h4>
														</li>
														<li>
															<h4>{itemAnime?.other_titles_jp}</h4>
														</li>
													</ul>
												</div>
												<dl className='media__desc desc-media'>
													<dt className='desc-media__dt'>Тип</dt>
													<dd className='desc-media__dd'>
														{itemAnime?.anime_kind}
													</dd>

													<dt className='desc-media__dt'>Жанр</dt>
													<dd className='desc-media__dd'>
														{/* itemAnime.anime_genres.length !== 0 && */}
														{itemAnime?.anime_genres?.map((el, ind) => (
															<span key={el + ind}>{el} </span>
														))}
													</dd>

													<dt className='desc-media__dt'>Год</dt>
													<dd className='desc-media__dd'>
														{animeSearchItems[0]?.year}
													</dd>

													<dt className='desc-media__dt'>Выпуск</dt>
													<dd className='desc-media__dd'>{formattedDate}</dd>

													<dt className='desc-media__dt'>Длительность</dt>
													<dd className='desc-media__dd'>
														{itemAnime?.duration ? itemAnime.duration : '23'}{' '}
														мин. ~ серия
													</dd>

													{/* <dt className="desc-media__dt">Озвучка</dt>
                    <dd className="desc-media__dd">
                      AniDUB, AniLibria, SHIZA Project, Студийная Банда,
                      AnimeVost, AniStar, AniRise, JAM CLUB, Amber, TVShows,
                      Субтитры, Dream Cast, КОМНАТА ДИДИ, AniDub Online
                    </dd> */}

													<dt className='desc-media__dt'>Актеры</dt>
													<dd className='desc-media__dd'>
														{itemAnime?.actors?.map((el, ind) => (
															<span key={el + ind}>{el} </span>
														))}
													</dd>

													<dt className='desc-media__dt'>Снят по манге</dt>
													<dd className='desc-media__dd'>
														{itemAnime?.anime_license_name}
													</dd>

													<dt className='desc-media__dt'>Рейтинг MPAA</dt>
													<dd className='desc-media__dd'>
														<span>{itemAnime?.rating_mpaa}</span>
													</dd>
													<dt className='desc-media__dt'>
														Возрастные ограничения
													</dt>
													<dd className='desc-media__dd'>
														<span className='desc-media__age-restrictions'>
															{itemAnime?.minimal_age
																? itemAnime.minimal_age
																: 0}
															+
														</span>
													</dd>
												</dl>
											</div>
										</div>
										<div className='content__media description'>
											<div className='description__text'>
												{itemAnime?.anime_description}
											</div>
										</div>

										<div className='content__screnshots screnshots-fulldesc'>
											<h3 className='screnshots-fulldesc__title'>Кадры</h3>
											<div className='screnshots-fulldesc__wrp'>
												{animeSearchItems[0]?.screenshots.map((el, ind) => (
													<div
														key={el + ind}
														className='screnshots-fulldesc__wrap-img wrap-img-full-desc'
													>
														<img
															className='screnshots-fulldesc img'
															src={el}
															alt={`картинка кадра из аниме ${animeSearchItems[0]?.title}`}
														/>
													</div>
												))}
											</div>
										</div>
										<div
											ref={playerRef}
											className='content__player player-block'
										>
											{animeSearchItems[0].length !== 0 ? (
												<VideoLink linkVideo={animeSearchItems[0]?.link} />
											) : (
												<SkeletonsFullDesc />
											)}
										</div>
										<div className='content__coment comment'>
											<div className='comment__add'>
												<button
													// ref={btnComBRef}
													className='comment__btn-send-comment btn'
													onClick={() => openFormComment()}
												>
													Написать комментарий
												</button>
												{openFBut && (
													<FormMain
														setOpenFTop={setOpenFTop}
														setOpenFBut={setOpenFBut}
														openFormComent={openFormComent}
														setOpenFormComent={setOpenFormComent}
														setLengthComment={setLengthComment}
														formStyle={formStyle}
													/>
												)}
											</div>
											<div className='comment__body'>
												<h2>Комментарии</h2>

												{lengthComment.length === 0 && (
													<p>Пока нет ни одного комментария</p>
												)}
											</div>
										</div>
									</div>
								</div>
							</>
						)}
				</>
			)}
		</main>
	)
}
export default FullDescItem
