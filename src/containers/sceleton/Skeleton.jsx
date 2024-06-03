import React from 'react';
import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
// https://skeletonreact.com/ 240 437 : React.FC

import { sizeCardWidth, sizeCardHigth } from '../../store/animeSlice';
import { log } from 'console';

// let width = getState((state) => state.animeSlice.sizeCardW);
// let height = useSelector((state) => state.animeSlice.sizeCardH);
// console.log(sizeCardWidth(), sizeCardHigth(), 'jhjhkjkhjkhjkh');
// console.log(width, 'jhjhkjkhjkhjkh');

// console.log(getState(), 'пуеЫефеу'); // console.log(props, 'propssss');
// return (
const Skeleton = (props) => (
  <div className="skeleton">
    <ContentLoader
      speed={2}
      width={165}
      height={220}
      viewBox="0 0 240 437"
      backgroundColor="#f3f3f3"
      foregroundColor="#d6d6d6"
      {...props}>
      <circle cx="33" cy="397" r="10" />
      <rect x="51" y="391" rx="2" ry="2" width="34" height="15" />
      <rect x="23" y="344" rx="2" ry="2" width="192" height="14" />
      <rect x="0" y="0" rx="2" ry="2" width="240" height="336" />
      <rect x="23" y="363" rx="2" ry="2" width="192" height="14" />
      <rect x="91" y="391" rx="2" ry="2" width="34" height="15" />
      <rect x="236" y="343" rx="0" ry="0" width="2" height="73" />
      <rect x="0" y="341" rx="0" ry="0" width="2" height="73" />
    </ContentLoader>
  </div>
);

// const Skeleton: React.FC = (props) => (
//   <div className="skeleton">
//     <ContentLoader
//       speed={2}
//       width={160}
//       height={337}
//       viewBox="0 0 240 437"
//       backgroundColor="#f3f3f3"
//       foregroundColor="#d6d6d6"
//       {...props}>
//       <circle cx="33" cy="397" r="10" />
//       <rect x="51" y="391" rx="2" ry="2" width="34" height="15" />
//       <rect x="23" y="344" rx="2" ry="2" width="192" height="14" />
//       <rect x="0" y="0" rx="2" ry="2" width="240" height="336" />
//       <rect x="23" y="363" rx="2" ry="2" width="192" height="14" />
//       <rect x="91" y="391" rx="2" ry="2" width="34" height="15" />
//       <rect x="236" y="343" rx="0" ry="0" width="2" height="73" />
//       <rect x="0" y="341" rx="0" ry="0" width="2" height="73" />
//     </ContentLoader>
//   </div>
// );

export default Skeleton;
