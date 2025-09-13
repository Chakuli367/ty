import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import BookAnimation from './BookAnimation';
import AvatarSelection from './AvatarSelection';
import ConversationFlow from './ConversationFlow';
import PlanPreview from './PlanPreview';
import type { Avatar, Message, Plan } from '@shared/schema';

type FlowStep = 'intro' | 'avatar' | 'conversation' | 'plan' | 'complete';

interface GoalPlannerMainProps {
  onClose?: () => void;
}

// todo: remove mock functionality
const mockPlan: Plan = {
  id: '1',
  title: 'Master Networking Confidence',
  description: 'A personalized plan based on your conversation with Skyler to build genuine networking skills through practical, proven techniques.',
  totalDuration: 42,
  feasibilityScore: 88,
  steps: [
    {
      id: '1',
      title: 'Foundation: Understanding Your Communication Style',
      description: 'Discover your natural communication strengths and identify areas for growth. Learn to read social cues and practice active listening in everyday interactions.',
      estimatedDays: 7,
      difficulty: 'easy',
      completed: false
    },
    {
      id: '2',
      title: 'Conversation Starters & Icebreakers',
      description: 'Master 5 natural conversation starters specifically for professional events. Practice in low-pressure environments like coffee shops.',
      estimatedDays: 10,
      difficulty: 'easy',
      completed: false
    },
    {
      id: '3',
      title: 'Building Rapport Through Authentic Interest',
      description: 'Learn Carnegie\'s principles for showing genuine interest in others. Practice asking thoughtful follow-up questions and finding common ground.',
      estimatedDays: 10,
      difficulty: 'medium',
      completed: false
    },
    {
      id: '4',
      title: 'Professional Event Navigation',
      description: 'Attend 2-3 networking events with specific goals. Practice working the room effectively and positioning yourself as a valuable connection.',
      estimatedDays: 10,
      difficulty: 'medium',
      completed: false
    },
    {
      id: '5',
      title: 'Follow-up & Relationship Building',
      description: 'Master the follow-up process that most people skip. Create a system for maintaining professional relationships and adding value to your network.',
      estimatedDays: 5,
      difficulty: 'hard',
      completed: false
    }
  ]
};

