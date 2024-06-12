import React, { useRef, useState } from 'react';
import './NavMobile.scss';

import { useClickAway } from 'react-use';

import MenuList from '../menuList/MenuList';

import { Squash as Hamburger } from 'hamburger-react';

import { AnimatePresence, motion } from 'framer-motion';

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
            className="nav-mobile__menu-items">
            <MenuList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMobile;
