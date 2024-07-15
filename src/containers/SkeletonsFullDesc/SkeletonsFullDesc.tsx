import React from 'react'
import LoadingSvg from '../../assets/image/download/spinning-dots.svg'
import ContentLoader from 'react-content-loader'
// https://skeletonreact.com/

const SkeletonsFullDesc: React.FC = props => (
	<div className='skeleton-full-desc'>
		<div className='skeleton-full-desc__loading loading'>
			<img src={LoadingSvg} alt='анимация загрузки страницы' />
		</div>

		{/* <ContentLoader
      speed={2}
      width={1048}
      height={750}
      viewBox="0 0 1048 750"
      backgroundColor="#f3f3f3"
      foregroundColor="#d6d6d6"
      {...props}>
      <circle cx="467" cy="488" r="19" />
      <rect x="345" y="66" rx="5" ry="5" width="361" height="1" />
      <circle cx="365" cy="37" r="8" />
      <rect x="343" y="90" rx="5" ry="5" width="220" height="15" />
      <rect x="0" y="6" rx="5" ry="5" width="330" height="458" />
      <circle cx="439" cy="22" r="24" />
      <rect x="377" y="32" rx="5" ry="5" width="30" height="12" />
      <rect x="344" y="114" rx="5" ry="5" width="123" height="9" />
      <rect x="423" y="11" rx="5" ry="5" width="182" height="24" />
      <circle cx="603" cy="23" r="12" />
      <rect x="85" y="479" rx="5" ry="5" width="176" height="49" />
      <rect x="344" y="150" rx="5" ry="5" width="55" height="13" />
      <rect x="448" y="432" rx="5" ry="5" width="81" height="17" />
      <rect x="440" y="184" rx="5" ry="5" width="158" height="13" />
      <rect x="344" y="130" rx="5" ry="5" width="118" height="6" />
      <rect x="344" y="223" rx="5" ry="5" width="55" height="13" />
      <rect x="343" y="186" rx="5" ry="5" width="55" height="13" />
      <rect x="439" y="151" rx="5" ry="5" width="55" height="13" />
      <rect x="345" y="259" rx="5" ry="5" width="72" height="13" />
      <rect x="349" y="339" rx="5" ry="5" width="55" height="13" />
      <rect x="348" y="297" rx="5" ry="5" width="55" height="13" />
      <rect x="85" y="537" rx="5" ry="5" width="176" height="49" />
      <rect x="85" y="594" rx="5" ry="5" width="176" height="49" />
      <rect x="444" y="221" rx="5" ry="5" width="55" height="13" />
      <rect x="443" y="259" rx="5" ry="5" width="83" height="13" />
      <rect x="445" y="337" rx="5" ry="5" width="237" height="56" />
      <rect x="444" y="296" rx="5" ry="5" width="90" height="13" />
      <rect x="349" y="397" rx="5" ry="5" width="55" height="13" />
      <rect x="350" y="433" rx="5" ry="5" width="55" height="13" />
      <rect x="352" y="470" rx="5" ry="5" width="78" height="38" />
      <rect x="487" y="40" rx="0" ry="0" width="84" height="7" />
    </ContentLoader>  */}
	</div>
)

export default SkeletonsFullDesc
