'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: number;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: '您好！我是安迪AI助手，专注于AI赋能办公和企业培训领域，请问有什么可以帮您？',
      type: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      content: trimmed,
      type: 'user',
      timestamp: new Date(),
    };

    const assistantMessageId = Date.now() + 1;
    const assistantPlaceholder: Message = {
      id: assistantMessageId,
      content: '',
      type: 'assistant',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
    setInputMessage('');
    setIsLoading(true);

    // Build history for context (exclude streaming placeholder)
    const history = [...messages, userMessage].map((m) => ({
      role: m.type as 'user' | 'assistant',
      content: m.content,
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        throw new Error('网络请求失败，请稍后重试。');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.content) {
              accumulatedContent += parsed.content;
              const snapshot = accumulatedContent;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId
                    ? { ...m, content: snapshot, isStreaming: true }
                    : m
                )
              );
            }
          } catch {
            // ignore parse errors on incomplete chunks
          }
        }
      }

      // Mark streaming as done
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '发生了未知错误，请重试。';
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? { ...m, content: errorMsg, isStreaming: false }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Markdown renderer for assistant messages
  const MarkdownContent = ({ content }: { content: string }) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-1 last:mb-0 leading-relaxed">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        ul: ({ children }) => <ul className="list-disc list-inside my-1 space-y-0.5">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside my-1 space-y-0.5">{children}</ol>,
        li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
        h1: ({ children }) => <h1 className="text-base font-bold mt-2 mb-1">{children}</h1>,
        h2: ({ children }) => <h2 className="text-sm font-bold mt-2 mb-1">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-semibold mt-1.5 mb-0.5">{children}</h3>,
        code: ({ children, className, ...props }) => (
          <code
            className={`${className ?? ''} bg-orange-50 text-orange-700 px-1 py-0.5 rounded text-xs font-mono`}
            {...props}
          >
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <div className="my-1 bg-gray-900 rounded-lg overflow-x-auto">
            <pre className="p-2 text-green-300 text-xs font-mono whitespace-pre">{children}</pre>
          </div>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-orange-400 pl-2 my-1 text-gray-600 italic">{children}</blockquote>
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-orange-500 underline hover:text-orange-600">
            {children}
          </a>
        ),
        hr: () => <hr className="border-gray-200 my-2" />,
        table: ({ children }) => (
          <div className="overflow-x-auto my-2">
            <table className="text-xs border-collapse w-full">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="border border-gray-300 bg-gray-100 px-2 py-1 font-semibold text-left">{children}</th>,
        td: ({ children }) => <td className="border border-gray-300 px-2 py-1">{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  );

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="打开AI助手"
        className={`w-16 h-16 rounded-full bg-orange-500 text-white shadow-lg flex items-center justify-center text-2xl hover:bg-orange-600 transition-all duration-300 ${
          !isOpen ? 'animate-bounce' : ''
        }`}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'}`}></i>
      </button>

      {/* 聊天面板 */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-100"
          style={{ height: '480px' }}
        >
          {/* 面板头部 */}
          <div className="bg-orange-500 text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <i className="fas fa-robot text-sm"></i>
              <h3 className="font-bold text-sm">安迪AI助手</h3>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              <span className="text-xs opacity-90">在线</span>
            </div>
          </div>

          {/* 聊天记录 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xs mr-2 shrink-0 mt-1">
                    <i className="fas fa-robot"></i>
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed break-words ${
                    message.type === 'user'
                      ? 'bg-orange-500 text-white rounded-tr-sm'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
                  }`}
                >
                  {message.type === 'user' ? (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  ) : message.content ? (
                    <div className="text-sm">
                      <MarkdownContent content={message.content} />
                      {message.isStreaming && (
                        <span className="inline-block w-0.5 h-4 bg-orange-400 ml-0.5 animate-pulse align-middle"></span>
                      )}
                    </div>
                  ) : message.isStreaming ? (
                    <span className="flex items-center gap-1 py-0.5">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  ) : null}
                  <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-orange-100' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入框 */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white shrink-0">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={isLoading ? 'AI正在回复...' : '输入您的问题...'}
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="w-9 h-9 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg flex items-center justify-center transition-colors shrink-0"
              >
                {isLoading ? (
                  <i className="fas fa-circle-notch fa-spin text-sm"></i>
                ) : (
                  <i className="fas fa-paper-plane text-sm"></i>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5 text-center">Powered by 硅基流动 · Qwen3-8B</p>
          </form>
        </div>
      )}
    </div>
  );
}