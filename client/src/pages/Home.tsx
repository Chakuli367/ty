import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Target, Users, BookOpen, ArrowRight } from 'lucide-react';
import GoalPlannerMain from '@/components/GoalPlannerMain';

export default function Home() {
  const [showPlanner, setShowPlanner] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-4xl mx-auto space-y-8">
          <Badge className="mb-4" variant="secondary">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Social Skills Coaching
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight">
            Transform Your
            <span className="text-primary block">Social Skills</span>
            with AI Coaching
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get a personalized action plan based on proven principles from 
            "How to Win Friends and Influence People" — powered by intelligent AI conversations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => setShowPlanner(true)}
              className="text-lg px-8 py-6 font-semibold"
              data-testid="button-start-journey"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6"
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
              Traditional courses tell you what to do. We create a personalized plan 
              based on your specific goals and current situation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Personalized Goal Setting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI analyzes your specific challenges and creates SMART goals 
                  tailored to your social skills journey. No generic advice.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Avatar-Guided Coaching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Choose from three unique AI personalities that match your learning style - 
                  visionary, analytical, or resilient approaches.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Carnegie Principles</CardTitle>
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-foreground">
            Ready to 10x Your Social Confidence?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands who have transformed their social skills with our AI-powered approach.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => setShowPlanner(true)}
            className="text-lg px-12 py-6 font-semibold"
            data-testid="button-get-started-cta"
          >
            Get Started Free
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
      
      {/* Goal Planner Overlay */}
      {showPlanner && (
        <GoalPlannerMain onClose={() => setShowPlanner(false)} />
      )}
    </div>
  );
}