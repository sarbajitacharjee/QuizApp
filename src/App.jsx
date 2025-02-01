import { useState, useEffect } from 'react';

const QuizApp = () => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    useEffect(() => {
      fetch('/api/quiz')  // Now calling the Vercel API route
          .then(response => response.json())
          .then(data => setQuizData(data.questions))
          .catch(error => console.error('Error fetching quiz data:', error));
  }, []);
  

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setIsQuizCompleted(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
            {!isQuizCompleted ? (
                quizData.length > 0 ? (
                    <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-md text-center">
                        <h2 className="text-2xl font-semibold mb-4">{quizData[currentQuestion].question}</h2>
                        <div className="grid gap-3">
                            {quizData[currentQuestion].options.map((option, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => handleAnswer(option.isCorrect)}
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-all"
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Loading quiz...</p>
                )
            ) : (
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Quiz Completed!</h2>
                    <p className="text-lg">Your Score: {score} / {quizData.length}</p>
                </div>
            )}
        </div>
    );
};

export default QuizApp;