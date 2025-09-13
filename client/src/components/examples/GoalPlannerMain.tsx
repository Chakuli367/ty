import GoalPlannerMain from '../GoalPlannerMain';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function GoalPlannerMainExample() {
  const [showPlanner, setShowPlanner] = useState(false);
  
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Enhanced Goal Planner Experience</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Experience the 10x enhanced goal-setting interface with AI-powered conversations, 
        avatar-guided planning, and personalized social skills coaching.
      </p>
      
      <Button 
        size="lg" 
        onClick={() => setShowPlanner(true)}
        className="text-lg px-8 py-6"
      >
        Launch Goal Planner
      </Button>
      
      {showPlanner && (
        <GoalPlannerMain onClose={() => setShowPlanner(false)} />
      )}
    </div>
  );
}