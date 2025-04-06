import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import { useNavigation } from "@react-navigation/native";
import { getCompletedTest } from "../utils/storage";

const categories = [
  { id: "history", name: "Tarih" },
  { id: "general", name: "Genel Kültür" },
  { id: "movies", name: "Filmler" },
  { id: "music", name: "Müzik" },
];
export default function HomeScreen() {
  const navigations = useNavigation();
  const [completedTest, setcompletedTest] = useState([]);
  useEffect(() => {
    function fetchCompletedTest() {
      getCompletedTest().then((test) => setcompletedTest(test));
    }

    const unsubscripte = navigations.addListener("focus", fetchCompletedTest);

    return unsubscripte;
  }, [navigations]);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View>
        <FlatList
          data={categories}
          renderItem={({ item }) => <Categories category={item} isCompleted={completedTest.includes(item.id)} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
            gap: 16,
            marginHorizontal: 16,
          }}
          columnWrapperStyle={{
            columnGap: 16,
          }}
        />
      </View>
    </View>
  );
}
