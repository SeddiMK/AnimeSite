import React from 'react';
import './NavMobile.scss';

import { useClickAway } from 'react-use';
import { useRef } from 'react';
import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { AnimatePresence, motion } from 'framer-motion';
import { router } from '../../router/router';
import MenuList from '../menuList/MenuList';

const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const refNavMobile = useRef(null);

  useClickAway(refNavMobile, () => setOpen(false));

  return (
    <div ref={refNavMobile} className="nav-mobile__wrap ">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="nav-mobile__menu-items shadow-4xl   p-5 pt-0 bg-neutral-950 border-b border-b-white/20">
            <MenuList />
            {/* <ul className="grid gap-2">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.title}
                    className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-neutral-800 via-neutral-950 to-neutral-700">
                    <a
                      onClick={() => setOpen((prev) => !prev)}
                      className={
                        'flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950'
                      }
                      href={route.href}>
                      <span className="flex gap-1 text-lg">{route.title}</span>
                      <Icon className="text-xl" />
                    </a>
                  </motion.li>
                );
              })}
            </ul> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMobile;
