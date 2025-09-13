# Design Guidelines for Enhanced Goal-Setting Experience

## Design Approach
**Reference-Based Approach**: Drawing inspiration from conversational AI platforms like Character.AI and Replika, combined with productivity tools like Notion for clean, focused interfaces. The design should feel like an intelligent conversation rather than a form.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Dark mode background: 15 8% 12% (deep charcoal)
- Surface colors: 15 6% 18% (elevated surfaces)
- Text primary: 0 0% 95% (near white)
- Text secondary: 0 0% 70% (muted gray)

**Brand Colors:**
- Primary accent: 220 85% 60% (vibrant blue for AI responses)
- Success: 142 76% 55% (green for completed steps)
- Warning: 38 92% 65% (amber for refinements)

**Avatar-Specific Colors:**
- Skyler: 260 75% 65% (visionary purple)
- Raven: 210 85% 55% (analytical blue)
- Phoenix: 15 85% 60% (resilient orange)

### B. Typography
**Font Families:**
- Primary: 'Inter' (clean, modern readability)
- Accent: 'Playfair Display' (for book quotes and emphasis)

**Hierarchy:**
- Hero text: 3xl-4xl, bold weight
- Conversation text: base-lg, regular weight
- UI labels: sm, medium weight
- Timestamps: xs, light weight

### C. Layout System
**Spacing Units:** Consistent use of Tailwind units 2, 4, 6, 8, 12, 16
- Component padding: p-6 to p-8
- Section margins: my-12 to my-16
- Button spacing: px-6 py-3
- Card gaps: gap-4 to gap-6

### D. Component Library

**Conversational Interface:**
- Chat bubbles with subtle shadows and rounded corners (rounded-2xl)
- User messages: right-aligned, avatar color background
- AI messages: left-aligned, neutral background with blue accent border
- Typing indicators with animated dots
- Progressive disclosure of plan elements

**Interactive Elements:**
- Avatar cards: Large, prominent with subtle hover elevations
- Goal input: Expandable text areas that grow with content
- Plan preview cards: Collapsible sections with smooth animations
- Progress indicators: Stepped progress bars with completed/current/future states

**Book Integration:**
- 3D book maintains current animation but with enhanced lighting
- Quote overlays from Carnegie's principles appear contextually
- Page-turn animations for major transitions

### E. Enhanced User Experience

**Smart Questioning Flow:**
- Questions appear one at a time in conversation format
- Context-aware follow-ups based on previous answers
- Visual branching indicators showing conversation path
- Smart suggestions appear as quick-reply buttons

**Plan Generation Interface:**
- Real-time plan building with visual progress
- Interactive timeline with drag-and-drop milestone adjustment
- Color-coded difficulty levels for each step
- Expandable details for each lesson/exercise

**Feedback & Validation:**
- Inline AI suggestions with subtle highlight animations
- Feasibility indicators (traffic light system: green/yellow/red)
- One-click refinement options
- Success probability meters for goals

## Animations
**Minimal but Meaningful:**
- Smooth transitions between conversation steps (300ms ease-in-out)
- Gentle fade-ins for new elements
- Subtle scale transforms on interactive elements
- Book page turns for major section transitions

## Key Design Principles
1. **Conversational First**: Interface feels like chatting with an intelligent coach
2. **Progressive Enhancement**: Information reveals intelligently based on user needs
3. **Avatar Personality**: UI adapts subtly to chosen avatar's characteristics
4. **Carnegie Integration**: Principles and quotes appear contextually throughout experience
5. **Smart Simplicity**: Complex AI happens behind clean, intuitive interface

The design should transform the current form-like experience into an engaging, intelligent conversation that feels personally tailored to each user's social skills journey.