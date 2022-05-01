import { createStyles, Navbar, ScrollArea, Select, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";
import { FurnitureItem } from "./FurnitureItem";
import { useFurnitureStore } from "../../../stores/FurnitureStore";
const useStyles = createStyles((theme) => ({
    mb: {
        marginTop: theme.spacing.xs,
        marginBottom: theme.spacing.xs
    }
}));

export function FurnitureAddPanel() {
    const { classes } = useStyles();
    const [category, setCategory] = useState('');
    const [availableCategories, setAvailableCategories] = useState([]);
    const { categories, currentFurnitureData, getCurrentFurnitureData } = useFurnitureStore();
    const [cards, setCards] = useState([]);
    useEffect(() => {
        getCategoryData();
    }, [categories])

    useEffect(() => {

        if (category) {
            getCurrentFurnitureData(category)
            console.log(category, currentFurnitureData)
        }
    }, [category])

    useEffect(() => {

        setCards(currentFurnitureData.map((item) =>
        (
            <FurnitureItem data={item} ></FurnitureItem>
        )
        ))

    }, [currentFurnitureData])

    const getCategoryData = () => {
        const data = [];
        for (let cat of categories) {
            data.push({ value: cat._id, label: cat.name })
        }
        console.log(data)

        setAvailableCategories(data);
    }

    return (<>
        <Navbar.Section>
            <Select className={classes.mb} value={category} onChange={setCategory} data={availableCategories} />
        </Navbar.Section>
        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <SimpleGrid style={{ padding: 5 }} cols={2}>
                {cards}
            </SimpleGrid>
        </Navbar.Section>
    </>)
}
