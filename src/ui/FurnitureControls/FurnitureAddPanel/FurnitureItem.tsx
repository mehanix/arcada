import { Card, Center, Image, Text } from "@mantine/core"
import { endpoint } from "../../../api/api-client"
import { FloorPlan } from "../../../editor/editor/objects/FloorPlan"
import { FurnitureData } from "../../../stores/FurnitureStore"

function add(data:IFurnitureItem) {
    FloorPlan.Instance.addFurniture(data.item, data.category)
}
interface IFurnitureItem {
    item:FurnitureData,
    category:string
}
export function FurnitureItem(props: IFurnitureItem) {
    let item = props.item
    let category = props.category
    return (
            <Card onClick={() => add(props)} shadow="sm" p="lg">
                <Card.Section style={{ height: 120, padding: 5 }}>
                    <Center>
                        <Image src={`${endpoint}${category}/${item.id}`} fit="contain" height={115} alt="Furniture Image" />
                    </Center>
                </Card.Section>
                <Card.Section>
                    <Center>
                        <Text align={"center"} weight={500}>{item.name}</Text>
                    </Center>

                </Card.Section>
            </Card>
    )
}