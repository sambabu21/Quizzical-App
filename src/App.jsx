import React from "react";
import Intro from "./Intro.jsx";
import Quiz from "./Quiz.jsx";
import { decode } from "html-entities";

// import {nanoid} from 'nanoid'

export default function App() {
  //the quiz will have 3 states:start,quiz and restart which will handle the screens
  const [status, setStatus] = React.useState("start");
  const [questions, setQuestions] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const countRef = React.useRef(0);
  // const [count,setCount] = React.useState(0)

  // let count
  function addMarks() {
    countRef.current++;
  }

  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  React.useEffect(() => {
    if (status === "play") {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data.results);
        });
    }
  }, [status]);

  function checkAnswer() {
    setIsSubmitted(true);
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  function resetGame() {
    setStatus("start");
    setQuestions([]);
    setIsSubmitted(false);
    countRef.current = 0;
    setDarkMode(false);
  }

  const quizList = questions.map((que) => {
    let options = que.incorrect_answers;
    if (isSubmitted === false) {
      options.push(que.correct_answer);
      options = shuffleArray(options);
    }

    return (
      <Quiz
        key={que.question}
        question={decode(que.question)}
        options={options}
        answer={que.correct_answer}
        checkAnswer={checkAnswer}
        isSubmitted={isSubmitted}
        addMarks={addMarks}
      />
    );
  });

  return status === "start" ? (
    <Intro
      setStatus={setStatus}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />
  ) : (
    <div className={darkMode ? "dark" : ""}>
      <h1 className="game-title quiz-title">QUIZZICAL</h1>
      <div className="quiz-page">
        <span className="top-circle"></span>
        {quizList}
        <div className="footer">
          {isSubmitted && (
            <h3>You scored {countRef.current}/5 correct answers.</h3>
          )}
          {!isSubmitted && (
            <button className="check-btn" onClick={checkAnswer}>
              Check answers
            </button>
          )}
          {isSubmitted && (
            <button className="check-btn" onClick={resetGame}>
              Play again
            </button>
          )}
        </div>
        <span className="bottom-circle"></span>
      </div>
    </div>
  );
}
