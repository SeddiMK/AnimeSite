// import content from 'lodash.debounce';

// css-modules just extend the declaration like this
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

// types-images
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.webp';

// declare module '*.jpg' {
//   const value: any;
//   export = value;
// }
// declare module '*.jpeg' {
//   const value: any;
//   export = value;
// }
// declare module '*.png' {
//   const value: any;
//   export = value;
// }
// declare module '*.svg' {
//   const value: any;
//   export = value;
// }
// declare module '*.webp' {
//   const value: any;
//   export = value;
// }

declare module 'some-module' {
  namespace SomeClass {
    export interface IMyInterface {
      x: string;
    }
  }
  class SomeClass {
    constructor(p: SomeClass.IMyInterface);
  }
  export = SomeClass;
}
// declare module 'lodash.debounce' {
//   const debounce: Record<string, string>;
//   export default content;
// }

// import { Globals } from 'react-spring';
// exports.Globals = Globals;
// declare module 'react-spring' {
//   interface Globals {
//     injectFrame: () => void;
//   }

//   export const Globals: Globals;
// }
