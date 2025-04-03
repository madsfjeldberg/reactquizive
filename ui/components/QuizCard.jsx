import questions from "../../questions.json";
import { Card } from "@rneui/themed";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useState } from "react";
import SlideToReveal from "./SlideToReveal";
import { Alert } from "react-native";

export default function QuizCard({ question, options, selectedAnswer, setSelectedAnswer, correctAnswer }) {

  const allQuestions = questions.questions.flatMap((topic) => topic.questions);
  const [questionList, setQuestionList] = useState(allQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questionList[0]);


  const getButtonStyle = (index) => {
    console.log(`Button style function triggered for option: ${index}`); 
    if (selectedAnswer === null) return styles.button;
    if (selectedAnswer === index && selectedAnswer === correctAnswer) {
      return {...styles.button, backgroundColor:"green"};
    } 
    if (selectedAnswer === index && selectedAnswer !== correctAnswer) {
      return { ...styles.button, backgroundColor: "red" };
    }
    return styles.button;
  }
  const handleNextQuestion = () => {
    setCurrentQuestion(questionList[currentQuestionIndex + 1]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const handleSlideToReveal = () => {
    // some reveal answer logic here. for now just log the answer
    Alert.alert('Reveal Answer', currentQuestion.answer);
    console.log(currentQuestion.answer);

  }

  return (
<Card containerStyle={styles.card}>

        <Card.Title>{currentQuestion.question}</Card.Title>
        <Card.Divider />
        {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={getButtonStyle(index)} // Use the index to check the button style
          onPress={() => selectedAnswer === null && setSelectedAnswer(index)} // Set selectedAnswer as index
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}

      
      <SlideToReveal onEndReached={handleSlideToReveal} />

      <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
        <Text>Next</Text>
      </TouchableOpacity>

      </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    marginTop: 80,
    margin: 0,
    padding: 20,
    borderRadius: 0,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },

});
