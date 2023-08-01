
const TaskDisplay = ({ point }) => {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(!showContent);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <button onClick={handleClick}>Show Task</button>
      {showContent && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            background: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <pre>{point}</pre>
        </div>
      )}
    </div>
  );
};

export default TaskDisplay;
