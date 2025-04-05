import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

type Category = {
    id: string;
    name: string;
}
type Props = {
    category: Category
}
const Categories = ({ category: { id, name } }: Props) => {
    const navigation = useNavigation();
    // TODO: Fix Types
    // @ts-ignore
    const handlePressed = () => {
        navigation.navigate("Quiz", { category: id });
    }

    return (
        <TouchableOpacity
            onPress={() => handlePressed()}
            style={{
                flex: 1,
                backgroundColor: "dodgerblue",
                padding: 16
            }}>
            <Text style={{
                fontSize: 24,
                color: "white",
                textAlign: 'center'
            }}>{name}</Text>
        </TouchableOpacity>
    )
}

export default Categories