import ConversationFlow from '../ConversationFlow';
import { useState } from 'react';
import type { Message } from '@shared/schema';

// todo: remove mock functionality
const mockMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm Skyler, your visionary guide. I'll help you transform your social skills goals into a clear, actionable plan. Let's start by understanding what you want to achieve. What specific social skill would you like to improve?",
    timestamp: new Date(Date.now() - 300000)
  },
  {
    id: '2', 
    role: 'user',
    content: "I want to become more confident when networking at professional events. I always feel awkward and don't know how to start conversations.",
    timestamp: new Date(Date.now() - 240000)
  },
  {
    id: '3',
    role: 'assistant', 
    content: "That's a fantastic goal! Networking confidence is a skill that opens so many doors. Let me understand your current situation better. When you're at these events, what specifically makes you feel most awkward? Is it the initial approach, maintaining conversation, or something else?",
    timestamp: new Date(Date.now() - 180000)
  }
];

const mockSuggestedResponses = [
  "Starting conversations with strangers",
  "Knowing what to say after 'hello'", 
  "Following up after meeting someone",
  "Feeling like I belong in the room"
];

export default function ConversationFlowExample() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = (content: string) => {
    console.log('Sending message:', content);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand. Let me ask you this - when you think about your ideal networking interaction, what would that look like? This will help me create a personalized plan for you.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <div className="h-[600px]">
      <ConversationFlow 
        avatar="Skyler"
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        suggestedResponses={mockSuggestedResponses}
        currentStep="Understanding your networking goals"
        progress={35}
      />
    </div>
  );
}