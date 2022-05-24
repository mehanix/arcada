import { useState } from 'react';
import { Drawer, Button, Group } from '@mantine/core';

function FurnitureDrawer() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
      </Drawer>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      </Group>
    </>
  );
}