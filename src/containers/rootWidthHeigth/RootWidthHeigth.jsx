import React, { useEffect, useState, useRef } from 'react';

const RootWidthHeigth = () => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  // useRef allows us to "store" the div in a constant,
  // and to access it via observedDiv.current
  const observedDiv = useRef(null);

  useEffect(
    () => {
      if (!observedDiv.current) {
        // we do not initialize the observer unless the ref has
        // been assigned
        return;
      }

      // we also instantiate the resizeObserver and we pass
      // the event handler to the constructor
      const resizeObserver = new ResizeObserver(() => {
        if (observedDiv.current.offsetWidth !== width) {
          setWidth(observedDiv.current.offsetWidth);
        }
        if (observedDiv.current.offsetHeight !== height) {
          setHeight(observedDiv.current.offsetHeight);
        }
      });

      // the code in useEffect will be executed when the component
      // has mounted, so we are certain observedDiv.current will contain
      // the div we want to observe
      resizeObserver.observe(observedDiv.current);

      // if useEffect returns a function, it is called right before the
      // component unmounts, so it is the right place to stop observing
      // the div
      return function cleanup() {
        resizeObserver.disconnect();
      };
    },
    // only update the effect if the ref element changed
    [observedDiv.current]
  );

  console.log(height, 'height in rootwidth');
  return (
    <div className="main-div" ref={observedDiv}>
      <p>
        Block width: {width}, height: {height}{' '}
      </p>
    </div>
  );
};

export default RootWidthHeigth;
