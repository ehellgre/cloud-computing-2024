import './App.css';
import axios from 'axios'
import React, { useState } from 'react'


function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const api_key = process.env.REACT_APP_API_KEY

  const analyzeSentiment = async () => {
    const options = {
      method: 'POST',
      url: 'https://sentiment-analysis9.p.rapidapi.com/sentiment',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': 'sentiment-analysis9.p.rapidapi.com'
      },
      data: JSON.stringify([{ id: '1', language: 'en', text: text }])
    };

    try {
      const response = await axios.request(options);
      console.log(response)
      console.log(response.data[0])
      const predictionRes = response.data[0].predictions[0].prediction;
      const predictionRes2 = response.data[0].predictions[0].probability;
      setResult(`Sentiment: ${predictionRes} (Probability: ${predictionRes2})`);
      console.log(result)
    } catch (error) {
      console.error('Error:', error);
      setResult('Failed to analyze sentiment');
    }
  };



  return (
    <div className="App">
      <header className="App-header">
        <h3>Sentiment Analysis Frontend</h3>
        <textarea className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write text for analysis! (only english accepted)" style={{width: '300px', height: '100px', marginBottom: '10px'}}
        />
        <button onClick={analyzeSentiment}>Send</button>
        <p>{result}</p>
      </header>
    </div>
  );
}

export default App;
