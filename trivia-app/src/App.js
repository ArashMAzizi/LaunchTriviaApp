import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Questionaire from './components/Questionaire';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAns, showCorrectAns] = useState(false);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((res) => res.json())
      .then((res) => {
        const qs = res.results.map((q) => ({
          ...q, answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
        }))
        setQuestions(qs);
      })
  },[])

  const handleAnswer = (answer) => {
    if(!correctAns){
      if(answer === questions[currentIndex].correct_answer){
        setScore(score+1);
      }
    }
    
    showCorrectAns(true);
  }

  const showNext = () => {
    setCurrentIndex(currentIndex+1);
    showCorrectAns(false);
  }

  return ( questions.length > 0 ? (
    <div className="container">
      {currentIndex >= questions.length ? (<h1>Your Score is {score}</h1>): (
        <Questionaire handleAnswer={handleAnswer} showNext={showNext} correctAns={correctAns}
        res={questions[currentIndex]}/>
      )}
      
    </div>
  ): <div>"Loading Question..."</div>
  );
}

export default App;
