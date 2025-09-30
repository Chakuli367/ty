import { useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GoalPlannerMain from "@/components/GoalPlannerMain";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [showGoalPlanner, setShowGoalPlanner] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showGoalPlanner ? (
          // Fullscreen Goal Planner (no modal/overlay)
          <div className="w-full h-full min-h-screen bg-black/5">
            <GoalPlannerMain
              onClose={() => setShowGoalPlanner(false)}
              className="w-full h-full"
            />
          </div>
        ) : (
          // Landing Page
          <div
            className="min-h-screen relative overflow-hidden"
            style={{
              minHeight: "100vh",
              width: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Gradient Background */}
            <div
              className="fixed inset-0 bg-gradient-to-br from-indigo-800 via-purple-600 to-blue-700 animate-gradient-shift bg-[length:400%_400%]"
              style={{ zIndex: 0 }}
            />

            {/* Floating Glowing Shapes */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-20 left-20 w-32 h-32 bg-indigo-500/30 rounded-full blur-3xl"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-40 right-32 w-24 h-24 bg-purple-500/30 rounded-full blur-3xl"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
              <motion.div
                className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-28 h-28 bg-violet-500/30 rounded-full blur-3xl"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </div>

            {/* Main Landing Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-8">
              <div className="space-y-6 max-w-3xl mx-auto">
                <h1 className="text-6xl font-black text-white leading-tight drop-shadow-2xl">
                  Transform Your
                  <span className="text-yellow-300 block">Social Skills</span>
                  with AI Coaching
                </h1>
                <p className="text-xl text-purple-100 leading-relaxed drop-shadow-lg">
                  Get a personalized action plan based on proven principles from
                  "How to Win Friends and Influence People" — powered by
                  intelligent AI conversations.
                </p>
                <button
                  onClick={() => setShowGoalPlanner(true)}
                  className="relative z-20 px-10 py-5 font-bold text-lg text-white rounded-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 
                           shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:scale-105 transition-transform duration-300 
                           after:absolute after:inset-0 after:rounded-xl after:blur-xl after:bg-gradient-to-r after:from-yellow-400 after:via-pink-500 after:to-purple-600 after:opacity-50 after:animate-pulse"
                >
                  Start Your Journey
                </button>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-yellow-300/80 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      🎯
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Personalized Goals
                    </h3>
                    <p className="text-purple-100">
                      AI analyzes your specific challenges and creates SMART
                      goals tailored to your social skills journey.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-pink-300/80 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      🤖
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Avatar Coaching
                    </h3>
                    <p className="text-purple-100">
                      Choose from three unique AI personalities that match your
                      learning style - visionary, analytical, or resilient.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-300/80 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      📚
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Carnegie Principles
                    </h3>
                    <p className="text-purple-100">
                      Built on time-tested principles from "How to Win Friends
                      and Influence People" methodology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Toaster />
          </div>
        )}

        {/* Tailwind Gradient Animation */}
        <style jsx global>{`
          @keyframes gradient-shift {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient-shift {
            animation: gradient-shift 6s ease-in-out infinite;
            background-size: 400% 400%;
          }
        `}</style>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
