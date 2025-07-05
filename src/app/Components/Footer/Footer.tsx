'use client';

import { Container, Group} from '@mantine/core';
import { shrikhand } from '../Header/Header'
import Link from 'next/link';

export function Footer() {
  return (
    <header>
      <Container style={{maxWidth: '1200px', padding: '0rem 2rem', marginBottom: '30px', marginTop: '34px',}}>
        <Group>
          <Link href={'/'} style={{textDecoration: 'none', cursor: 'pointer', fontSize: '15px', margin: '0 auto'}}><p className={shrikhand.className}><span style={{color: '#FF0000'}}>Calipso</span> <span style={{color: 'white'}}>Movies</span></p></Link>
        </Group>
      </Container>
    </header>
  );
}