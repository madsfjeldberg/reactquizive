import questions from "../../questions.json";
import { Card } from "@rneui/themed";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { useState } from "react";
import SlideToReveal from "./SlideToReveal";

export default function QuizCard({ question, options }) {
  const allQuestions = questions.questions.flatMap((topic) => topic.questions);
  const [questionList, setQuestionList] = useState(allQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questionList[0]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestion(questionList[currentQuestionIndex + 1]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestion(questionList[currentQuestionIndex - 1]);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSlideToReveal = () => {
    Alert.alert('Reveal Answer', currentQuestion.answer);
    console.log(currentQuestion.answer);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.question}>{currentQuestion.question}</Card.Title>

        {/* Options with A, B, C, D */}
        {currentQuestion.options.map((option, index) => {
          const label = String.fromCharCode(65 + index); // Converts index to A, B, C, D
          return (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.optionText}>{`${label}: ${option}`}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Button Row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.navButton} onPress={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            <Text style={styles.navButtonText}>Forrige</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleNextQuestion} disabled={currentQuestionIndex === questionList.length - 1}>
            <Text style={styles.navButtonText}>Næste</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Slide to reveal answer */}
      <SlideToReveal onEndReached={handleSlideToReveal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between", // Ensure content takes all available space
  },
  card: {
    flex: 1,
    width: "90%",  // Reduced the width to add space to both sides
    marginTop: 20,
    marginHorizontal: "5%",  // Added space to both sides (left and right)
    padding: 18,
    borderRadius: 20,
    marginBottom: 160, // Added space for slide button
    backgroundColor: "#f5f5f5", // Gray background like the swipe button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: "#d9f0ff",  
    padding: 12,
    borderRadius: 20,  
    margin: 10,
  },
  optionText: {
    fontSize: 13,  // Increased font size
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#d9f0ff",  
    paddingVertical: 18,  
    paddingHorizontal: 30,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 16,  
    fontWeight: "bold",
  },
});
