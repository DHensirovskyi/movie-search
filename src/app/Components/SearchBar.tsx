'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput, ActionIcon} from '@mantine/core';
import { IoSearchSharp } from "react-icons/io5";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault(); 
    router.push(`/?query=${inputValue}`);
  };

  return (
    <form onSubmit={handleSearch} style={{marginBottom: '2rem'}}>
        <TextInput
          styles={{input: { borderRadius: '25px', fontSize: '16px', height: '56px', padding: '0px 25px'}}}
          placeholder="Search Movies..."
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          style={{ flex: 1, maxWidth: '25rem', borderRadius: '35px' }}
          maxLength={100}
          rightSection={
          <ActionIcon
            type="submit"
            size={40}
            radius="xl"
            variant="filled"
            color="white"
            style={{ background: '#fff', marginRight: '2rem' }}
            onClick={handleSearch}
          >
            <IoSearchSharp style={{ width: 24, height: 24, color: 'black' }} />
          </ActionIcon>
          }
        />
        
    </form>
  );
}