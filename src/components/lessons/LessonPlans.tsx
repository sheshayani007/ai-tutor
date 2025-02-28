import { useState } from 'react';
import { BookOpenIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
}

const sampleLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming concepts and logic.',
    duration: '45 minutes',
    topics: ['Variables', 'Data Types', 'Control Flow', 'Basic Operators']
  },
  {
    id: '2',
    title: 'Web Development Fundamentals',
    description: 'Understanding HTML, CSS, and JavaScript basics.',
    duration: '60 minutes',
    topics: ['HTML Structure', 'CSS Styling', 'JavaScript Basics', 'DOM Manipulation']
  },
  {
    id: '3',
    title: 'Object-Oriented Programming',
    description: 'Master the concepts of OOP and its principles.',
    duration: '75 minutes',
    topics: ['Classes', 'Objects', 'Inheritance', 'Encapsulation']
  }
];

export default function LessonPlans() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsStarted(true);
  };

  const handleBackToLessons = () => {
    setSelectedLesson(null);
    setIsStarted(false);
  };

  if (isStarted && selectedLesson) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={handleBackToLessons}
          className="mb-4 text-blue-500 hover:text-blue-600 flex items-center"
        >
          <ChevronRightIcon className="h-5 w-5 transform rotate-180 mr-1" />
          Back to Lessons
        </button>
        <h2 className="text-2xl font-semibold mb-4">{selectedLesson.title}</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Lesson Overview</h3>
            <p className="text-gray-600">{selectedLesson.description}</p>
            <p className="text-sm text-gray-500 mt-2">Duration: {selectedLesson.duration}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Topics Covered</h3>
            <ul className="space-y-2">
              {selectedLesson.topics.map((topic, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-2" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <BookOpenIcon className="h-6 w-6 mr-2 text-blue-500" />
        Lesson Plans
      </h2>
      <div className="grid gap-4">
        {sampleLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
            onClick={() => handleStartLesson(lesson)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg text-gray-900">{lesson.title}</h3>
                <p className="text-gray-600 mt-1">{lesson.description}</p>
                <p className="text-sm text-gray-500 mt-2">Duration: {lesson.duration}</p>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}