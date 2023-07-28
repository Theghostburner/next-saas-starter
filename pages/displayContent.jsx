import React, { useState } from 'react';

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
const DisplayContentButton = ({ buttonLabel, content }) => {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(!showContent);
  };

  return (
    <div>
      <button onClick={handleClick}>{buttonLabel}</button>
      {showContent && (
        <div style={{ display: 'flex', justifyContent:'left', }}>{/* Adjust the styles here */}
          <pre>{content}</pre>
          {/* {extractPointsFromString(content)} */}
        </div>
      )}
    </div>
  );
};

export default DisplayContentButton;
