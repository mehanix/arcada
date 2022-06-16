import { Icon as TablerIcon } from 'tabler-icons-react';
import { useRef, useState } from 'react';
import { createStyles, Tooltip, UnstyledButton } from '@mantine/core';


const useStyles = createStyles((theme) => ({
    link: {
      width: 40,
      height: 40,
      borderRadius: theme.radius.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      },
    },
  
    active: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
      },
    },
  }));

interface NavbarLinkProps {
    icon: TablerIcon;
    label?: string;
    active?: boolean;
    onClick?(): void;
  }

export function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    return (
      <Tooltip label={label} position="right" withArrow transitionDuration={0}>
        <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
          <Icon />
        </UnstyledButton>
      </Tooltip>
    );
  }