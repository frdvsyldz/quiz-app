import React, { useState, useEffect } from 'react';
import shuffleArray from '../utils/shuffle'; // shuffle fonksiyonun
import questionsData from '../data/questions'; // sorular
import './Quiz.css'
const Quiz = () => {
  // Soruları rastgele sırala ve state'e ata
  const [questions, setQuestions] = useState(() => shuffleArray(questionsData).slice(0, 5));

  const [current, setCurrent] = useState(0); // aktif soru indeksi
  const [selectedAnswer, setSelectedAnswer] = useState(null); // seçilen cevap
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false); // geri bildirim gösterme durumu
  const [timeLeft, setTimeLeft] = useState(60); // saniye cinsinden timer
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[current];

  // Timer için useEffect
  useEffect(() => {
    if (isFinished) return;

    if (timeLeft === 0) {
      handleNextQuestion(); // süre bittiğinde sonraki soruya geç
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, isFinished]);

  // Cevap seçildiğinde
  const handleAnswer = (option) => {
    if (selectedAnswer) return; // zaten cevaplandıysa engelle

    setSelectedAnswer(option);
    setShowFeedback(true);

    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }

    // 1.5 saniye sonra sonraki soruya geç
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setTimeLeft(60);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuestions(shuffleArray(questionsData));
    setCurrent(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setTimeLeft(60);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h2 className="question-number">Test Tamamlandı!</h2>
          <p className="question-title">
            Toplam doğru cevap sayınız: <span className="score-number">{score} / {questions.length}</span>
          </p>
          <button className="next-button" onClick={restartQuiz}>
            Tekrar Başlat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-progress">
          <span className="question-number">{current + 1}. Soru</span>
          <span className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
            Süre: {timeLeft}s
          </span>
        </div>
        <p className="question-title">{currentQuestion.question}</p>
        <div className="options-container">
          {currentQuestion.options.map((option, idx) => {
            let className = 'option-button';

            if (showFeedback) {
              if (option === currentQuestion.answer) {
                className += ' correct';
              } else if (option === selectedAnswer && option !== currentQuestion.answer) {
                className += ' incorrect';
              } else {
                className += ' neutral';
              }
            }

            return (
              <button
                key={idx}
                className={className}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
