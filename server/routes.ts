import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { groqAI } from "./groq";
import { insertGoalSchema } from "@shared/schema";
import { z } from "zod";

const conversationRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })),
  avatar: z.enum(['Skyler', 'Raven', 'Phoenix'])
});

const planGenerationSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })),
  avatar: z.enum(['Skyler', 'Raven', 'Phoenix']),
  goalText: z.string()
});

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Conversation endpoint
  app.post('/api/conversation', async (req, res) => {
    try {
      const { messages, avatar } = conversationRequestSchema.parse(req.body);
      
      const response = await groqAI.generateResponse(messages, avatar);
      
      res.json({ success: true, data: response });
    } catch (error) {
      console.error('Conversation error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to process conversation' 
      });
    }
  });

  // Plan Generation endpoint
  app.post('/api/generate-plan', async (req, res) => {
    try {
      const { messages, avatar, goalText } = planGenerationSchema.parse(req.body);
      
      const plan = await groqAI.generatePlan(messages, avatar);
      
      res.json({ success: true, data: plan });
    } catch (error) {
      console.error('Plan generation error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to generate plan' 
      });
    }
  });

  // Save Goal & Plan endpoint
  app.post('/api/goals', async (req, res) => {
    try {
      const goalData = insertGoalSchema.parse(req.body);
      
      const goal = await storage.createGoal(goalData);
      
      res.json({ success: true, data: goal });
    } catch (error) {
      console.error('Goal creation error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to save goal' 
      });
    }
  });

  // Get user goals
  app.get('/api/goals/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      
      const goals = await storage.getUserGoals(userId);
      
      res.json({ success: true, data: goals });
    } catch (error) {
      console.error('Goals fetch error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch goals' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
