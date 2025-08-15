# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive Academic and Campus Life Enhancement Platform built with React. The platform provides six key modules for university students and faculty:

1. **Event Voting** - University event voting with conflict detection
2. **Teacher Reviews** - Moderated faculty review system
3. **Course Ratings** - Course and faculty performance feedback
4. **Student Council Elections** - Secure voting system with real-time results
5. **Q&A Platform** - Discussion forum for academic collaboration
6. **Services Feedback** - Campus facilities and services feedback

## Development Commands

- `npm start` - Start development server (opens http://localhost:3000)
- `npm run build` - Build for production
- `npm test` - Run tests in interactive watch mode
- `npm run eject` - Eject from Create React App (one-way operation)

## Architecture

- **Framework**: React 19.1.1 with Create React App
- **UI Library**: Material-UI (@mui/material) for consistent design
- **Routing**: React Router DOM for client-side navigation
- **State Management**: React Context API with useReducer
- **Styling**: Material-UI theme system with custom theming
- **HTTP Client**: Axios for API communication
- **Date Management**: date-fns for date utilities

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   └── layout/          # Layout components (Header, Layout)
├── pages/               # Route-level components
│   ├── events/          # Event voting module
│   ├── reviews/         # Teacher reviews module  
│   ├── courses/         # Course ratings module
│   ├── elections/       # Student elections module
│   ├── qa/              # Q&A forum module
│   └── feedback/        # Services feedback module
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── services/            # API service functions
└── utils/               # Utility functions
```

## Key Files

- `src/App.js` - Main application with routing and theme setup
- `src/components/layout/Layout.js` - Main layout wrapper
- `src/components/layout/Header.js` - Navigation header
- `src/context/AppContext.js` - Global state management
- `src/pages/Home.js` - Landing page with feature overview

## State Management

The application uses React Context API with useReducer for state management:
- Global state includes user, events, reviews, courses, elections, questions, feedback
- Context provider wraps the entire application
- Helper functions provided for common state operations

## Routing Structure

- `/` - Home page with platform overview
- `/events` - Event voting system
- `/reviews` - Teacher reviews module
- `/courses` - Course ratings system
- `/elections` - Student council elections
- `/qa` - Q&A discussion forum  
- `/feedback` - Services feedback system

## Theme and Styling

- Material-UI theme with custom color palette
- Primary color: #1976d2 (blue)
- Secondary color: #9c27b0 (purple)
- Consistent typography with Roboto font family
- Responsive design following Material Design principles

## Implemented Features

### 1. Event Voting System (/events)
- **Event Proposal**: Faculty and students can propose events with conflict detection
- **Voting Interface**: Support/oppose voting with real-time progress tracking
- **Schedule Conflict Detection**: Automatic detection of conflicts with academic periods
- **Feedback System**: Users can provide detailed feedback on event proposals
- **Status Management**: Events progress through voting → approved/rejected states

### 2. Student Council Elections (/elections)
- **Secure Voting System**: Anonymous and secure digital voting platform
- **Candidate Registration**: Comprehensive candidate registration with verification
- **Real-time Results**: Live vote tracking and turnout statistics
- **Multiple Positions**: Support for President, Vice President, Treasurer, etc.
- **Candidate Profiles**: Detailed manifesto, experience, and qualification display
- **Voter Authentication**: Secure voter verification and anti-fraud measures

### 3. Teacher Reviews & Feedback (/reviews)
- **Anonymous Review System**: Students can submit anonymous, constructive teacher reviews
- **Multi-dimensional Ratings**: Teaching quality, clarity, helpfulness, and difficulty ratings
- **Content Moderation**: Automated content filtering and manual review for appropriate feedback
- **Review Helpfulness**: Peer voting system for review quality assessment
- **Teacher Profiles**: Comprehensive faculty profiles with aggregated ratings and feedback
- **Abuse Prevention**: Advanced moderation to prevent inappropriate or malicious reviews

### 4. Course Ratings & Reviews (/courses)
- **Comprehensive Course Evaluation**: Rate content, difficulty, workload, syllabus, and materials
- **Detailed Course Information**: Prerequisites, enrollment stats, grade distributions
- **Course Comparison**: Side-by-side comparison of similar courses
- **Syllabus Feedback**: Specific feedback on course structure and organization
- **Enrollment Insights**: Real-time capacity, waitlist, and popularity metrics
- **Recommendation System**: Personalized course recommendations based on ratings

### Key Technical Implementations
- **Custom Hooks**: useEvents, useElections, useTeachers, useCourses for state management
- **Service Layer**: eventService, electionService, reviewService, courseService for API abstraction  
- **Reusable Components**: VotingCard for consistent voting interfaces
- **Mock Data**: Comprehensive dummy data for development and testing
- **Content Moderation**: Automated inappropriate content detection and filtering
- **Analytics Dashboard**: Detailed insights and rating breakdowns
- **Search & Filter**: Advanced search and filtering capabilities
- **Real-time Updates**: Live polling for results and vote counts

## Development Guidelines

- Use Material-UI components consistently
- Follow the established folder structure
- Implement proper error handling in components
- Use the AppContext for state management
- Leverage custom hooks (useEvents, useElections, useTeachers, useCourses) for data management
- Use service classes for API interactions
- Implement content moderation for all user-generated content
- Add comprehensive search and filtering capabilities
- Follow React best practices and hooks patterns
- Implement real-time features using polling or WebSocket connections
- Ensure accessibility and responsive design across all components