"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { shrikhand } from './Header/Header';

export const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
            }}
            style={{marginBottom: '100px'}}
        >
        <Link href={'/'} style={{textDecoration: 'none', cursor: 'pointer', fontSize: '20px'}} className={shrikhand.className}><span style={{color: '#FF0000'}}>Calipso</span> <span style={{color: 'white'}}>Movies</span></Link>
        </motion.div>
    </motion.div>
  );
};