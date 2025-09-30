import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Users, BookOpen, ArrowRight } from "lucide-react";
import GoalPlannerMain from "@/components/GoalPlannerMain";

export default function Home() {
  const [showPlanner, setShowPlanner] = useState(false);

  // --- Typewriter effect for AI card ---
  const [displayedText, setDisplayedText] = useState("");
  const [fullText] = useState(
    "This is the AI’s response loading with a smooth typewriter effect. The container size remains consistent, and only expands if text requires more space.",
  );

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="relative max-w-4xl mx-auto space-y-8">
          <Badge className="mb-4 bg-accent/20 text-accent-foreground border border-accent/30 rounded-xl px-3 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Social Skills Coaching
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
            Transform Your
            <span className="text-primary block">Social hfhSkills</span>
            with AI Coaching
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get a personalized action plan based on proven principles from
            <span className="font-semibold">
              {" "}
              "How to Win Friends and Influence People"
            </span>{" "}
            — powered by intelligent AI conversations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => setShowPlanner(true)}
              className="text-lg px-8 py-6 font-semibold rounded-2xl shadow-xl"
              data-testid="button-start-journey"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-2xl border-card-border text-foreground"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Our AI Approach Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Traditional courses tell you what to do. We create a personalized
              plan based on your specific goals and current situation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all duration-300 rounded-2xl">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">
                  Personalized Goal Setting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI analyzes your specific challenges and creates SMART
                  goals tailored to your social skills journey. No generic
                  advice.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300 rounded-2xl">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">
                  Avatar-Guided Coaching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Choose from three unique AI personalities that match your
                  learning style — visionary, analytical, or resilient
                  approaches.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300 rounded-2xl">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">
                  Carnegie Principles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Every plan is built on time-tested principles from the classic
                  "How to Win Friends and Influence People" methodology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Response Card Section */}
      <section className="py-20 px-4 flex justify-center">
        <div className="ai-card">
          <p>{displayedText}</p>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-foreground">
            Ready to 10x Your Social Confidence?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands who have transformed their social skills with our
            AI-powered approach.
          </p>

          <Button
            size="lg"
            onClick={() => setShowPlanner(true)}
            className="text-lg px-12 py-6 font-semibold rounded-2xl shadow-xl"
            data-testid="button-get-started-cta"
          >
            Get Started Free
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Goal Planner Overlay */}
      {showPlanner && <GoalPlannerMain onClose={() => setShowPlanner(false)} />}

      {/* INLINE STYLES */}
      <style jsx>{`
        .ai-card {
          width: 60vw;
          min-height: 40vh;
          color: #000;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
          position: relative;
          z-index: 0;
        }

        .ai-card p {
          font-size: 1.2rem;
          line-height: 1.6;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        @media (max-width: 768px) {
          .ai-card {
            width: 85vw;
            min-height: 30vh;
            padding: 1.5rem;
          }
          .ai-card p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
