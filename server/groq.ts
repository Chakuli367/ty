import fetch from 'node-fetch';

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GoalPlanningResponse {
  message: string;
  generatePlan?: boolean;
  questions?: string[];
  plan?: any;
}

class ExternalAPIService {
  private apiBase = "https://one23-u2ck.onrender.com";

  async generateQuestions(goalName: string): Promise<string[]> {
    try {
      const response = await fetch(`${this.apiBase}/ask-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal_name: goalName })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      return data.questions.split("\n").filter((q: string) => q.trim());
    } catch (error) {
      console.error('External API error:', error);
      throw error;
    }
  }

  async generatePlan(goalName: string, answers: string[], avatar: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiBase}/final-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal_name: goalName,
          user_answers: answers,
          avatar: avatar
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      return data.plan;
    } catch (error) {
      console.error('Plan generation error:', error);
      throw error;
    }
  }

  async getAchievementSummary(userId: string, plan: string): Promise<string> {
    try {
      const response = await fetch(`${this.apiBase}/achievement-summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          plan: plan
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      return data.summary;
    } catch (error) {
      console.error('Summary generation error:', error);
      throw error;
    }
  }
}

export const externalAPI = new ExternalAPIService();