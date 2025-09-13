import PlanPreview from '../PlanPreview';
import type { Plan } from '@shared/schema';

// todo: remove mock functionality
const mockPlan: Plan = {
  id: '1',
  title: 'Master Networking Confidence',
  description: 'A comprehensive 6-week program to transform your networking abilities and build genuine professional relationships with confidence.',
  totalDuration: 42,
  feasibilityScore: 85,
  steps: [
    {
      id: '1',
      title: 'Foundation: Understanding Your Communication Style',
      description: 'Discover your natural communication strengths and identify areas for growth. Practice active listening techniques and learn to read social cues more effectively.',
      estimatedDays: 7,
      difficulty: 'easy',
      completed: true
    },
    {
      id: '2', 
      title: 'Conversation Starters & Icebreakers',
      description: 'Master the art of starting conversations naturally. Learn 10 proven conversation starters and practice them in low-pressure environments.',
      estimatedDays: 10,
      difficulty: 'easy',
      completed: false
    },
    {
      id: '3',
      title: 'Building Rapport & Finding Common Ground',
      description: 'Develop skills to quickly establish connections with new people. Practice finding shared interests and building on conversational threads.',
      estimatedDays: 10,
      difficulty: 'medium',
      completed: false
    },
    {
      id: '4',
      title: 'Professional Event Navigation',
      description: 'Learn strategies for working the room effectively, managing group conversations, and positioning yourself as a valuable connection.',
      estimatedDays: 10,
      difficulty: 'medium',
      completed: false
    },
    {
      id: '5',
      title: 'Follow-up & Relationship Maintenance',
      description: 'Master the crucial skill of following up after networking events. Learn to maintain professional relationships and add genuine value to your network.',
      estimatedDays: 5,
      difficulty: 'hard',
      completed: false
    }
  ]
};

export default function PlanPreviewExample() {
  return (
    <PlanPreview 
      plan={mockPlan}
      onEditPlan={() => console.log('Edit plan clicked')}
      onAcceptPlan={() => console.log('Accept plan clicked')}
    />
  );
}