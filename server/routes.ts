
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { externalAPI } from "./groq";
import { firestore, auth } from "./firebase";
import { insertGoalSchema } from "@shared/schema";
import { z } from "zod";

const questionsRequestSchema = z.object({
  goal_name: z.string()
});

const planGenerationSchema = z.object({
  goal_name: z.string(),
  user_answers: z.array(z.string()),
  avatar: z.enum(['Skyler', 'Raven', 'Phoenix'])
});

const summaryRequestSchema = z.object({
  user_id: z.string(),
  plan: z.string()
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Real-time conversation endpoint
  app.post('/api/conversation', async (req, res) => {
    try {
      const { messages, avatar } = req.body;
      
      // Store conversation in Firestore
      const conversationRef = await firestore.collection('conversations').add({
        messages: messages,
        avatar: avatar,
        timestamp: new Date()
      });

      // Generate AI response (replace with actual AI logic)
      const lastUserMessage = messages[messages.length - 1];
      let response = '';
      let generatePlan = false;

      // Simple response logic - replace with actual AI
      if (messages.length <= 2) {
        response = `I understand you want to work on "${lastUserMessage.content}". Tell me more about what specific situations challenge you the most.`;
      } else if (messages.length <= 4) {
        response = `That's helpful context. What would success look like for you in this area? What's your ideal outcome?`;
      } else {
        response = `Based on our conversation, I think I have enough information to create a personalized plan for you. Let me get started on that!`;
        generatePlan = true;
      }

      // Update conversation in Firestore
      await conversationRef.update({
        ai_response: response,
        generate_plan: generatePlan
      });

      res.json({ 
        success: true, 
        data: { 
          message: response, 
          generatePlan: generatePlan 
        } 
      });
    } catch (error) {
      console.error('Conversation error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to process conversation' 
      });
    }
  });

  // Generate plan endpoint
  app.post('/api/generate-plan', async (req, res) => {
    try {
      const { messages, avatar, goalText } = req.body;
      
      const plan = await externalAPI.generatePlan(goalText, [], avatar);
      
      res.json({ success: true, data: plan });
    } catch (error) {
      console.error('Plan generation error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to generate plan' 
      });
    }
  });
  // Get questions for goal
  app.post('/ask-questions', async (req, res) => {
    try {
      const { goal_name } = questionsRequestSchema.parse(req.body);
      
      const questions = await externalAPI.generateQuestions(goal_name);
      
      res.json({ success: true, questions: questions.join('\n') });
    } catch (error) {
      console.error('Questions generation error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to generate questions' 
      });
    }
  });

  // Generate final plan
  app.post('/final-plan', async (req, res) => {
    try {
      const { goal_name, user_answers, avatar } = planGenerationSchema.parse(req.body);
      
      const plan = await externalAPI.generatePlan(goal_name, user_answers, avatar);
      
      res.json({ success: true, plan });
    } catch (error) {
      console.error('Plan generation error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to generate plan' 
      });
    }
  });

  // Achievement summary
  app.post('/achievement-summary', async (req, res) => {
    try {
      const { user_id, plan } = summaryRequestSchema.parse(req.body);
      
      const summary = await externalAPI.getAchievementSummary(user_id, plan);
      
      res.json({ success: true, summary });
    } catch (error) {
      console.error('Summary generation error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to generate summary' 
      });
    }
  });

  // Save plan to Firebase
  app.post('/api/save-plan', async (req, res) => {
    try {
      const { userId, planHtml, avatar, goal } = req.body;
      
      await firestore.collection('Plans').doc(userId).set({
        plan_html: planHtml,
        generated_at: new Date(),
        avatar: avatar,
        goal: goal
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error('Plan save error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to save plan' 
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
