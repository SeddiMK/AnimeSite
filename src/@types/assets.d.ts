// import content from 'lodash.debounce';

// css-modules just extend the declaration like this
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}
declare module '*.jpeg' {
  const value: any;
  export = value;
}
declare module '*.png' {
  const value: any;
  export = value;
}
declare module '*.svg' {
  const value: any;
  export = value;
}
declare module '*.webp' {
  const value: any;
  export = value;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

// declare module 'lodash.debounce' {
//   const debounce: Record<string, string>;
//   export default content;
// }
