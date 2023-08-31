import React, { useState } from 'react';
import { useContent } from './contentBox';

function multilineToArr(input) {
  // Split the input by newline characters to create an array of lines.
  const linesArray = input.split(/\r?\n/);
  
  // Filter out any lines that are entirely whitespace or empty.
  return linesArray.filter(line => line.trim() !== '');
}


function processArray(inputArray) {
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


const DisplayContentButton = ({ buttonLabel, content, updateContent }) => {
  const [showSections, setShowSections] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);

  const { content1, updateContent1 } = useContent();

  const handleContentChange = (newContent) => {
    updateContent1(newContent);
  };
  var multArr = multilineToArr(content);

  var result = processArray(multArr);
  const { sections, ...parts } = result;

  const handleSectionClick = (section) => {
    setSelectedSection(selectedSection === section ? null : section);
    setSelectedPart(null);
  };

  const handlePartClick = (part,selectedSection) => {
    setSelectedPart(part);
    handleContentChange(selectedSection)
  };

  const handleClick = () => {
    setShowSections(!showSections);
    setSelectedSection(null);
    setSelectedPart(null);
  };


  return (
    <div>
      <button onClick={handleClick}>{buttonLabel}</button>
      {showSections && (
        <div>
          <h2>Tasks for the day:</h2>
          {sections.map((section, index) => (
            <div key={index}>
              <button className="Part_Button" onClick={() => handleSectionClick(section)}>
                {`Part ${index + 1}`}
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedSection !== null && (
        <div>
          <h2>{selectedSection}:</h2>
          {parts[`parts_${sections.indexOf(selectedSection)}`]?.map((part, index) => (
            <div key={index}>
              <button className='' onClick={() => handlePartClick(part,selectedSection)}>
                Part {index + 1}
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedPart !== null && (
        <div>
          <h2>Content of Part {parts[`parts_${sections.indexOf(selectedSection)}`].indexOf(selectedPart) + 1}:</h2>
          {selectedPart.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayContentButton;
