import { useState } from "react";
import Question from "./question";
import styles from './index.module.css';

import DisplayContentButton from "./displayContent";

function extractPointsFromString(str) {
  const points = str.split('.'); // Split the string into an array using dot ('.') as the separator
  const formattedPoints = points.map((point, index) => (
    <div key={index}>
      <DisplayContentButton
        className="button"
        buttonLabel={`Task ${index + 1}`}
        content={point.trim()} // Trim any leading/trailing spaces from each point
      />
    </div>
  ));

  return formattedPoints;
}

function formatString(str) {
  console.log(str);
  const points = [];
  let point = '';
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    if ((char >= '0' && char <= '9') && (i === 0 || (str[i - 1] !== '.' && str[i - 1] !== '-' && str[i - 1] !== ' '))) {
      if (point.length > 0) {
        points.push(point);
        point = '';
      }
      
      point += char;
    } else if (char === '-' && i > 0 && i < str.length - 1 && str[i - 1] === ' ' && str[i + 1] === ' ') {
      if (point.length > 0) {
        points.push(point);
        point = '';
      }
      
      point += char;
    } else if (char === '.') {
      if (point.length > 0) {
        points.push(point);
        point = '';
      }
      
      point += char;
    } else {
      point += char;
    }
  }
  
  if (point.length > 0) {
    points.push(point);
  }
  
  return points.map((point, index) => (
    <div>
    <DisplayContentButton
    className="button"
    key={index}
    buttonLabel={`Task ${index + 1}`}
    content={point}
    />
    </div>
  ));
}

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
function parseContent(content) {
  const tasks = [];
  const lines = content.split('\n');
  let currentTask = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if the line starts with a bullet point or dash
    const match = line.match(/^[-:]\s*(.*)/);

    if (match) {
      // New task found, store the previous task if any
      if (currentTask) {
        tasks.push(currentTask);
      }

      // Set the current task to the matched task
      currentTask = match[1];
    } else if (currentTask) {
      // Line does not start with a bullet point or dash, consider it part of the current task
      currentTask += ' ' + line;
    }
  }

  // Add the last task to the tasks array
  if (currentTask) {
    tasks.push(currentTask);
  }

  return tasks;
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
    // const segregatedTexts = segregateTextsByDays(`Day 1

    // 1. Read through the official Flask documentation and get familiar with the basics: http://flask.pocoo.org/docs/1.0/
    
    // 2. Watch this Flask tutorial video series to learn the basics: https://www.youtube.com/watch?v=Z1RJmh_OqeA
    
    // 3. Work through the Flask tutorials provided by the official Flask site: http://flask.pocoo.org/docs/1.0/tutorial/
    
    // Day 2
    
    // 1. Read through the Quickstart guide for Flask and get familiar with the structure of Flask applications: http://flask.pocoo.org/docs/1.0/quickstart/
    
    // 2. Read through the official Flask tutorial to get a deeper understanding of the framework: http://flask.pocoo.org/docs/1.0/tutorial/
    
    // 3. Work through the official Flask tutorial examples and get hands-on experience: http://flask.pocoo.org/docs/1.0/tutorial/examples/
    
    // Day 3
    
    // 1. Work through the official Flask tutorial and build a simple application: http://flask.pocoo.org/docs/1.0/tutorial/
    
    // 2. Read through the official Flask API documentation and understand the different features of the framework: http://flask.pocoo.org/docs/1.0/api/
    
    // 3. Work through some example Flask applications to get a better understanding of the different features of the framework: https://github.com/pallets/flask/tree/master/examples
    // `)
    // console.log(segregatedTexts);
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
      var tasks = [];
      segregatedTexts.forEach(element => {
        tasks.push(parseContent(element));
      });

      setTaskArray(tasks);
      
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
