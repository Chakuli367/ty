import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Sparkles, Clock, Target } from 'lucide-react';
import type { Avatar, Message } from '@shared/schema';

interface ConversationFlowProps {
  avatar: Avatar;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  suggestedResponses?: string[];
  currentStep: string;
  progress: number;
}

const avatarStyles = {
  Skyler: {
    gradient: 'from-blue-400 to-blue-600',
    bgClass: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
    borderClass: 'border-blue-200 dark:border-blue-800'
  },
  Raven: {
    gradient: 'from-purple-400 to-purple-600', 
    bgClass: 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900',
    borderClass: 'border-purple-200 dark:border-purple-800'
  },
  Phoenix: {
    gradient: 'from-orange-400 to-red-600',
    bgClass: 'bg-gradient-to-r from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900',
    borderClass: 'border-orange-200 dark:border-red-800'
  }
};

export default function ConversationFlow({ 
  avatar, 
  messages, 
  onSendMessage, 
  isLoading,
  suggestedResponses = [],
  currentStep,
  progress
}: ConversationFlowProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const style = avatarStyles[avatar];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedResponse = (response: string) => {
    onSendMessage(response);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto" data-testid="conversation-flow">
      {/* Progress Header */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${style.gradient} flex items-center justify-center`}>
              <span className="text-white text-lg font-bold">
                {avatar.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {avatar} is guiding you
              </h3>
              <p className="text-sm text-muted-foreground">{currentStep}</p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${style.gradient} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 min-h-0 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
              data-testid={`message-${message.role}`}
            >
              {message.role === 'assistant' && (
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${style.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <Card
                className={`
                  max-w-[80%] p-4 
                  ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : `${style.bgClass} ${style.borderClass}`
                  }
                `}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <div className="flex items-center gap-1 mt-2 opacity-70">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </Card>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${style.gradient} flex items-center justify-center`}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <Card className={`p-4 ${style.bgClass} ${style.borderClass}`}>
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">{avatar} is thinking...</span>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Suggested Responses */}
      {suggestedResponses.length > 0 && (
        <div className="py-4 space-y-2">
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Quick responses:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedResponses.map((response, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestedResponse(response)}
                disabled={isLoading}
                className="text-xs hover-elevate"
                data-testid={`suggested-response-${index}`}
              >
                {response}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="pt-4 space-y-3">
        <div className="flex gap-3">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Share your thoughts with ${avatar}...`}
            disabled={isLoading}
            className="flex-1 min-h-[80px] resize-none"
            data-testid="input-message"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            size="lg"
            className="px-8"
            data-testid="button-send-message"
          >
            Send
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}