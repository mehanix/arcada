import { createStyles, Navbar, ScrollArea, Select, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import { FurnitureItem } from "./FurnitureItem";


const useStyles = createStyles((theme) => ({
    mb: {
        marginTop: theme.spacing.xs,
        marginBottom: theme.spacing.xs
    }
}));

export function FurnitureAddPanel() {
    const { classes } = useStyles();
    const [value, setValue] = useState('');

    return (<>
        <Navbar.Section>
            <Select className={classes.mb} value={value} onChange={setValue} data={[]} />
        </Navbar.Section>
        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <SimpleGrid style={{padding:5}} cols={2}>
               <FurnitureItem name={"Sofa"} img={"./sofa.svg"}></FurnitureItem>
            </SimpleGrid>
        </Navbar.Section>
    </>)
}
