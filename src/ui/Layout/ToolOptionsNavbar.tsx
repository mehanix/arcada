import { createStyles, Navbar, Title, Image, Group } from '@mantine/core';
import {
    InfoCircle,
} from 'tabler-icons-react';

import logo from "./icon.png";

import { ToolMode, useStore } from "../../stores/ToolStore";
import { FurnitureModePanel } from '../FurnitureControls/FurnitureModePanel';
import { WallModePanel } from '../WallControls/WallModePanel';

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
    },

    main: {
        flex: 1,
        borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    },
    // content: {
    //     backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    // },



    title: {
        boxSizing: 'border-box',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.md,
        paddingTop: 18,
        height: 60,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
    },

    subtitle: {
        boxSizing: 'border-box',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xs,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        padding: theme.spacing.md,
        paddingTop: 12,
        height: 45,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
    },
    logo: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height: 60,
        paddingTop: theme.spacing.md,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
        marginBottom: theme.spacing.xl,
    },


}));

export function ToolModeView(props: { mode: ToolMode; }) {
    console.log(props.mode, ToolMode.FurnitureMode)
    if (props.mode === ToolMode.FurnitureMode) {
        return <FurnitureModePanel/>
    }
    return <WallModePanel />    
};

export function ToolOptionsNavbar() {
    const { classes } = useStyles();
    const  state  = useStore();
    const titles = ["Furniture Mode", "Wall Mode"]
    return (
        <Navbar height={window.innerHeight}>
            <Navbar.Section className={classes.wrapper}>
                <div className={classes.main}>
                    <Group className={classes.title}>
                        <Image src={logo} width={30} height={30} />
                        <Title order={4}>Arkada</Title>
                    </Group>
                    <Group position={"apart"} className={classes.subtitle}>
                        <Title order={5}> {`${titles[state.mode!]}`}</Title>
                        <InfoCircle></InfoCircle>
                    </Group>
                </div>
            </Navbar.Section>
            <ToolModeView mode={state.mode!} />
        </Navbar>
    );
}