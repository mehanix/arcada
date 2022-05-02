import {  Grid } from '@mantine/core';
import { ThreeDRoot } from '../../3d/ThreeDRoot';
import { EditorRoot } from '../../editor/EditorRoot';
import { useStore, ViewMode } from '../../stores/ToolStore';
import { ToolNavbar } from './ToolNavbar';
import { ToolOptionsNavbar } from './ToolOptionsNavbar';


export function ToolModeView(props: { mode: ViewMode; }) {

    if (props.mode === ViewMode.TwoD) {
        return <EditorRoot/>
    }
    return <ThreeDRoot />    
};


export function PageLayout() {
    // const theme = useMantineTheme();
    const  state  = useStore();

    return (
        <Grid grow gutter={0}>
            <ToolNavbar></ToolNavbar>
            <Grid.Col span={9}>
            <ToolModeView mode={state.viewMode!} />
            </Grid.Col>
            <Grid.Col span={2}>
                <ToolOptionsNavbar></ToolOptionsNavbar>
            </Grid.Col>
        </Grid>
        // </Container>
    );
}