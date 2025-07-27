'use client';

import { Burger, Container, Drawer, Group } from '@mantine/core';
import { Shrikhand } from 'next/font/google'
import Link from 'next/link';
import classes from './Header.module.css'
import { usePathname } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

const links = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/favorites',
    title: 'Favorites',
  },
]



export const shrikhand = Shrikhand({
  subsets: ['latin'],
  weight: ['400'],
})

export function Header() {
  const [opened, { close, toggle }] = useDisclosure(false);

  const mobileItems = links.map((link) => (
    <Link 
        href={link.path}
        key={link.title}
        onClick={close} 
        style={{ 
        color: 'white', 
        textDecoration: 'none', 
        cursor: 'pointer', 
        fontSize: '16px',
        fontWeight: '700'}}>
          {link.title}
        </Link>
    ));

  const pathname = usePathname();
  console.log(pathname);
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'black',
      zIndex: 1000
    }}>
      <Container fluid style={{maxWidth:'1200px', margin: '0 auto',}}>
        <Container fluid style={{maxWidth:'1200px', padding: '0rem 2rem', margin: '0 auto',}}>
        <Group justify="space-between" style={{lineHeight:1, marginBottom: '23px', marginTop: '25px'}}>
          <Link href={'/'} style={{textDecoration: 'none', cursor: 'pointer', fontSize: '20px'}} className={shrikhand.className}>
            <span style={{color: '#FF0000'}}>Calipso</span> <span style={{color: 'white'}}>Movies</span>
          </Link>
          <Group gap="lg" className={classes.desktopLinks}>
            <div>
              <Link href={'/'} style={{color: `${pathname === '/' ? '#FF0000' : 'white'}`, textDecoration: 'none', fontWeight: '700'}}>Home</Link>
            </div>
            <div>
              <Link href={'/favorites'} style={{color: `${pathname === '/favorites' ? '#FF0000' : 'white'}`, textDecoration: 'none', fontWeight: '700'}}>Favorites</Link>
            </div>
          </Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" color="white" />
        </Group>

        <Drawer offset={12} radius="md" opened={opened} onClose={close} title="Menu" position="right" style={{background: 'black'}} styles={{content: { backgroundColor: 'black' },header: { backgroundColor: 'black', borderBottom: '1px solid #2C2C2C' }, title: { color: 'white' },close: { color: 'white' }}}>
          <div className={classes.drawerContent}>
            {mobileItems}
          </div>
        </Drawer>
      </Container>
      </Container>
    </header>
  );
}