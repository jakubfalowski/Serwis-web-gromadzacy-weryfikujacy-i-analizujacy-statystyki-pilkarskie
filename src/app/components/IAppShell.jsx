"use client"
import { useState } from 'react';
import {AppShell,Navbar,Header,Footer,Text,MediaQuery,Burger,useMantineTheme} from '@mantine/core';

import { IUserLinks } from './IUserLinks';

import '../styles/IAppShell.scss';
import '../styles/App.scss';


export function IAppShell(props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Navbar height={600} p="xs" width={{ base: 300 }}>
            <Navbar.Section grow mt="md">
              <IUserLinks />
            </Navbar.Section>
              
            
            </Navbar>
        </Navbar>
      }
      footer={
        <Footer height={80} className='footer' p="md">
          Serwis web gromadzący, weryfikujący i analizujacy statystyki piłkarskie
        </Footer>
      }
    >
      <Text>{props.contain}</Text>
    </AppShell>
  );
}

export default IAppShell;