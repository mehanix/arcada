import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

function ConfirmationModal(message:string) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm"
      >
        <p>{message}</p>
      </Modal>

      {/* <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group> */}
    </>
  );
}