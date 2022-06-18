import { useEffect, useRef, useState } from 'react';
import { Modal, Button, Group, useMantineTheme, Center, Image, Menu, createStyles } from '@mantine/core';
import { Database, Plus } from 'tabler-icons-react';
import { LoadAction } from '../editor/editor/actions/LoadAction';
import ArcadaLogo from '../res/logo.png'
export function WelcomeModal() {
  const [opened, setOpened] = useState(false);
  const fileRef = useRef<HTMLInputElement>();
  const image = <Image src={ArcadaLogo}/>
  const useStyles = createStyles(() => ({
    padded: {
      padding: '4px'
    }

  }));


  const loadFromDisk = async (e: any) => {

    let resultText = await e.target.files.item(0).text();

    if (resultText) {
      let action = new LoadAction(resultText);
      action.execute();
      setOpened(false)
    }

  };

  const theme = useMantineTheme();
  const { classes } = useStyles();
  useEffect(() => {
    setOpened(true);
  }, [])

  return (
    <>
      <Modal className={classes.padded}
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={opened}
        withCloseButton={false}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        centered
        onClose={() => setOpened(false)}

      >
        <Center className={classes.padded}>
          {image}

        </Center>
        <Center className={classes.padded}>
          <Button onClick={() => { setOpened(false) }} leftIcon={<Plus />} variant="white">
            New plan
          </Button>
        </Center>

        <Center className={classes.padded}>
          <input
            ref={fileRef}
            onChange={loadFromDisk}
            multiple={false}
            type="file"
            hidden
          />
          <Button onClick={() => {
            fileRef.current.click()
          }} leftIcon={<Database />} variant="white">
            Load from disk
          </Button>
        </Center>

      </Modal>

    </>
  );
}