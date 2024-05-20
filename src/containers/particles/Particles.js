import React, { useEffect, useState } from 'react';

export const Particles = ({ wrapperRef }) => {
  var particles = document.querySelectorAll('.particles-canv'),
    radius = 1.7,
    number = 100;

  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  // const [isMounted, setIsMounted] = useState(false);

  const observedDiv = wrapperRef;
  // const body = document.querySelector('body');
  // useRef allows us to "store" the div in a constant,
  // and to access it via observedDiv.current

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
        // if (observedDiv.current.offsetWidth !== width) {
        //   setWidth(observedDiv.current.offsetWidth);
        // }
        if (observedDiv.current.offsetHeight !== height) {
          setHeight(observedDiv.current.offsetHeight);
        }
      });

      // the code in useEffect will be executed when the component
      // has mounted, so we are certain observedDiv.current will contain
      // the div we want to observe
      resizeObserver.observe(observedDiv.current);

      particles.forEach((node) => {
        let color = node.dataset.color;

        function hexToRgbA(hex) {
          if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            let c = hex.substring(1).split('');
            if (c.length === 3) {
              c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = `0x${c.join('')}`;
            return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
              ','
            )}, 1`;
          }
          throw new Error('Bad Hex');
        }

        let ctx = node.getContext('2d'),
          clr = hexToRgbA(color);

        // height = window.innerHeight;
        // height = document.getElementById('root').offsetHeight;
        // height = document.getElementById('root').getBoundingClientRect().height;

        // console.log(width, height, 'width, heigth');

        setWidth(window.innerWidth); //!!!!!!!!!!!!!!!!!!!!!!!!
        // setWidth(7680);

        node.width = width;
        node.height = height;
        ctx.fillStyle = clr;

        let dots = {
          num: number,
          distance: 200,
          d_radius: 200,
          velocity: -0.9,
          array: [],
        };
        let dot;

        function Dot() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = dots.velocity + Math.random();
          this.vy = dots.velocity + Math.random();
          this.radius = Math.random() * radius;
        }

        Dot.prototype = {
          create: function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
          },

          animate: function () {
            for (let i = 0; i < dots.num; i++) {
              dot = dots.array[i];

              if (dot.x < 0 || dot.x > width) {
                dot.vx = -dot.vx;
                dot.vy = dot.vy;
              } else if (dot.y < 0 || dot.y > height) {
                dot.vx = dot.vx;
                dot.vy = -dot.vy;
              }
              dot.x += dot.vx;
              dot.y += dot.vy;
            }
          },
        };

        function createDots() {
          ctx.clearRect(0, 0, width, height);
          for (let i = 0; i < dots.num; i++) {
            dots.array.push(new Dot());
            dot = dots.array[i];
            dot.create();
          }
          dot.animate();
        }

        setInterval(createDots, 1000 / 30);
      });
      // if useEffect returns a function, it is called right before the
      // component unmounts, so it is the right place to stop observing
      // the div
      return function cleanup() {
        resizeObserver.disconnect();
      };
    },
    // only update the effect if the ref element changed
    [width, height]
  );

  // useEffect(() => {
  //   setIsMounted(true);
  //   // if (isMounted) ResizeObserver.unobserve();
  // }, []);

  // console.log(isMounted + 1, 'IsMounted');
  return <>{/* <RootWidthHeigth /> */}</>;
};
export default Particles;
