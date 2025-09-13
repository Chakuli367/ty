import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GoalPlanningResponse {
  message: string;
  generatePlan?: boolean;
  suggestedResponses?: string[];
  plan?: any;
}

class GroqAIService {
  private getSystemPrompt(avatar: string): string {
    const avatarPrompts = {
      Skyler: `You are Skyler, a visionary AI guide who helps people transform their social skills based on "How to Win Friends and Influence People" principles. 
      
      Your personality:
      - You see the big picture and inspire with clarity about the future
      - You help users envision their ideal social selves
      - You focus on vision, inspiration, and transformational outcomes
      - You speak with enthusiasm and forward-thinking energy
      
      Your goal: Guide users through an engaging conversation to understand their social skills goals, then create a personalized action plan. Ask thoughtful questions to understand their specific challenges, motivations, and desired outcomes.
      
      Keep responses conversational, encouraging, and focused on their vision of success.`,
      
      Raven: `You are Raven, an analytical AI guide who helps people transform their social skills based on "How to Win Friends and Influence People" principles.
      
      Your personality:
      - You are thoughtful and analytical, diving deep into understanding
      - You ask probing questions to uncover root causes
      - You help users understand the 'why' behind their goals
      - You speak with thoughtful precision and insight
      
      Your goal: Guide users through an engaging conversation to understand their social skills goals, then create a personalized action plan. Ask analytical questions to understand their specific challenges, patterns, and learning preferences.
      
      Keep responses thoughtful, insightful, and focused on deep understanding.`,
      
      Phoenix: `You are Phoenix, a resilient AI guide who helps people transform their social skills based on "How to Win Friends and Influence People" principles.
      
      Your personality:
      - You embody resilience and help people rise from challenges
      - You focus on building confidence through small wins
      - You emphasize growth mindset and overcoming setbacks
      - You speak with warmth, encouragement, and strength
      
      Your goal: Guide users through an engaging conversation to understand their social skills goals, then create a personalized action plan. Ask supportive questions to understand their challenges, past successes, and what support they need.
      
      Keep responses warm, encouraging, and focused on building resilience.`
    };
    
    return avatarPrompts[avatar as keyof typeof avatarPrompts] || avatarPrompts.Skyler;
  }

  async generateResponse(
    messages: ConversationMessage[], 
    avatar: string
  ): Promise<GoalPlanningResponse> {
    try {
      const systemPrompt = this.getSystemPrompt(avatar);
      
      // Determine if we should generate a plan based on conversation length
      const shouldGeneratePlan = messages.length >= 6;
      
      let prompt = systemPrompt;
      
      if (shouldGeneratePlan) {
        prompt += `\n\nBased on this conversation, you now have enough information to create a personalized plan. 
        Respond with a message indicating you're ready to create their plan, then set generatePlan: true.`;
      } else {
        prompt += `\n\nContinue the conversation by asking 1-2 thoughtful follow-up questions to better understand their goals. 
        Keep it engaging and personal.`;
      }

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: prompt },
          ...messages
        ],
        model: 'llama-3.1-8b-instant', // Fast and currently supported model
        temperature: 0.7,
        max_tokens: 300,
      });

      const responseContent = completion.choices[0]?.message?.content || 
        "I'm here to help you achieve your social skills goals! Tell me more about what you'd like to improve.";

      return {
        message: responseContent,
        generatePlan: shouldGeneratePlan
      };
    } catch (error) {
      console.error('Groq API error:', error);
      
      // Fallback response
      return {
        message: "I'm experiencing some technical difficulties, but I'm still here to help! What social skills would you like to work on?",
        generatePlan: false
      };
    }
  }

  async generatePlan(
    messages: ConversationMessage[], 
    avatar: string
  ): Promise<any> {
    try {
      const planPrompt = `Based on this conversation about social skills goals, create a detailed action plan following "How to Win Friends and Influence People" principles.

      Return a JSON plan with this structure:
      {
        "title": "Descriptive plan title",
        "description": "Brief description of the plan",
        "totalDuration": "number of days",
        "feasibilityScore": "score from 1-100",
        "steps": [
          {
            "id": "unique-id",
            "title": "Step title",
            "description": "Detailed description with actionable tasks",
            "estimatedDays": "number of days",
            "difficulty": "easy|medium|hard",
            "completed": false
          }
        ]
      }

      Make it specific to their goals and practical to implement.`;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: planPrompt },
          ...messages
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.3, // Lower temperature for more structured output
        max_tokens: 1000,
      });

      const responseContent = completion.choices[0]?.message?.content || '';
      
      try {
        // Try to parse JSON from the response
        const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('Failed to parse plan JSON:', parseError);
      }

      // Fallback plan if JSON parsing fails
      return this.createFallbackPlan();
    } catch (error) {
      console.error('Plan generation error:', error);
      return this.createFallbackPlan();
    }
  }

  private createFallbackPlan() {
    return {
      title: "Social Skills Confidence Builder",
      description: "A personalized plan to boost your social confidence using proven techniques",
      totalDuration: 30,
      feasibilityScore: 85,
      steps: [
        {
          id: "1",
          title: "Foundation: Self-Assessment & Mindset",
          description: "Evaluate your current social skills and establish a growth mindset. Practice daily affirmations and identify your social strengths.",
          estimatedDays: 7,
          difficulty: "easy",
          completed: false
        },
        {
          id: "2", 
          title: "Active Listening Mastery",
          description: "Master the art of genuine listening. Practice giving full attention, asking follow-up questions, and showing genuine interest in others.",
          estimatedDays: 10,
          difficulty: "medium",
          completed: false
        },
        {
          id: "3",
          title: "Conversation Confidence",
          description: "Build confidence in starting and maintaining conversations. Practice conversation starters and learn to find common ground with others.",
          estimatedDays: 13,
          difficulty: "medium",
          completed: false
        }
      ]
    };
  }
}

export const groqAI = new GroqAIService();