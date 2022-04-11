import { Card, Center,  Image, Text } from "@mantine/core"

interface IFurnitureItem {
    name: string,
    img: string
}
export function FurnitureItem(props: IFurnitureItem) {
    return (<Card shadow="sm" p="lg">
        <Card.Section style={{height:120    , padding: 5 }}>
            <Center>
                <Image src={props.img} fit="contain" height={115} alt="Furniture Image" />
            </Center>
        </Card.Section>
        <Card.Section>
            <Center>
            <Text align={"center"} weight={500}>{props.name}</Text>
            </Center>

        </Card.Section>
    </Card>)
}