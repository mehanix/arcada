import { Center, Grid, Image, Modal } from '@mantine/core';
import { isMobile } from 'react-device-detect';
import { EditorRoot } from '../../editor/EditorRoot';
import { WelcomeModal } from '../WelcomeModal';
import { ToolNavbar } from './ToolNavbar';
import ArcadaLogo from '../../res/logo.png'


export function PageLayout() {

    // if (isMobile) {
    //     return <>
    //         <Modal
    //             opened={true}
    //             withCloseButton={false}
    //             onClose={() => (false)}
    //         >
    //             <Center>
    //                 <Image src={ArcadaLogo}/>
    //             </Center>
    //             We're sorry, but Arcada is currently only intended for desktops.
    //         </Modal>
    //     </>
    // }

    return (<>

        <WelcomeModal />
        <ToolNavbar></ToolNavbar>

        <EditorRoot />
    </>
    );
}
