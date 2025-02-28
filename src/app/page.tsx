import Image from "next/image";

import ChatInterface from '@/components/chat/ChatInterface';
import LessonPlans from '@/components/lessons/LessonPlans';
import QuizInterface from '@/components/quizzes/QuizInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          AI Tutor
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <LessonPlans />
            <QuizInterface />
          </div>
          <div className="lg:sticky lg:top-8 h-fit">
            <ChatInterface />
          </div>
        </div>
      </div>
    </main>
  );
}
