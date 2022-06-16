import { Grid } from '@mantine/core';
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
            </Grid.Col>
        </Grid>
        </>
    );
}
