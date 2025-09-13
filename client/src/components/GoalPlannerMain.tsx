import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import BookAnimation from './BookAnimation';
import AvatarSelection from './AvatarSelection';
import ConversationFlow from './ConversationFlow';
import PlanPreview from './PlanPreview';
import PlanDisplay from './PlanDisplay';
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
  const [generatedPlan, setGeneratedPlan] = useState<Plan | null>(null);
  
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
  
  // Chat API conversation mutation
  const conversationMutation = useMutation({
    mutationFn: async ({ messages, avatar }: { messages: Message[], avatar: Avatar }) => {
      // Extract the latest user message
      const userMessages = messages.filter(m => m.role === 'user');
      const latestUserMessage = userMessages[userMessages.length - 1];
      const messageContent = latestUserMessage?.content || '';
      
      // Extract goal from the first user message or use a default
      const firstUserMessage = userMessages[0];
      const goalName = firstUserMessage?.content || 'social skills improvement';
      
      const response = await fetch('https://one23-u2ck.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: 'anonymous_user', // You can replace this with actual user ID if available
          message: messageContent,
          goal_name: goalName
        })
      });
      return await response.json();
    },
    onSuccess: (response) => {
      console.log('API Response:', response); // Debug log
      
      // Handle the new API response format - returns { "reply": "..." }
      let messageContent = '';
      let shouldGeneratePlan = false;
      
      if (response?.reply) {
        messageContent = response.reply;
        // Check if this looks like we have enough info to generate a plan
        shouldGeneratePlan = messages.length >= 6; // After several exchanges, suggest plan generation
      } else if (response?.error) {
        messageContent = "I had trouble processing that. Could you tell me more about your goals?";
      } else {
        messageContent = "I understand. Could you tell me more about what you'd like to achieve?";
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: messageContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      
      if (shouldGeneratePlan) {
        // Start plan generation
        setTimeout(() => {
          setCurrentStep('plan');
          setIsGeneratingPlan(true);
          planMutation.mutate();
        }, 2000);
      }
    },
    onError: (error) => {
      console.error('External API error:', error);
      setIsLoading(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting to my AI brain right now. Let me try a different approach - what specific social skill challenge would you like to work on?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  // External API plan generation mutation
  const planMutation = useMutation({
    mutationFn: async () => {
      // Extract user answers from the conversation messages
      const userAnswers = messages
        .filter(m => m.role === 'user')
        .map(m => m.content);
      
      // Get the goal name from the first user message or use a default
      const goalName = userAnswers[0] || 'social skills improvement';
      
      const response = await fetch('https://one23-u2ck.onrender.com/final-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          goal_name: goalName,
          user_answers: userAnswers,
          avatar: selectedAvatar
        })
      });
      return await response.json();
    },
    onSuccess: async (response) => {
      console.log('Plan API Response:', response); // Debug log
      
      // Handle the API response format
      let plan = null;
      if (response?.success && response?.plan) {
        plan = response.plan;
      } else if (response?.plan) {
        plan = response.plan;
      }
      
      if (plan) {
        // Save plan to Firestore under plans/{user.uid}/plan
        try {
          const userId = 'user123'; // Replace with actual user ID from auth
          const response = await fetch('https://one23-u2ck.onrender.com/api/save-plan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
              plan: plan,
              avatar: selectedAvatar,
              timestamp: new Date().toISOString()
            })
          });
          
          if (response.ok) {
            console.log('Plan saved to Firestore successfully');
          }
        } catch (error) {
          console.error('Error saving plan to Firestore:', error);
        }
        
        setGeneratedPlan(plan);
      } else {
        console.log('Using fallback mock plan');
        // Use mock plan as fallback
      }
      setIsGeneratingPlan(false);
    },
    onError: (error) => {
      console.error('Plan generation error:', error);
      setIsGeneratingPlan(false);
      // Keep the mock plan as fallback
    }
  });

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
    
    // Call real GROQ API
    conversationMutation.mutate({
      messages: [...messages, userMessage],
      avatar: selectedAvatar
    });
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
    // if (onClose) {
    //   setTimeout(onClose, 2000);
    // }
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
              plan={generatedPlan || mockPlan}
              onEditPlan={handleEditPlan}
              onAcceptPlan={handleAcceptPlan}
              isGenerating={isGeneratingPlan}
            />
          )}
          
          {/* Completion - Show Plan Display */}
          {currentStep === 'complete' && (
            <div className="min-h-[600px]">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Your Journey Begins Now!
                </h2>
                <p className="text-muted-foreground">
                  Your personalized 5-day social skills plan is ready
                </p>
              </div>
              
              <PlanDisplay userId="user123" /> {/* Replace with actual user ID */}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}