import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import questions from '../data/queations';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';

const QuizScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [score, setscore] = useState(0);
  const [showHint, setshowHint] = useState(false)
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // TODO: Add types
  // @ts-ignore
  const { category } = route.params;
  //@ts-ignore
  const quiezQuestions = questions[category];

  const { question, answerIndex, options, hint } = quiezQuestions[currentQuestionIndex];

  const handleAnswer = (option, optionIndex) => {

    if (optionIndex === answerIndex) {
      setscore((prev) => prev + 1);
    }

    // Tüm sorular yanıtlanmadıysa
    if (currentQuestionIndex + 1 < quiezQuestions.length) {
      setcurrentQuestionIndex((prev) => prev + 1);
    } else {
      // skor/total
      // @ts-ignore
      navigation.navigate("Result", { score, category, total: quiezQuestions.length });
    }
  }
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setshowHint(false);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.optionContainer}>
        {options.map((x, i) => (

          <TouchableOpacity key={x} style={styles.option} onPress={() => handleAnswer(x, i)}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.optionText}>{x}</Text>
          </TouchableOpacity>

        ))}
      </View>

      <TouchableOpacity style={styles.hint} onPress={() => setshowHint(prev => !prev)}>
        <Text style={styles.hintText}>i</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.prevQuestions,{backgroundColor: currentQuestionIndex === 0 ? "gray" : "dodgerblue"}]} 
                      onPress={() => setcurrentQuestionIndex(prev => prev - 1)}
                      disabled={currentQuestionIndex === 0}>
        <Text style={styles.prevQuestionsText}> Önceki Soru</Text>
      </TouchableOpacity>
      {
        showHint && (<BottomSheet onChange={handleSheetChanges} ref={bottomSheetRef} enablePanDownToClose snapPoints={[200, "50%"]}>
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.bottomSheetText}>İpucu 🎉</Text>
            <Text style={styles.bottomSheetDescription}>{hint}</Text>
          </BottomSheetView>
        </BottomSheet>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    gap: 32
  },
  question: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold"
  },
  optionContainer: {
    gap: 9,
  },
  hint: {
    backgroundColor: "tomato",
    width: 80,
    height: 80,
    borderRadius: 80,
    position: "absolute",
    bottom: 32,
    right: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  hintText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold"
  },
  option: {
    padding: 8,
    paddingHorizontal: 32,
    backgroundColor: "dodgerblue",

  },
  optionText: {
    color: "white",
    textAlign: "center",
    fontSize: 24

  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
    gap: 8
  },
  bottomSheetText: {
    fontSize: 24
  },
  bottomSheetDescription: {
    fontSize: 16
  },
  prevQuestions:{
    backgroundColor: "dodgerblue",
    paddingVertical:8,
    paddingHorizontal:16,
    position: "absolute",
    bottom: 32,
    left: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  prevQuestionsText:{
    fontSize:16,
    color:"white",
  }

})
export default QuizScreen