import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_COMPLETED_TEST = "completedTests";

export const saveCompletedTest = async (category: string) => {
  const completed = await AsyncStorage.getItem(KEY_COMPLETED_TEST);
  const completedTests = completed === null ? [] :  JSON.parse(completed);

  // Eğer o kategori tamamlanmamışssa kaydetme çık.
  if (completedTests.includes(category)) {
    return;
  }
  completedTests.push(category);
  await AsyncStorage.setItem(
    KEY_COMPLETED_TEST,
    JSON.stringify(completedTests)
  );
};
export const getCompletedTest = async () => {
  const completed = await AsyncStorage.getItem(KEY_COMPLETED_TEST);
  return completed ? JSON.parse(completed) : [];
};
