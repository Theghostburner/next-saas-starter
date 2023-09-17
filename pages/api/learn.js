import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  let { topic,age, techStack,duration } = req.body;
  if (!age || !topic || !techStack || !duration) {
    res.status(400).json({
      error: {
        message: "Please provide all the required details",
      }
    });
    return;
  }

  let prompt = generatePrompt(topic,age,techStack,duration);
  let completion;
  let result = '';
  let firstTime = true;

  try {
    for (let i = 0; i < duration; i += 5) {
      prompt = updatePrompt(prompt, i,topic,duration);
      // console.log(prompt);
      console.log("Making Course from day: "+i);
      completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.6,
        max_tokens: 1000,
       // stop: ["6.", "11.", "16.", "21.", "26.", "31.", "36.", "41.", "46.", "51.", "56.", "61.", "66.", "71.", "76.", "81.", "86.", "91.", "96."],
      });
      result += completion.data.choices[0].text ;
      
    }
    res.status(200).json({ result });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}


function generatePrompt(topic,age,techStack,duration) {
  return `I am a ${age} year old person with experience in the following - ${techStack}. I want to learn ${topic} in ${duration} days. Please provide me with a daywise schedule along with resources (short) that I should follow to become a master in ${topic} for the days 1-5 only.
`;
}
function cutPrompt(prompt) {
    const parts = prompt.split('Please provide me with a daywise schedule along with resources (short) that I should follow to become a master in');
    const remaining = parts[0].trim();
    return remaining;
  }
  
function updatePrompt(prompt, i,topic,duration) {
    const promptLines = prompt.split('\n');
    const daysStart = i+1;
    var daysEnd = daysStart + 4;
    if(daysEnd > duration)
    {
      daysEnd = duration;
    }
    const newLine = cutPrompt(prompt)+ `Please provide me with a daywise schedule along with resources (short) that I should follow to become a master in ${topic} for the days ${daysStart}-${daysEnd} only.`;
    return newLine;
  }
