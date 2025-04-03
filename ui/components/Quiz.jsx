import questions from "../../questions.json";
import { Card } from "@rneui/themed";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
export default function QuizCard({ question, options }) {
  const allQuestions = questions.questions.flatMap((topic) => topic.questions);
  const [questionList, setQuestionList] = useState(allQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(questionList[0]);

  //hello!
  return (
<Card containerStyle={styles.card}>
        <Card.Title>{currentQuestion.question}</Card.Title>
        <Card.Divider />
        <TouchableOpacity style={styles.button}>
          <Text>{currentQuestion.options[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>{currentQuestion.options[1]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>{currentQuestion.options[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>{currentQuestion.options[3]}</Text>
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
    backgroundColor: "lightgrey",
    color: "white",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});
