import questions from "../../questions.json";
import { Card } from "@rneui/themed";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
export default function QuizCard({ question, options, selectedAnswer, setSelectedAnswer, correctAnswer }) {
  const allQuestions = questions.questions.flatMap((topic) => topic.questions);
  const [questionList, setQuestionList] = useState(allQuestions);
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
    backgroundColor: "lightgrey",
    color: "white",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});
