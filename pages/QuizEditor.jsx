import React, { useState, useEffect } from 'react';
import { getQuiz, saveQuiz } from '../lib/quizzes.js';
import './QuizEditor.css';



const QuizEditor = ({ quiz, quizId, onSave, onBack }) => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (quiz) {
            setTitle(quiz.title);
            setQuestions(quiz.questions);
        } else {
            setTitle('New Quiz');
            setQuestions([{ 
                id: `q-${Date.now()}`,
                question: '', 
                options: ['', '', ''], 
                correctAnswer: '' 
            }]);
        }
    }, [quiz]);

    const handleQuestionChange = (qIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].question = value;
        setQuestions(newQuestions);
    };
    
    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };
    
    const handleCorrectAnswerChange = (qIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctAnswer = value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            id: `q-${Date.now()}`,
            question: '',
            options: ['', '', ''],
            correctAnswer: ''
        }]);
    };
    
    const handleRemoveQuestion = (qIndex) => {
        const newQuestions = questions.filter((_, index) => index !== qIndex);
        setQuestions(newQuestions);
    };
    
    const handleSave = () => {
        const quizData = {
            id: quiz?.id || quizId || '',
            title,
            questions,
        };
        onSave(quizData);
    };

    return (
        <div className="editor-container">
            <header className="editor-header">
                <button className="back-button" onClick={onBack}>&larr; Back to Course Editor</button>
                <h1>Quiz Editor</h1>
            </header>

            <div className="editor-form">
                <div className="form-group">
                    <label htmlFor="quizTitle">Quiz Title</label>
                    <input id="quizTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
            </div>

            <section className="questions-editor">
                <h2>Questions</h2>
                {questions.map((q, qIndex) => (
                    <div key={q.id} className="question-editor-item">
                        <div className="question-header">
                            <h3>Question {qIndex + 1}</h3>
                            <button className="btn-danger" onClick={() => handleRemoveQuestion(qIndex)}>Remove</button>
                        </div>
                        <textarea 
                            value={q.question} 
                            onChange={e => handleQuestionChange(qIndex, e.target.value)}
                            placeholder="Enter the question text..."
                            rows={3}
                        />
                        <h4>Options</h4>
                        <div className="options-editor">
                            {q.options.map((opt, oIndex) => (
                                <div key={oIndex} className="option-input">
                                    <input 
                                        type="radio" 
                                        name={`correct-answer-${qIndex}`} 
                                        checked={q.correctAnswer === opt}
                                        onChange={() => handleCorrectAnswerChange(qIndex, opt)}
                                    />
                                    <input 
                                        type="text" 
                                        value={opt}
                                        onChange={e => handleOptionChange(qIndex, oIndex, e.target.value)}
                                        placeholder={`Option ${oIndex + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button className="btn-add-question" onClick={handleAddQuestion}>+ Add Question</button>
            </section>

             <footer className="editor-footer">
                <button className="btn-primary" onClick={handleSave}>Save Quiz</button>
            </footer>
        </div>
    );
};

export default QuizEditor;
