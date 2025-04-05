import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import questions from '../data/queations';

const QuizScreen = () => {
  const route = useRoute();
  const navigation =useNavigation();
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [score, setscore] = useState(0);

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
    }else{
      // skor/total
      // @ts-ignore
      navigation.navigate("Result", {score,total:quiezQuestions.length});
    }
  }
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

  option: {
    padding: 8,
    paddingHorizontal:32,
    backgroundColor: "dodgerblue",

  },
  optionText: {
    color: "white",
    textAlign: "center",
    fontSize: 24

  }

})
export default QuizScreen