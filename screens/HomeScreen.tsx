import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Categories from '../Components/Categories'

const categories = [
  { id: "history", name: "Tarih" },
  { id: "general", name: "Genel Kültür" },
  { id: "movies", name: "Filmler" },
  { id: "music", name: "Müzik" },
]
export default function HomeScreen() {
  return (
    <View style={{flex:1, justifyContent:'center'}}>
      <View>
        <FlatList
          data={categories}
          renderItem={({ item }) => <Categories category={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
            gap: 16,
            marginHorizontal:16
          }}
          columnWrapperStyle={{
            columnGap: 16
          }}
        />
      </View>

    </View>
  )
}