import { useState } from "react";
import Question from "./question";
import styles from './index.module.css';
import DisplayContentButton from "./displayContent";

function segregateTextsByDays(response) {
  const convertedResponse = response.replace(/\n/g, '');
  //console.log(convertedResponse);
  console.log(response);
  var stringifyResponse = convertedResponse.toString();
  const dayRegex = /(day\s*\d+|Day\s*\d+\s*:|Day\s*\d+\s*-\s*|Day\s*\d+\s*-|day\s*\d+\s*:|day\s*\d+\s*-)\s*([\s\S]*?)(?=(day\s*\d+|Day\s*\d+\s*:|Day\s*\d+\s*-\s*|Day\s*\d+\s*-|day\s*\d+\s*:|day\s*\d+\s*-)|$)/gi;

  const days = [];
  let match;

  while ((match = dayRegex.exec(response)) !== null) {
    const content = match[2].trim();
    days.push(content);
  }

  return days;
}

export default function InputForm() {

  const [contentArray,setContentArray] = useState([]);
  const [responseGet,setResponseGet] = useState(false);
  const [taskArray, setTaskArray] = useState([]);
 
  const [inputData, setInputData] = useState({
    topic: "",
    age: "",
    techStack: "",
    duration: "",
  });

  const questions = [
    { question: "Hey, what do you want to learn today?", placeholder: "Type any tech related topic here...", name: "topic" },
    { question: "Sounds good, please help us with your age?", placeholder: "Type your age", name: "age" },
    { question: "Awesome! Now, please type in any related tech stack that you already know, separated by commas.", placeholder: "This will help us personalize the content for you", name: "techStack" },
    { question: "Lastly, tell us how long you are looking to study this for?", placeholder: "Type the number of days required", name: "duration" },
    { question: "Lastly, tell us how long you are looking to study this for?", placeholder: "Type the number of days required", name: "duration" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleAnswerChange = (e) => {

    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextQuestion = () => {
    console.log(currentQuestionIndex);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  async function onSubmit(event) {

    console.log(inputData);
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/learn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      let rawResult = data.result;
      

      setIsLoading(false);
      setResponse(rawResult);
      try{
      const segregatedTexts = segregateTextsByDays(rawResult);
      console.log(segregatedTexts);
      setContentArray(segregatedTexts);
      
      }
      catch (error){
        console.log(error);
      }
      
      setResponseGet(true);
      
      
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert(error.message);
    }

  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {isLoading ? (
          <p>Loading...</p>
        ) : responseGet ? (
          <div>
            <h1>Follow this course to learn {inputData.topic}</h1>
            <div className={styles.contentContainer}>
              {contentArray.map((content, index) => (
                <DisplayContentButton
                  className="button"
                  key={index}
                  buttonLabel={`Day ${index + 1}`}
                  content={(content)}
                />
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            {currentQuestionIndex === -1 ? (
              <div className={styles.startContainer}>
                <h3>Try Basic Features of Skille for free! </h3>
                <img src="/logobg.png" alt="Logo" className={styles.logo} />
                <button type="button" onClick={handleNextQuestion} className={styles.startButton}>
                  Start Learning
                </button>
              </div>
            ) : (
              <Question
                question={questions[currentQuestionIndex].question}
                placeholder={questions[currentQuestionIndex].placeholder}
                name={questions[currentQuestionIndex].name}
                value={inputData[questions[currentQuestionIndex].name]}
                onChange={handleAnswerChange}
              />
            )}
  
            {currentQuestionIndex < questions.length - 1 && currentQuestionIndex !== -1 ? (
              <button type="button" onClick={handleNextQuestion}>
                Proceed
              </button>
            ) : currentQuestionIndex !== -1 ? (
              <button type="submit">Submit</button>
            ) : (
              <h1></h1>
            )}
          </form>
        )}
      </main>
    </div>
  );
  
}
