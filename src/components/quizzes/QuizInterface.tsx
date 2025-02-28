import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

const sampleQuiz: Quiz = {
  id: '1',
  title: 'Programming Basics Quiz',
  description: 'Test your knowledge of basic programming concepts',
  questions: [
    {
      id: '1',
      question: 'What is a variable?',
      options: [
        'A container for storing data values',
        'A mathematical equation',
        'A programming language',
        'A type of function'
      ],
      correctAnswer: 'A container for storing data values'
    },
    {
      id: '2',
      question: 'Which of the following is a loop structure?',
      options: [
        'if-else',
        'switch',
        'for',
        'try-catch'
      ],
      correctAnswer: 'for'
    }
  ]
};

export default function QuizInterface() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = sampleQuiz.questions[currentQuestionIndex];
  const isQuizComplete = currentQuestionIndex >= sampleQuiz.questions.length;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (isQuizComplete) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Quiz Complete!</h2>
        <p className="text-lg mb-4">
          Your score: {score} out of {sampleQuiz.questions.length}
        </p>
        <button
          onClick={handleRestartQuiz}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-2">{sampleQuiz.title}</h2>
      <p className="text-gray-600 mb-6">{sampleQuiz.description}</p>

      <div className="mb-6">
        <p className="text-lg font-medium mb-4">
          Question {currentQuestionIndex + 1} of {sampleQuiz.questions.length}
        </p>
        <p className="text-gray-800 mb-4">{currentQuestion.question}</p>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => !showResult && handleAnswerSelect(option)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg transition-colors ${showResult ? 'cursor-default' : 'hover:bg-gray-50'} ${selectedAnswer === option ? (option === currentQuestion.correctAnswer ? 'bg-green-100' : 'bg-red-100') : 'bg-white border border-gray-200'}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && option === selectedAnswer && (
                  option === currentQuestion.correctAnswer ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                  )
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}