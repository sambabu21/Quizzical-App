import React from "react";
import { decode } from "html-entities";
import { classnames } from "classnames";

export default function Quiz(props) {
  const [answer, setAnswer] = React.useState({
    option: "",
  });

  function handleClick(event) {
    const { name, value } = event.target;
    if (value === props.answer && !props.isSubmitted) {
      props.addMarks();
    }
    setAnswer((oldAnswer) => {
      return {
        ...oldAnswer,
        [name]: value,
      };
    });
  }

  const choices = props.options.map((choice) => {
    let labelClass = "";
    let val = decode(choice);
    let isChecked = answer.option === val;
    // console.log(isChecked)
    let isCorrect = answer.option === props.answer;

    if (isChecked && isCorrect) {
      labelClass = "label correct";
    } else if (isChecked && !isCorrect) {
      labelClass = "label wrong";
    } else if (!isChecked && val === props.answer) {
      labelClass = "label correct";
    } else {
      labelClass = "label unchecked";
    }

    return (
      <>
        <input
          key={val}
          type="radio"
          name="option"
          value={val}
          className="radio "
          onChange={handleClick}
          checked={answer.option === val}
          id={val}
        />

        <label
          className={props.isSubmitted ? labelClass : "label"}
          htmlFor={val}
        >
          {choice}
        </label>
      </>
    );
  });

  return (
    <div className="quiz-section">
      <h2 className="question">{props.question}</h2>
      <div className="choices">
        <form className="form-options">{choices}</form>
      </div>
    </div>
  );
}
