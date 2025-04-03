import questions from "../../questions.json";
import { Card } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState } from "react";
import SlideToReveal from "./SlideToReveal";
import { Alert } from "react-native";

export default function QuizCard({ question, options }) {
  const allQuestions = questions.questions.flatMap((topic) => topic.questions);
  const [questionList, setQuestionList] = useState(allQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questionList[0]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleNextQuestion = () => {
    setCurrentQuestion(questionList[currentQuestionIndex + 1]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowCorrectAnswer(false);
  };

  const handleOptionPress = (option) => {
    if (option === currentQuestion.options[currentQuestion.correctAnswer]) {
      Alert.alert("Correct Answer", "You are correct!");
    } else {
      Alert.alert("Incorrect Answer", "You are incorrect!");
    }
  };

  const handleSlideToReveal = () => {
    setShowCorrectAnswer(true);
  };

  const getButtonStyle = (index) => {
    if (showCorrectAnswer && index === currentQuestion.correctAnswer) {
      return [styles.button, styles.correctButton];
    }
    return styles.button;
  };

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.question}>
        {currentQuestion.question}
      </Card.Title>
      <TouchableOpacity
        style={getButtonStyle(0)}
        onPress={() => handleOptionPress(currentQuestion.options[0])}
      >
        <Text>{currentQuestion.options[0]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={getButtonStyle(1)}
        onPress={() => handleOptionPress(currentQuestion.options[1])}
      >
        <Text>{currentQuestion.options[1]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={getButtonStyle(2)}
        onPress={() => handleOptionPress(currentQuestion.options[2])}
      >
        <Text>{currentQuestion.options[2]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={getButtonStyle(3)}
        onPress={() => handleOptionPress(currentQuestion.options[3])}
      >
        <Text>{currentQuestion.options[3]}</Text>
      </TouchableOpacity>

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
  correctButton: {
    backgroundColor: "#90EE90",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
});
