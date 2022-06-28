import { useEffect, useRef, useState } from 'react';
import { Modal, Button, Group, useMantineTheme, Center, Image, Menu, createStyles, Stack } from '@mantine/core';
import { Database, Plus, RotateClockwise } from 'tabler-icons-react';
import { LoadAction } from '../editor/editor/actions/LoadAction';
import ArcadaLogo from '../res/logo.png'
import { FloorPlan } from '../editor/editor/objects/FloorPlan';
import { showNotification } from '@mantine/notifications';
export function WelcomeModal() {
  const [opened, setOpened] = useState(false);
  const fileRef = useRef<HTMLInputElement>();
  const image = <Image src={ArcadaLogo} />
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

  const notification = {
    title: "Welcome to Arcada! 🎉",
    message: "⚒️ Use the tools on the right to create your floor plan. For detailed instructions, press the Help button on the left."
  }
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
        onClose={() => {
          setOpened(false)
          showNotification(notification)
        }}

      >
        <Stack spacing="xs">
          {image}
          <Button onClick={() => {
            setOpened(false); showNotification(notification)
          }} leftIcon={<Plus />} variant="white">
            New plan
          </Button>
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
          <Button
            onClick={() => {
              FloorPlan.Instance.load(localStorage.getItem('autosave'));
              setOpened(false)
            }} leftIcon={<RotateClockwise />} variant="white">
            Load from local save
          </Button>
        </Stack>

      </Modal>

    </>
  );
}