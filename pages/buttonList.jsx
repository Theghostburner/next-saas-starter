import React, { useState } from 'react';
import styles from './index.module.css';

const ButtonList = ({ items, index }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
    setVisibleItems([]);
  };

  const handleButtonClick = (itemIndex) => {
    if (visibleItems.includes(itemIndex)) {
      setVisibleItems(visibleItems.filter((index) => index !== itemIndex));
    } else {
      setVisibleItems([...visibleItems, itemIndex]);
    }
  };

  const renderButtons = () => {
    return showButtons ? (
      <div>
        <button onClick={toggleButtons}>Minimise Tasks</button>
        <div className="buttonList">
          {items.map((item, itemIndex) => (
            <button
              key={itemIndex}
              onClick={() => handleButtonClick(itemIndex)}
              className={`${styles.partButton} ${visibleItems.includes(itemIndex) ? 'active' : ''}`}
            >
              Task {itemIndex + 1}
            </button>
          ))}
        </div>
      </div>
    ) : (
      <button onClick={toggleButtons}>Day {index}</button>
    );
  };

  const renderTextContainer = () => {
    if (visibleItems.length > 0) {
      return (
        <div className="textContainer">
          {visibleItems.map((itemIndex) => (
            <div key={itemIndex}>
              <p>{items[itemIndex]}</p>
              <button onClick={() => handleButtonClick(itemIndex)}>Hide</button>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderButtons()}
      {renderTextContainer()}
    </div>
  );
};

export default ButtonList;
