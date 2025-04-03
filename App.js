import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import questions from "./questions.json";
import QuizCard from "./ui/components/Quiz";
import ConfettiCannon from "react-native-confetti-cannon";

export default function App() {
  const allQuestions = questions.questions.flatMap((topic) => topic.questions);
  const [questionList, setQuestionList] = useState(allQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(questionList[0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000); // Reset after 2 seconds
  };

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
  };
  
  return (
    <View style={styles.container}>
      <QuizCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={handleAnswer} // Pass setSelectedAnswer here
        correctAnswer={currentQuestion.correctAnswer}
        style={styles.quiz}
      />

      <Button title="🎉 Start Confetti" onPress={triggerConfetti} />
      {showConfetti && (
        <ConfettiCannon 
        count={200} 
        origin={{ x: 200, y: 0 }}
        style={styles.confetti}
         />)
         }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  confetti: {
    position: "absolute",
    top:0,
    left:0,
    zIndex:100,
  },
  quiz: {
    zIndex:1,
  }
});
