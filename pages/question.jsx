export default function Question({ question, placeholder, name, value, onChange }) {
    return (
      <div>
        <h3>{question}</h3>
        <input type="text" placeholder={placeholder} name={name} value={value} onChange={onChange} />
      </div>
    );
  }
  