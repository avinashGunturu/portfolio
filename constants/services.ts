import { Service } from '../types';

export const SERVICES: Service[] = [
  // --- CLIENT SERVICES ---
  {
    id: 'discovery',
    category: 'Clients',
    title: 'Discovery Call',
    description: 'Initial consultation to discuss your project requirements, timeline, and feasibility.',
    price: 'Free',
    duration: '30 min',
    calHandle: 'discovery',
    isPopular: true,
    features: ['Project Scope', 'Budget Estimation', 'Tech Stack Advice']
  },
  {
    id: 'consultation',
    category: 'Clients',
    title: 'Technical Consultation',
    description: 'Deep dive into your existing architecture or codebase to identify bottlenecks.',
    price: '$250',
    duration: '1 hour',
    calHandle: 'tech-consult',
    features: ['Architecture Review', 'Performance Audit', 'Security Check']
  },
  {
    id: 'retainer',
    category: 'Clients',
    title: 'Monthly Retainer',
    description: 'Dedicated hours for ongoing development, maintenance, and strategic planning.',
    price: '$2,500/mo',
    duration: 'Recurring',
    calHandle: 'retainer-discussion',
    features: ['Priority Support', '20h Dev Time', 'Weekly Sync']
  },

  // --- DEVELOPER SERVICES ---
  {
    id: 'code-review',
    category: 'Developers',
    title: 'Code Review & Audit',
    description: 'Comprehensive review of your PRs or repository with actionable feedback.',
    price: '$150',
    duration: '45 min',
    calHandle: 'code-review',
    isPopular: true,
    features: ['React/Next.js Focus', 'Best Practices', 'Refactoring Tips']
  },
  {
    id: 'mentorship',
    category: 'Developers',
    title: '1:1 Mentorship',
    description: 'Personalized career guidance and pair programming for frontend engineers.',
    price: '$120',
    duration: '1 hour',
    calHandle: 'mentorship',
    features: ['Career Pathing', 'Mock Interview', 'Pair Programming']
  },
  {
    id: 'portfolio-review',
    category: 'Developers',
    title: 'Portfolio Review',
    description: 'Detailed critique of your portfolio to maximize your chances of getting hired.',
    price: '$80',
    duration: '30 min',
    calHandle: 'portfolio-review',
    features: ['UX/UI Feedback', 'Resume Check', 'Storytelling Tips']
  }
];

export const SERVICE_CATEGORIES = ['All', 'Clients', 'Developers'];