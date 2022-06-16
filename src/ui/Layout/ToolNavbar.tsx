import { useRef, useState } from 'react';
import { Navbar, Tooltip, UnstyledButton, createStyles, Group, Menu, Divider, Drawer } from '@mantine/core';
import {
  Icon as TablerIcon,
  Armchair,
  BorderLeft,
  ArrowBottomSquare,
  DeviceFloppy,
  Upload,
  Ruler2,
  StairsUp,
  StairsDown,
  Eye,
  Pencil,
  Eraser,
  Window,
  Door,
  Plus,
  Help,
  SquareX,
  Dimensions,
  Printer,
} from 'tabler-icons-react';

import {  useStore } from "../../stores/EditorStore";
import { ChangeFloorAction } from '../../editor/editor/actions/ChangeFloorAction';
import { LoadAction } from '../../editor/editor/actions/LoadAction';
import { SaveAction } from '../../editor/editor/actions/SaveAction';
import { Tool } from '../../editor/editor/constants';
import { FurnitureAddPanel } from '../FurnitureControls/FurnitureAddPanel/FurnitureAddPanel';
import { PrintAction } from '../../editor/editor/actions/PrintAction';
import { ToggleLabelAction } from '../../editor/editor/actions/ToggleLabelAction';
import { NavbarLink } from '../NavbarLink';
import { HelpDialog } from '../HelpDialog';


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

const modes = [
  { icon: Eye, label: 'View', tool: Tool.View },
  { icon: Pencil, label: 'Edit', tool: Tool.Edit },
  { icon: Eraser, label: 'Erase', tool: Tool.Remove },
];


function AddMenu() {
  const { classes } = useStyles();
  const { setTool } = useStore()
  const [drawerOpened, setDrawerOpened] = useState(false);

  const [modalOpened, setModalOpened] = useState(false);

  let addButton = <UnstyledButton className={classes.link}>
  <Plus />
  </UnstyledButton>

  return <>
    <Drawer
      opened={drawerOpened}
      position='right'
      onClose={() => setDrawerOpened(false)}
      title="Add furniture"
      padding="xl"
      size="lg"
      overlayOpacity={0}
    >
      <FurnitureAddPanel />
    </Drawer>
    <Menu control={addButton} position='right' gutter={22} trigger="hover" delay={500}>
      <Menu.Item icon={<Armchair size={18} />} onClick={() => setDrawerOpened(true)}>Add furniture</Menu.Item>
      <Divider />
      <Menu.Item icon={<BorderLeft size={18} />} onClick={() => setTool(Tool.WallAdd)}>Draw wall</Menu.Item>
      <Menu.Item icon={<Window size={18} />} onClick={() => setTool(Tool.FurnitureAddWindow)}>Add window</Menu.Item>
      <Menu.Item icon={<Door size={18} />} onClick={() => setTool(Tool.FurnitureAddDoor)}>Add door</Menu.Item>
    </Menu>
  </>

}


export function ToolNavbar() {
  const [active, setActive] = useState(0);

  const { setTool, floor} = useStore()
  const {setSnap, snap} = useStore()

  const fileRef = useRef<HTMLInputElement>();
  const { classes, cx } = useStyles();

  const toolModes = modes.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index)

        setTool(link.tool)
      }
      }
    />
  ));

  const handleChange = async (e: any) => {

    let resultText = await e.target.files.item(0).text();

    let action = new LoadAction(resultText);
    action.execute();

  };

  return (<div style={{position:'absolute'}}>
    <Navbar height={window.innerHeight} width={{ base: 70 }} p="md">

      <Navbar.Section grow>
        <Group direction="column" align="center" spacing={0}>
          <AddMenu />
          {toolModes}
        </Group>

      </Navbar.Section>
      <Navbar.Section grow>
        <Group direction="column" align="center" spacing={0}>
        <Tooltip label={"Current floor"} position="right" withArrow transitionDuration={0}>
        <div className={classes.link}>
            {floor}
          </div>
        </Tooltip>

          <NavbarLink icon={StairsUp} label="Go to next floor" onClick={() => {
            let action = new ChangeFloorAction(1);
            action.execute();
          }} />
          <NavbarLink icon={StairsDown} label="Go to previous floor" onClick={() => {
            let action = new ChangeFloorAction(-1);
            action.execute();
          }} />
          <NavbarLink icon={SquareX} label="Delete floor" onClick={() => {  
            let action = new ChangeFloorAction(-1);
            action.execute();
          }} />
        </Group>
      </Navbar.Section>
      <Navbar.Section grow >
        <Group direction="column" align="center" spacing={0}>
          <NavbarLink icon={Ruler2} label="Measure tool" onClick={() => {
            setTool(Tool.Measure);
          }}/>
          <NavbarLink icon={ArrowBottomSquare} label="Snap to grid"  onClick={() => {
            setSnap(!snap);
          }}/>
          <NavbarLink icon={Dimensions} label="Toggle size labels" onClick={() => {
            let action = new ToggleLabelAction();
            action.execute();
          }}/>
          <HelpDialog />
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction="column" align="center" spacing={0}>
        <NavbarLink icon={Printer} label="Print" onClick={() => {
            let action = new PrintAction();
            action.execute();
          }} />
          <NavbarLink icon={DeviceFloppy} label="Save plan" onClick={() => {
            let action = new SaveAction();
            action.execute();
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
    </div>
  );
}