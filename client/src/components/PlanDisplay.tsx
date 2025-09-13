
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, User, BookOpen, CheckCircle, Clock } from 'lucide-react';

interface PlanData {
  id: string;
  plan: string; // HTML content
  avatar: string;
  generated_at: string;
  created_at: string;
}

interface PlanDisplayProps {
  userId: string;
  onPlanUpdate?: () => void;
}

export default function PlanDisplay({ userId, onPlanUpdate }: PlanDisplayProps) {
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState('1');

  useEffect(() => {
    fetchPlan();
  }, [userId]);

  const fetchPlan = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/plan/${userId}`);
      const result = await response.json();
      
      if (result.success) {
        setPlanData(result.data);
      } else {
        setError(result.error || 'Failed to fetch plan');
      }
    } catch (err) {
      setError('Failed to load plan');
      console.error('Plan fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const extractDayContent = (htmlContent: string) => {
    // Parse the HTML content to extract individual days
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const dayDivs = doc.querySelectorAll('div[style*="background: #fff"]');
    
    const days: { [key: string]: string } = {};
    
    dayDivs.forEach((div, index) => {
      if (index < 5) { // Ensure only 5 days
        days[(index + 1).toString()] = div.outerHTML;
      }
    });
    
    return days;
  };

  const avatarStyles = {
    Skyler: { color: '#4a90e2', gradient: 'from-blue-400 to-blue-600' },
    Raven: { color: '#8b5cf6', gradient: 'from-purple-400 to-purple-600' },
    Phoenix: { color: '#f59e0b', gradient: 'from-orange-400 to-red-600' }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
          <span>Loading your personalized plan...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center p-8">
        <div className="text-muted-foreground mb-4">
          <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Plan Found</h3>
          <p>{error}</p>
        </div>
        <Button onClick={fetchPlan} variant="outline">
          Try Again
        </Button>
      </Card>
    );
  }

  if (!planData) return null;

  const dayContent = extractDayContent(planData.plan);
  const style = avatarStyles[planData.avatar as keyof typeof avatarStyles] || avatarStyles.Skyler;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Plan Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${style.gradient} flex items-center justify-center`}>
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Your 5-Day Social Skills Plan</CardTitle>
                <p className="text-muted-foreground">Guided by {planData.avatar}</p>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-1 mb-1">
                <Calendar className="w-4 h-4" />
                Created {new Date(planData.created_at).toLocaleDateString()}
              </div>
              <Badge variant="secondary" className="text-xs">
                5 Day Challenge
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Day Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Your Daily Lessons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="grid w-full grid-cols-5">
              {Object.keys(dayContent).map((day) => (
                <TabsTrigger key={day} value={day} className="flex items-center gap-1">
                  <span className="hidden sm:inline">Day</span> {day}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(dayContent).map(([day, content]) => (
              <TabsContent key={day} value={day} className="mt-6">
                <ScrollArea className="max-h-[600px]">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                    style={{
                      '--tw-prose-body': 'hsl(var(--foreground))',
                      '--tw-prose-headings': style.color,
                    } as React.CSSProperties}
                  />
                </ScrollArea>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Day {day} of 5
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {parseInt(day) > 1 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveDay((parseInt(day) - 1).toString())}
                      >
                        Previous Day
                      </Button>
                    )}
                    {parseInt(day) < 5 && (
                      <Button 
                        size="sm"
                        onClick={() => setActiveDay((parseInt(day) + 1).toString())}
                      >
                        Next Day
                      </Button>
                    )}
                    {parseInt(day) === 5 && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete Challenge
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
