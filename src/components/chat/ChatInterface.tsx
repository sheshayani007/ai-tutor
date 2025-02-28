"use client";

import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createMessage = (text: string, sender: Message['sender']): Message => ({
    id: Date.now().toString(),
    text,
    sender,
    timestamp: new Date(),
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, createMessage(inputMessage, 'user')]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: inputMessage }],
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, createMessage(data.choices[0].message.content, 'ai')]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        createMessage('Sorry, I encountered an error. Please try again.', 'ai'),
      ]);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <PaperAirplaneIcon className="h-6 w-6 mr-2 text-blue-500 transform rotate-90" />
        Chat with AI Tutor
      </h2>
      <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
        {messages.map(({ id, text, sender, timestamp }) => (
          <div
            key={id}
            className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              <p className="whitespace-pre-wrap">{text}</p>
              <p className="text-xs mt-1 opacity-70">{timestamp.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}