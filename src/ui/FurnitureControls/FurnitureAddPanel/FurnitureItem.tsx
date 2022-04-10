import { Card, Image, Text } from "@mantine/core"

interface IFurnitureItem {
    name: string,
    img: string
}
export function FurnitureItem(props: IFurnitureItem) {
    return (<Card style={{height:150, display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"space-evenly"}} shadow="sm" p="lg">
        <Card.Section style={{padding:5}}>
            <Image src={props.img} fit={"contain"} alt="Furniture Image" />
        </Card.Section>
        <Text weight={500}>{props.name}</Text>
    </Card>)
}