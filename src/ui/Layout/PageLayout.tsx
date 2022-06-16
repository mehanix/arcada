import { Grid } from '@mantine/core';
import { EditorRoot } from '../../editor/EditorRoot';
import { WelcomeModal } from '../WelcomeModal';
import { ToolNavbar } from './ToolNavbar';


export function PageLayout() {

    return (<>
        <WelcomeModal />
        <ToolNavbar></ToolNavbar>

        <EditorRoot />
        </>
    );
}
