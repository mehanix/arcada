import { Grid } from '@mantine/core';
import { ThreeDRoot } from '../../3d/ThreeDRoot';
import { EditorRoot } from '../../editor/EditorRoot';
import { WelcomeModal } from '../WelcomeModal';
import { ToolNavbar } from './ToolNavbar';


export function PageLayout() {

    return (<>
            <WelcomeModal/>
        <Grid grow gutter={0}>
            <ToolNavbar></ToolNavbar>
            <Grid.Col span={9}>
                <EditorRoot />
                <ThreeDRoot />
            </Grid.Col>
        </Grid>
        </>
    );
}
