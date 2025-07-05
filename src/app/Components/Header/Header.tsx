'use client';

import { Container, Group } from '@mantine/core';
import { Shrikhand } from 'next/font/google'
import Link from 'next/link';
import styles from './Header.module.css'
import { usePathname } from 'next/navigation';

export const shrikhand = Shrikhand({
  subsets: ['latin'],
  weight: ['400'],
})

export function Header() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <header>
      <Container style={{maxWidth: '1200px', padding: '0rem 2rem',}}>
        <Group style={{lineHeight:1, marginBottom: '30px', marginTop: '34px', alignItems: 'flex-start'}}>
          <Link href={'/'} style={{textDecoration: 'none', cursor: 'pointer', fontSize: '20px'}} className={shrikhand.className}><span style={{color: '#FF0000'}}>Calipso</span> <span style={{color: 'white'}}>Movies</span></Link>
          <div className={styles.nav}>
            <div style={{marginLeft: 'auto'}}>
              <Link 
              href={'/'} 
              style={{
              color: 'white', 
              textDecoration: 'none', 
              cursor: 'pointer', 
              fontSize: '16px', 
              fontWeight: '700'}}>
                Movie Page
                {pathname.startsWith('/MoviePage') && <div style={{width: '5px', height: '5px', background: '#FF0000', borderRadius:'100%', margin: '4px auto'}}></div>}
              </Link>
            </div>

            <div>
              <Link 
              href={'/'} 
              style={{ 
              color: 'white', 
              textDecoration: 'none', 
              cursor: 'pointer', 
              fontSize: '16px', 
              fontWeight: '700'}}>
                Home
              </Link>
              {pathname === '/' && <div style={{width: '5px', height: '5px', background: '#FF0000', borderRadius:'100%', margin: '4px auto'}}></div>}
            </div>
          </div>
        </Group>
      </Container>
    </header>
  );
}