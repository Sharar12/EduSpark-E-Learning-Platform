import React, { useState } from 'react';
import { getQuiz } from '../lib/quizzes.js';
import './QuizPage.css';



const QuizPage = ({ quiz, onBackToCourse }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // For this demo, we'll only use the first question of the quiz
  const question = quiz.questions[0];

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const getResultClass = (option) => {
    if (!isSubmitted) return '';
    if (option === question.correctAnswer) return 'correct';
    if (option === selectedAnswer) return 'incorrect';
    return '';
  };

  return (
    <div className="quiz-page-container">
      <div className="quiz-card">
        <h1 className="quiz-title">{quiz.title}</h1>
        <p className="quiz-question">{question.question}</p>
        
        <div className="quiz-options">
          {question.options.map((option, index) => (
            <label key={index} className={`option-label ${getResultClass(option)}`}>
              <input 
                type="radio" 
                name="quiz-option" 
                value={option}
                checked={selectedAnswer === option}
                onChange={() => setSelectedAnswer(option)}
                disabled={isSubmitted}
              />
              {option}
            </label>
          ))}
        </div>
        
        {isSubmitted && (
          <div className="quiz-result">
            {selectedAnswer === question.correctAnswer ? (
              <p className="result-correct">Correct! Well done.</p>
            ) : (
              <p className="result-incorrect">
                Not quite. The correct answer is: <strong>{question.correctAnswer}</strong>
              </p>
            )}
          </div>
        )}
        
        <div className="quiz-actions">
          <button onClick={onBackToCourse} className="back-to-course-btn">
            Back to Course
          </button>
          {!isSubmitted && (
            <button onClick={handleSubmit} className="submit-quiz-btn" disabled={!selectedAnswer}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
