import { Navbar } from "@mantine/core";
import { FurnitureAddPanel } from "./FurnitureAddPanel/FurnitureAddPanel";
import { FurnitureTools } from "./FurnitureTools";

export function FurnitureModePanel() {
    return (<>
        <Navbar.Section>
            <FurnitureTools></FurnitureTools>
        </Navbar.Section>
        <FurnitureAddPanel></FurnitureAddPanel>
    </>)

}   