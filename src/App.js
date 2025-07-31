import React, { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="App">
      {!quizStarted ? (
        <Home onStart={() => setQuizStarted(true)} />
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
