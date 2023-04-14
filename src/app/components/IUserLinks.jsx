"use client"
import React from 'react';
import { IconUsers, IconBallFootball, IconHome2 } from '@tabler/icons';
import { ThemeIcon, UnstyledButton, Group, Text, Anchor } from '@mantine/core';

function IUserLink({ icon, color, label, href }) {

  return (
    <Anchor href={href}>
        <UnstyledButton
        sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
        })}
        >
        <Group>
            <ThemeIcon color={color} variant="light">
            {icon}
            </ThemeIcon>

            <Text size="md" weight={600}>{label}</Text>
        </Group>
        </UnstyledButton>
    </Anchor>
  );
}

const unloggedData = [
  { icon: <IconHome2 size={16} />, color: 'violet', label: 'Strona główna', href: '/' },
  { icon: <IconUsers size={16} />, color: 'violet', label: 'Zawodnicy', href: '/players' },
  { icon: <IconBallFootball size={16} />, color: 'grape', label: 'Kluby', href: '/clubs' },
];

export function IUserLinks() {
    const unloggedLinks = unloggedData.map((link) => <IUserLink {...link} key={link.label} href={link.href}/>);
    return <div>{unloggedLinks}</div>;
  }
  
