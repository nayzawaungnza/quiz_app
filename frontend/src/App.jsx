import { useEffect, useState } from 'react';
import favLogo from '/quiz_app.png';
import './App.css';
import useFetch from './hook/useFetch';

function App() {
  const { quiz, loading } = useFetch();
  const [active, setActive] = useState(0);
  const [activeAnswer, setActiveAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (answer) => {
    setActiveAnswer(answer);
    if (answer.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    if (active < quiz.length - 1) {
      setActive((prevActive) => prevActive + 1);
      setActiveAnswer(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setActive(0);
    setActiveAnswer(false);
    setScore(0);
    setIsFinished(false);
  };

  const percentage = quiz.length > 0 ? ((score / quiz.length) * 100).toFixed(2) : 0;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3">
            <div className="card p-2 bg-dark">
              <div className="card-header bg-transparent">
                <img src={favLogo} width={40} className="App-logo" alt="logo" />
              </div>
              <div className="card-body min-h-200">
                {loading && (
                  <div className="spinner-border text-success text-center" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}

                {!loading && quiz.length > 0 && !isFinished && (
                  <>
                    <span className="float-right top-10 badge badge-success btn-sm">
                      {active + 1}/{quiz.length}
                    </span>

                    <h4 className="card-title mb-1 text-white text-left">{quiz[active].question}</h4>

                    {quiz[active].answers.length > 0 && (
                      <ul className="list-group mt-2">
                        {quiz[active].answers.map((answer, index) => (
                          <li
                            key={index}
                            onClick={() => handleAnswer(answer)}
                            className={`list-group-item p-2 text-left mt-1 
                              ${activeAnswer !== false && 'disabled'} 
                              ${activeAnswer !== false && activeAnswer._id === answer._id
                                ? activeAnswer.isCorrect
                                  ? 'bg-success border-success text-white'
                                  : 'bg-danger border-danger text-white'
                                : ''
                              }`}
                          >
                            <span className="btn btn-sm btn-dark">{index + 1}</span>
                            <span className="">{answer.answer}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="d-flex justify-content-between align-items-center mt-5">
                      <button
                        className={`btn btn-success btn-md ${activeAnswer ? '' : 'disabled'}`}
                        onClick={nextQuestion}
                        disabled={!activeAnswer}
                      >
                        {active < quiz.length - 1 ? 'Next' : 'Finish'}
                      </button>

                      {activeAnswer && (
                        <span className={activeAnswer.isCorrect ? 'text-success' : 'text-danger'}>
                          {activeAnswer.isCorrect ? 'Correct Answer' : 'Wrong Answer'}
                        </span>
                      )}
                    </div>
                  </>
                )}

                {!loading && quiz.length > 0 && isFinished && (
                  <div className="text-center">
                    <h2 className="text-white">Quiz Completed! 🎉</h2>
                    <p className="text-success font-weight-bold">
                      Score: {score} / {quiz.length} 
                    </p>
                    <p className={`${percentage < 50 ? 'text-danger' : percentage < 80 ? 'text-warning' : 'text-success'}`}>Percentage: {percentage}%</p>
                    <button className="btn btn-info btn-md mt-3" onClick={restartQuiz}>
                      Restart Quiz
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
