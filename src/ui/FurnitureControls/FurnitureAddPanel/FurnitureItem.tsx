import { Card, Center, Image, Text } from "@mantine/core"
import { FloorPlan } from "../../../editor/editor/objects/FloorPlan"
import { FurnitureData } from "../../../stores/FurnitureStore"

interface IFurnitureData {
    data:FurnitureData
}
function add(item:IFurnitureData) {
    FloorPlan.Instance.addFurniture(item.data)
}

export function FurnitureItem(item:IFurnitureData) {
    let data = item.data;
    return (
            <Card onClick={() => add(item)} shadow="sm" p="lg">
                <Card.Section style={{ height: 120, padding: 5 }}>
                    <Center>
                        <Image src={`furniture/2d/${data._id}`} fit="contain" height={115} alt={data.name} />
                    </Center>
                </Card.Section>
                <Card.Section>
                    <Center>
                        <Text align={"center"} weight={500}>{data.name}</Text>
                    </Center>

                </Card.Section>
            </Card>
    )
}