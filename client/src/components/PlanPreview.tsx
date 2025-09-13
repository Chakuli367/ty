import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar, CheckCircle, Clock, Edit, Lightbulb, Target, TrendingUp } from 'lucide-react';
import type { Plan, PlanStep } from '@shared/schema';

interface PlanPreviewProps {
  plan: Plan;
  onEditPlan: () => void;
  onAcceptPlan: () => void;
  isGenerating?: boolean;
}

const difficultyConfig = {
  easy: { color: 'bg-green-500', label: 'Easy', textColor: 'text-green-700 dark:text-green-400' },
  medium: { color: 'bg-yellow-500', label: 'Medium', textColor: 'text-yellow-700 dark:text-yellow-400' },
  hard: { color: 'bg-red-500', label: 'Challenging', textColor: 'text-red-700 dark:text-red-400' }
};

export default function PlanPreview({ plan, onEditPlan, onAcceptPlan, isGenerating = false }: PlanPreviewProps) {
  const [expandedSteps, setExpandedSteps] = useState<string[]>([plan.steps[0]?.id || '']);
  
  const completedSteps = plan.steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / plan.steps.length) * 100;
  
  const difficultyDistribution = {
    easy: plan.steps.filter(s => s.difficulty === 'easy').length,
    medium: plan.steps.filter(s => s.difficulty === 'medium').length,
    hard: plan.steps.filter(s => s.difficulty === 'hard').length
  };

  if (isGenerating) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Creating Your Personalized Plan</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              AI is analyzing your goals and crafting a step-by-step plan tailored to your social skills journey...
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>This usually takes 30-60 seconds</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6" data-testid="plan-preview">
      {/* Plan Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                {plan.title}
              </CardTitle>
              <p className="text-muted-foreground text-base leading-relaxed">
                {plan.description}
              </p>
            </div>
            <Badge 
              variant={plan.feasibilityScore >= 80 ? 'default' : plan.feasibilityScore >= 60 ? 'secondary' : 'destructive'}
              className="flex items-center gap-1"
            >
              <TrendingUp className="w-3 h-3" />
              {plan.feasibilityScore}% Feasible
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Plan Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Calendar className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold">{plan.totalDuration} days</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Steps</p>
              <p className="font-semibold">{plan.steps.length} phases</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Clock className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="font-semibold">{Math.round(progressPercentage)}%</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Lightbulb className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Difficulty</p>
              <div className="flex justify-center gap-1">
                {Object.entries(difficultyDistribution).map(([level, count]) => (
                  count > 0 && (
                    <div key={level} className={`w-2 h-2 rounded-full ${difficultyConfig[level as keyof typeof difficultyConfig].color}`} />
                  )
                ))}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{completedSteps}/{plan.steps.length} completed</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Plan Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Your Action Plan
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Accordion type="multiple" value={expandedSteps} onValueChange={setExpandedSteps}>
            {plan.steps.map((step, index) => {
              const difficulty = difficultyConfig[step.difficulty];
              
              return (
                <AccordionItem key={step.id} value={step.id} className="border rounded-lg mb-4 last:mb-0">
                  <AccordionTrigger 
                    className="hover:no-underline px-4 py-3 hover-elevate"
                    data-testid={`step-${index}`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                        ${step.completed ? 'bg-green-500' : 'bg-muted-foreground'}
                      `}>
                        {step.completed ? '✓' : index + 1}
                      </div>
                      
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-base">{step.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant="outline" className={`text-xs ${difficulty.textColor}`}>
                            {difficulty.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.estimatedDays} days
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-4 pb-4">
                    <div className="ml-11 space-y-3">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      
                      {!step.completed && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => console.log('Mark step as complete:', step.id)}
                          className="hover-elevate"
                          data-testid={`button-complete-step-${index}`}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button 
          variant="outline" 
          size="lg"
          onClick={onEditPlan}
          className="flex items-center gap-2 hover-elevate"
          data-testid="button-edit-plan"
        >
          <Edit className="w-4 h-4" />
          Refine Plan
        </Button>
        
        <Button 
          size="lg"
          onClick={onAcceptPlan}
          className="flex items-center gap-2 px-8"
          data-testid="button-accept-plan"
        >
          <Target className="w-4 h-4" />
          Accept & Start Journey
        </Button>
      </div>
    </div>
  );
}