import React from "react";
import { UserAnswer } from "../App";

export interface Props {
  question: string;
  answers: string[];
  userAnswer: UserAnswer | undefined;
  questionNumber: number;
  totalQuestions: number;
  handleCheckAnswer: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}

const Question: React.FC<Props> = ({
  question,
  answers,
  userAnswer,
  questionNumber,
  totalQuestions,
  handleCheckAnswer,
}) => {
  return (
    <div>
      <p>
        Questions: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((ans) => {
          return (
            <div key={ans}>
              <button
                disabled={userAnswer ? true : false}
                value={ans}
                onClick={handleCheckAnswer}
              >
                <span dangerouslySetInnerHTML={{ __html: ans }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
