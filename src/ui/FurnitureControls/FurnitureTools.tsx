import { Center, Group, Tooltip } from "@mantine/core";
import { useState } from "react";
import {  useStore } from "../../stores/ToolStore";
// import { SegmentedControl } from '@mantine/core';
// import { Door, Edit, Eraser, Plus, Window } from "tabler-icons-react";

// const useStyles = createStyles((theme) => ({
//   button: {
//     borderRadius: 0,

//     '&:not(:first-of-type)': {
//       borderLeftWidth: 0,
//     },

//     '&:first-of-type': {
//       borderTopLeftRadius: theme.radius.sm,
//       borderBottomLeftRadius: theme.radius.sm,
//     },

//     '&:last-of-type': {
//       borderTopRightRadius: theme.radius.sm,
//       borderBottomRightRadius: theme.radius.sm,
//     },
//   },
// }));

// const tools = [
//   {
//     label: (
//       <Tooltip label={"Edit furniture mode"} position="bottom" withArrow transitionDuration={0}>
//       <Center>
//         <Edit size={20} />
//       </Center>
//       </Tooltip>

//     ), value: Tool.FurnitureEdit.toString()
//   },
//   { label: (
//     <Tooltip label={"Delete furniture mode"} position="bottom" withArrow transitionDuration={0}>

//     <Center>
//       <Eraser size={20} />
//     </Center>
//     </Tooltip>
//   ), value: Tool.FurnitureRemove.toString() },
//   { label: (
//     <Tooltip label={"Add window"} position="bottom" withArrow transitionDuration={0}>

//     <Center>
//       <Window size={20} />
//       <Plus size={12} />
//     </Center>
//     </Tooltip>
//   ), value: Tool.FurnitureAddWindow.toString() },
//   { label: (
//     <Tooltip label={"Add door"} position="bottom" withArrow transitionDuration={0}>
//     <Center>
//       <Door size={20} />
//       <Plus size={12} />
//     </Center>
//     </Tooltip>
//   ), value: Tool.FurnitureAddDoor.toString() }
// ];

export function FurnitureTools() {
  // const { classes } = useStyles();
  const { setTool } = useStore()
  // const [value, setValue] = useState(Tool.Edit.toString());

  // const toolButtons = tools.map((link, _) => (
  //   <Button variant="default" className={classes.button}
  //     {...link}
  //     key={link.label}
  //     onClick={() => {
  //       setTool( link.tool )
  //     }
  //     }
  //   > {link.label}</Button>
  // ));
  // const control = <SegmentedControl
  //   value={value}
  //   onChange={(value) => {
  //     setValue(value)
  //     console.log(Tool[parseInt(value)])
  //     let tool: Tool = parseInt(value);
  //     setTool(tool)
  //   }}
  //   data={tools}
  // />

  return (
    <Group grow spacing={0}>
      {/* {control} */}
    </Group>
  );
}
