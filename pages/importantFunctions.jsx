export function multilineToArr(input) {
    // Split the input by newline characters to create an array of lines.
    const linesArray = input.split(/\r?\n/);
    
    // Filter out any lines that are entirely whitespace or empty.
    return linesArray.filter(line => line.trim() !== '');
  }
  
  
  export function processArray(inputArray) {
    const sections = [];
    let currentPart = null;
    const parts = [];
    let isFirstLineWithoutNumber = false;
  
    for (let i = 0; i < inputArray.length; i++) {
      const line = inputArray[i];
  
      if (i === 0 && line.trim() !== "" && !/^\d+\./.test(line)) {
        // First line is not empty and doesn't start with a number,
        // so set the flag to true and skip adding the first line to sections
        isFirstLineWithoutNumber = true;
        continue;
      }
  
      if (isFirstLineWithoutNumber) {
        // If the flag is true, it means all lines should be treated as sections
        sections.push(line);
      } else if (/^\d+\./.test(line)) {
        // Line starts with a number, so it is a section
        sections.push(line);
        // If there was an ongoing unnumbered part, push it to the parts array
        if (currentPart !== null) {
          parts.push(currentPart);
          currentPart = null;
        }
      } else {
        // Line does not start with a number, so it is an unnumbered part
        if (currentPart === null) {
          currentPart = [];
        }
        currentPart.push(line);
      }
    }
  
    // If there is an ongoing unnumbered part at the end, push it to the parts array
    if (currentPart !== null) {
      parts.push(currentPart);
    }
  
    return { sections, ...Object.fromEntries(parts.map((part, index) => [`parts_${index}`, part])) };
  }

  export function processArraySectionsOnly(inputArray) {
    const sections = [];
    let currentSection = null;
  
    for (let i = 0; i < inputArray.length; i++) {
      const line = inputArray[i].trim();
  
      if (/^(\d+\.|-)/.test(line)) {
        // Line starts with either a number or a dash, so it is a new section
        currentSection = line;
        sections.push(currentSection);
      } else if (currentSection !== null) {
        // If there's an ongoing section, append the line to it
        currentSection += `\n${line}`;
      }
    }
  
    return sections;
  }
  export function segregateTextsByDays(response) {
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