// ContentBox.js
import React from 'react';

const ContentBox = ({ content }) => {
  return (
    <div style={{ border: '2px solid black', padding: '10px', margin: '10px' }}>
      <p>{content}</p>
    </div>
  );
};

// ContentContext.js
import { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState('Initial Content');

  const updateContent = (newContent) => {
    setContent(newContent);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}


export default ContentBox;