export default function GoalPlannerMain({ onClose }: GoalPlannerMainProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('intro');
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTrailerText, setShowTrailerText] = useState(true);
  const [trailerText, setTrailerText] = useState('');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  
  const fullTrailerText = "TRANSFORM YOUR SOCIAL SKILLS WITH AI COACHING";
  
  // Typing animation for trailer text
  useEffect(() => {
    if (currentStep === 'intro' && showTrailerText) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullTrailerText.length) {
          setTrailerText(fullTrailerText.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          // Hide trailer text after 3 seconds
          setTimeout(() => {
            setShowTrailerText(false);
          }, 3000);
        }
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [currentStep, showTrailerText]);
  
  // Initialize conversation when avatar is selected
  useEffect(() => {
    if (currentStep === 'conversation' && selectedAvatar && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        role: 'assistant',
        content: getWelcomeMessage(selectedAvatar),
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [currentStep, selectedAvatar, messages.length]);
  
  const getWelcomeMessage = (avatar: Avatar): string => {
    const messages = {
      Skyler: "Hi! I'm Skyler, your visionary guide. I see the big picture and I'm here to help you transform your social skills goals into a clear, inspiring plan. Let's start by understanding your vision - what specific social skill would you like to master?",
      Raven: "Hello! I'm Raven, your analytical companion. I believe in understanding the 'why' behind every goal before creating the 'how'. Let's dive deep into your social skills aspirations. What specific challenge are you facing that brought you here today?",
      Phoenix: "Hey there! I'm Phoenix, your resilient coach. I've learned that every setback is a setup for a comeback. I'm here to help you rise to your social skills potential. What's the social challenge you're ready to transform?"
    };
    return messages[avatar];
  };
  
  const getCurrentProgress = (): number => {
    switch (currentStep) {
      case 'intro': return 0;
      case 'avatar': return 20;
      case 'conversation': return 40 + (messages.length * 5); // Dynamic based on conversation depth
      case 'plan': return 80;
      case 'complete': return 100;
      default: return 0;
    }
  };
  
  const getCurrentStepDescription = (): string => {
    switch (currentStep) {
      case 'intro': return 'Welcome to your social skills journey';
      case 'avatar': return 'Choosing your personal guide';
      case 'conversation': return 'Understanding your goals and creating your plan';
      case 'plan': return 'Reviewing your personalized action plan';
      case 'complete': return 'Ready to start your transformation';
      default: return 'Getting started';
    }
  };
  
  const handleAvatarNext = () => {
    setCurrentStep('conversation');
  };
  
  const handleSendMessage = (content: string) => {
    if (!selectedAvatar) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const responses = getAIResponse(content, selectedAvatar, messages.length);
      
      if (responses.generatePlan) {
        // Transition to plan generation
        const finalMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responses.message,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, finalMessage]);
        setIsLoading(false);
        
        // Start plan generation
        setTimeout(() => {
          setCurrentStep('plan');
          setIsGeneratingPlan(true);
          
          // Simulate plan generation
          setTimeout(() => {
            setIsGeneratingPlan(false);
          }, 3000);
        }, 2000);
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responses.message,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }
    }, 1500);
  };
  
  const getAIResponse = (userMessage: string, avatar: Avatar, messageCount: number) => {
    // Simulate intelligent conversation flow
    if (messageCount >= 6) {
      return {
        message: "Perfect! I have everything I need to create your personalized social skills plan. Based on our conversation, I'll craft a step-by-step journey that's tailored specifically to your goals and current situation. Let me generate that for you now...",
        generatePlan: true
      };
    }
    
    const responses = {
      Skyler: [
        "I love your vision! Let me understand the bigger picture. When you imagine yourself successfully networking, what does that ideal scenario look like? Paint me a picture of your future confident self.",
        "That's a powerful goal! Now, let's think about your timeline. How important is this transformation to you, and what's driving this desire for change right now?",
        "Excellent insights! One more thing - what resources do you have available? Time per week, upcoming events, or support systems that could help accelerate your progress?"
      ],
      Raven: [
        "Fascinating. Let me analyze this deeper. What specific situations trigger these feelings of awkwardness? Is it the initial approach, maintaining conversation, or something else entirely?",
        "I see patterns emerging. Now, let's examine your current skill level. On a scale of 1-10, how would you rate your confidence in different social scenarios?",
        "Intriguing data points. What learning style works best for you? Do you prefer structured practice, observational learning, or perhaps guided reflection?"
      ],
      Phoenix: [
        "I hear your determination! Every master networker started exactly where you are. What past social victories can we build upon? Even small wins count.",
        "That resilience mindset is your superpower! What obstacles have you already overcome in other areas of life? We can apply those same strengths here.",
        "You're already transforming by being here! What kind of accountability and support would help you stay committed to this journey?"
      ]
    };
    
    const avatarResponses = responses[avatar];
    const responseIndex = Math.min(messageCount - 2, avatarResponses.length - 1);
    
    return {
      message: avatarResponses[Math.max(0, responseIndex)],
      generatePlan: false
    };
  };
  
  const getSuggestedResponses = (): string[] => {
    const responses = {
      Skyler: [
        "Leading confident conversations",
        "Building my professional network",
        "Speaking up in group settings",
        "Making lasting first impressions"
      ],
      Raven: [
        "The initial approach feels hardest",
        "Keeping conversations flowing naturally", 
        "Reading social cues accurately",
        "Managing networking anxiety"
      ],
      Phoenix: [
        "I've overcome shyness before",
        "Small talk feels unnatural to me",
        "I want to add genuine value",
        "Building confidence step by step"
      ]
    };
    
    return selectedAvatar ? responses[selectedAvatar] : [];
  };
  
  const handleEditPlan = () => {
    // Return to conversation to refine
    setCurrentStep('conversation');
    const refinementMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: "Great choice! Let's refine your plan. What would you like to adjust? Perhaps the timeline, difficulty level, or specific focus areas?",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, refinementMessage]);
  };
  
  const handleAcceptPlan = () => {
    console.log('Plan accepted! Redirecting to main application...');
    setCurrentStep('complete');
    // Here you would typically save to Firestore and redirect
    if (onClose) {
      setTimeout(onClose, 2000);
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      data-testid="goal-planner-overlay"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        {/* Floating orbs animation */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Main Container */}
      <Card className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden">
        {/* Close Button */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 hover-elevate"
            data-testid="button-close"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        
        {/* Content */}
        <div className="p-8 overflow-auto max-h-[95vh]">
          {/* Intro with Book & Trailer */}
          {currentStep === 'intro' && (
            <div className="text-center space-y-8 min-h-[600px] flex flex-col justify-center">
              {showTrailerText ? (
                <div className="space-y-8">
                  <h1 
                    className="text-5xl font-black text-foreground tracking-wider leading-tight"
                    style={{
                      textShadow: '0 0 30px rgba(var(--primary), 0.5)'
                    }}
                    data-testid="trailer-text"
                  >
                    {trailerText}
                    <span className="animate-pulse">|</span>
                  </h1>
                </div>
              ) : (
                <div className="space-y-12 animate-in fade-in duration-1000">
                  <BookAnimation />
                  
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-foreground">
                      Ready to Transform Your Social Skills?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      Using proven principles from "How to Win Friends and Influence People", 
                      our AI will create a personalized plan to help you achieve your social goals.
                    </p>
                    
                    <Button 
                      size="lg" 
                      onClick={() => setCurrentStep('avatar')}
                      className="text-lg px-8 py-6 font-semibold"
                      data-testid="button-get-started"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Avatar Selection */}
          {currentStep === 'avatar' && (
            <AvatarSelection 
              selectedAvatar={selectedAvatar}
              onAvatarSelect={setSelectedAvatar}
              onNext={handleAvatarNext}
            />
          )}
          
          {/* Conversation Flow */}
          {currentStep === 'conversation' && selectedAvatar && (
            <div className="min-h-[700px]">
              <ConversationFlow 
                avatar={selectedAvatar}
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                suggestedResponses={messages.length <= 2 ? getSuggestedResponses() : []}
                currentStep={getCurrentStepDescription()}
                progress={getCurrentProgress()}
              />
            </div>
          )}
          
          {/* Plan Preview */}
          {currentStep === 'plan' && (
            <PlanPreview 
              plan={mockPlan}
              onEditPlan={handleEditPlan}
              onAcceptPlan={handleAcceptPlan}
              isGenerating={isGeneratingPlan}
            />
          )}
          
          {/* Completion */}
          {currentStep === 'complete' && (
            <div className="text-center space-y-8 min-h-[400px] flex flex-col justify-center">
              <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl">✓</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Your Journey Begins Now!
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Your personalized social skills plan has been saved. You'll be redirected to start your transformation.
                </p>
              </div>
              
              <div className="flex space-x-1 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}