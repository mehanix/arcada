import { Grid } from '@mantine/core';
import {  ThreeDRoot } from '../../3d/ThreeDRoot';
import { EditorRoot } from '../../editor/EditorRoot';
import { ToolNavbar } from './ToolNavbar';
import { ToolOptionsNavbar } from './ToolOptionsNavbar';


export function PageLayout() {

    return (
        <Grid grow gutter={0}>
            <ToolNavbar></ToolNavbar>
            <Grid.Col span={9}>
                <EditorRoot />
                <ThreeDRoot />
            </Grid.Col>
            <Grid.Col span={2}>
                <ToolOptionsNavbar></ToolOptionsNavbar>
            </Grid.Col>
        </Grid>
    );
}
