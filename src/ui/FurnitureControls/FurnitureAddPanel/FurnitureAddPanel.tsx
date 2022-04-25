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
    const [category, setCategory] = useState('kitchen');
    const [availableCategories, setAvailableCategories] = useState([]);
    const { categories, currentFurnitureData, getCurrentFurnitureData } = useFurnitureStore();
    const [cards, setCards] = useState([]);
    useEffect(() => {
        getCategoryData();
    }, [categories])

    useEffect(() => {

        getCurrentFurnitureData(category)
    }, [category])

    useEffect(() => {

        setCards(currentFurnitureData.map((item) => 
            (
                <FurnitureItem item={item} category={category} ></FurnitureItem>
            )
        ))

    }, [currentFurnitureData])

    const getCategoryData = () => {
        const data = [];
        for (let cat of categories) {
            data.push({ value: cat.id, label: cat.name })
        }

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
