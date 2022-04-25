import { useRef, useState } from 'react';
import { Navbar, Tooltip, UnstyledButton, createStyles, Group } from '@mantine/core';
import {
  Icon as TablerIcon,
  Armchair,
  BorderLeft,
  Tag,
  ArrowBottomSquare,
  DeviceFloppy,
  Upload,
  Ruler2,
} from 'tabler-icons-react';

import { ToolMode, useStore } from "../../stores/ToolStore";
import { FloorPlan } from '../../editor/editor/objects/FloorPlan';


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
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const modes = [
  { icon: Armchair, label: 'Furniture Mode', mode: ToolMode.FurnitureMode },
  { icon: BorderLeft, label: 'Wall Mode', mode: ToolMode.WallMode }
];


export function ToolNavbar() {
  const [active, setActive] = useState(0);
  const { setMode } = useStore()
  const fileRef = useRef<HTMLInputElement>();

  const toolModes = modes.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index)

        setMode(link.mode)
      }
      }
    />
  ));

  const handleChange = async (e:any) => {

    let resultText = await e.target.files.item(0).text();

    console.log(resultText);
     FloorPlan.Instance.load(resultText);

  };

  return (
    <Navbar height={window.innerHeight} width={{ base: 70 }} p="md">

      <Navbar.Section grow>
        <Group direction="column" align="center" spacing={0}>
          {toolModes}
        </Group>
      </Navbar.Section>
      <Navbar.Section grow >
        <Group direction="column" align="center" spacing={0}>
          <NavbarLink icon={Tag} label="Toggle room labels" />
          <NavbarLink icon={ArrowBottomSquare} label="Toggle snap to grid" />
          <NavbarLink icon={Ruler2} label="Toggle room dimensions" />

        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction="column" align="center" spacing={0}>
          <NavbarLink icon={DeviceFloppy} label="Save plan" onClick={() => {
            FloorPlan.Instance.save()
          }} />
     
          <NavbarLink onClick={() => fileRef.current.click()} icon={Upload} label="Load plan" />
          <input
        ref={fileRef}
        onChange={handleChange}
        multiple={false}
        type="file"
        hidden
      />
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}