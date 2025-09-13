import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const goals = pgTable("goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  goalText: text("goal_text").notNull(),
  avatar: text("avatar").notNull(),
  questions: jsonb("questions").notNull(),
  answers: jsonb("answers").notNull(),
  plan: jsonb("plan").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Goal = typeof goals.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;

// Avatar types
export const avatarSchema = z.enum(["Skyler", "Raven", "Phoenix"]);
export type Avatar = z.infer<typeof avatarSchema>;

// Conversation types
export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.date(),
});

export type Message = z.infer<typeof messageSchema>;

// Plan types
export const planStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  estimatedDays: z.number(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  completed: z.boolean().default(false),
});

export const planSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  totalDuration: z.number(),
  steps: z.array(planStepSchema),
  feasibilityScore: z.number().min(0).max(100),
});

export type Plan = z.infer<typeof planSchema>;
export type PlanStep = z.infer<typeof planStepSchema>;
