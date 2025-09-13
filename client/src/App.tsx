import { useState } from 'react';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GoalPlannerMain from '@/components/GoalPlannerMain';

function App() {
  const [showGoalPlanner, setShowGoalPlanner] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen relative overflow-hidden">
          {/* Beautiful Purple Moving Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-purple-600 to-indigo-700 animate-gradient-xy"></div>
          
          {/* Additional animated gradient layers for more movement */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 via-purple-500/30 to-blue-600/30 animate-gradient-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-violet-600/20 via-purple-800/20 to-fuchsia-700/20 animate-gradient-fast"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl font-black text-white leading-tight drop-shadow-2xl">
                  Transform Your
                  <span className="text-yellow-300 block">Social Skills</span>
                  with AI Coaching
                </h1>
                
                <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                  Get a personalized action plan based on proven principles from 
                  "How to Win Friends and Influence People" — powered by intelligent AI conversations.
                </p>
                
                <button 
                  onClick={() => setShowGoalPlanner(true)}
                  className="bg-white/90 text-purple-700 text-lg px-8 py-4 rounded-lg font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl backdrop-blur-sm"
                  data-testid="button-start-journey"
                >
                  Start Your Journey
                </button>
              </div>
              
              {/* Features */}
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-300/80 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    🎯
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Personalized Goals</h3>
                  <p className="text-purple-100">AI analyzes your specific challenges and creates SMART goals tailored to your social skills journey.</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-pink-300/80 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    🤖
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Avatar Coaching</h3>
                  <p className="text-purple-100">Choose from three unique AI personalities that match your learning style - visionary, analytical, or resilient.</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-300/80 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    📚
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Carnegie Principles</h3>
                  <p className="text-purple-100">Built on time-tested principles from "How to Win Friends and Influence People" methodology.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Goal Planner Modal */}
          {showGoalPlanner && (
            <GoalPlannerMain onClose={() => setShowGoalPlanner(false)} />
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
