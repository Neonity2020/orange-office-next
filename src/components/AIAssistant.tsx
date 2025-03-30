'use client';

import { useState } from 'react';

interface Message {
  id: number;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: '您好！我是安迪AI助手，请问有什么可以帮您？',
      type: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      type: 'user',
      timestamp: new Date(),
    };

    // 模拟AI回复
    const assistantMessage: Message = {
      id: messages.length + 2,
      content: '感谢您的咨询！我会尽快为您解答。',
      type: 'assistant',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInputMessage('');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center text-2xl hover:bg-orange-600 transition-all duration-300 animate-bounce"
      >
        <i className="fas fa-robot"></i>
      </button>

      {/* 聊天面板 */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-xl shadow-xl overflow-hidden">
          {/* 面板头部 */}
          <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">安迪AI助手</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* 聊天记录 */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 输入框 */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="输入您的问题..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 