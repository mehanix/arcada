import {  Grid } from '@mantine/core';
import { EditorRoot } from '../../editor/EditorRoot';
import { ToolNavbar } from './ToolNavbar';
import { ToolOptionsNavbar } from './ToolOptionsNavbar';


export function PageLayout() {
    // const theme = useMantineTheme();

    return (
        <Grid grow gutter={0}>
            <ToolNavbar></ToolNavbar>
            <Grid.Col id="pixi-container" span={9}>
                <EditorRoot />
            </Grid.Col>
            <Grid.Col span={2}>
                <ToolOptionsNavbar></ToolOptionsNavbar>
            </Grid.Col>
        </Grid>
        // </Container>
    );
}