
import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import './Quiz.css';

const questionsData = [
  {
    question: "Hangi vitamin D vitamini olarak bilinir?",
    options: ["A Vitamini", "B Vitamini", "C Vitamini", "Güneş Vitamini"],
    answer: "Güneş Vitamini"
  },
  {
    question: "Bir günde kaç bardak su içmek önerilir?",
    options: ["4-6 bardak", "8-10 bardak", "12-14 bardak", "2-4 bardak"],
    answer: "8-10 bardak"
  },
  {
    question: "Protein açısından en zengin besin hangisidir?",
    options: ["Tavuk eti", "Balık", "Yumurta", "Mercimek"],
    answer: "Yumurta"
  }
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray(questionsData));
  }, []);

  useEffect(() => {
    if (questions.length === 0 || quizFinished) return;

    setTimeLeft(60);
    setSelectedOption(null);
    setShowFeedback(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQIndex, questions, quizFinished]);

  const handleOptionClick = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
    if (option === questions[currentQIndex].answer) setScore((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffleArray(questionsData));
    setCurrentQIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
    setShowFeedback(false);
    setTimeLeft(30);
  };

  if (questions.length === 0) return <div className="loader">Yükleniyor...</div>;

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-container">
        <div className="result-box">
          <div className="icon"><Trophy /></div>
          <h2>Quiz Tamamlandı!</h2>
          <p className="score">{score} / {questions.length}</p>
          <p className="percentage">%{percentage} başarı oranı</p>
          <div className="progress-bar"><div style={{ width: `${percentage}%` }}></div></div>
          <p className="feedback">{percentage >= 80 ? "Mükemmel!" : percentage >= 60 ? "İyi iş!" : "Tekrar dene!"}</p>
          <button onClick={handleRestart}><RotateCcw /> Tekrar Başlat</button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];
  const progress = ((currentQIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        <div className="quiz-header">
          <div>Soru {currentQIndex + 1} / {questions.length}</div>
          <div className={`timer ${timeLeft <= 10 ? 'urgent' : ''}`}><Clock /> {timeLeft}s</div>
          <div className="progress-bar"><div style={{ width: `${progress}%` }}></div></div>
          <h3>{currentQuestion.question}</h3>
        </div>
        <div className="options">
          {currentQuestion.options.map((option) => {
            let className = "option";
            if (showFeedback) {
              if (option === currentQuestion.answer) className += " correct";
              else if (option === selectedOption) className += " incorrect";
              else className += " neutral";
            }
            return (
              <button key={option} className={className} onClick={() => handleOptionClick(option)} disabled={showFeedback}>
                <span>{option}</span>
                {showFeedback && option === currentQuestion.answer && <CheckCircle />}
                {showFeedback && option === selectedOption && option !== currentQuestion.answer && <XCircle />}
              </button>
            );
          })}
        </div>
        {showFeedback && (
          <div className="next-button">
            <button onClick={handleNextQuestion}>
              {currentQIndex + 1 === questions.length ? "Sonuçları Gör" : "Sonraki Soru"}
            </button>
          </div>
        )}
        <div className="score-display">Doğru Cevaplar: {score}</div>
      </div>
    </div>
  );
};

export default QuizApp;