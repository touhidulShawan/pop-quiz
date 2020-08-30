import React, { useState } from "react";
import { fetchQuestions, Difficulty, QuestionState } from "./api/API";
import Question from "./components/Question";

const TOTAL_QUESTION = 15;

export interface UserAnswer {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [quesNumber, setQuesNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuestions(
        TOTAL_QUESTION,
        Difficulty.EASY
      );
      setQuestions(newQuestions);
    } catch (error) {
      console.log(error);
    }

    setScore(0);
    setUserAnswer([]);
    setQuesNumber(0);
    setLoading(false);
  };

  const checkAnswer = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = evt.currentTarget.value;
      console.log("User answer " + answer);
      console.log(`Correct answer is ${questions[quesNumber].correct_answer}`);
      const correctAns = questions[quesNumber].correct_answer === answer;
      console.log(correctAns);
      if (correctAns) {
        setScore((previous_score) => previous_score + 1);
      }

      const userAns = {
        question: questions[quesNumber].question,
        answer: answer,
        isCorrect: correctAns,
        correctAnswer: questions[quesNumber].correct_answer,
      };

      setUserAnswer((previous) => [...previous, userAns]);
    }
  };

  const nextQuestion = () => {
    const nextQuestionNumber = quesNumber + 1;

    if (nextQuestionNumber === TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setQuesNumber(nextQuestionNumber);
    }
  };
  return (
    <div>
      <header>
        <h1>Pop Quiz</h1>
        {gameOver || userAnswer.length === TOTAL_QUESTION ? (
          <button onClick={startQuiz}>Start Quiz</button>
        ) : null}
        {!gameOver ? <p>Score: {score}</p> : null}
      </header>
      <main>
        {loading ? <p>Loading question...</p> : null}
        {!loading && !gameOver ? (
          <Question
            questionNumber={quesNumber + 1}
            totalQuestions={TOTAL_QUESTION}
            question={questions[quesNumber].question}
            answers={questions[quesNumber].answers}
            userAnswer={userAnswer[quesNumber]}
            handleCheckAnswer={checkAnswer}
          />
        ) : null}
        {!gameOver &&
        !loading &&
        userAnswer.length === quesNumber + 1 &&
        quesNumber !== TOTAL_QUESTION - 1 ? (
          <button onClick={nextQuestion}>Next Question</button>
        ) : null}
      </main>
    </div>
  );
};

export default App;
