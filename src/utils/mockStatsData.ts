
// This file provides mock data for statistics visualizations

// Project completion data for line chart
export const projectProgressData = [
  { name: 'Jan', completed: 12, pending: 18, total: 30 },
  { name: 'Feb', completed: 15, pending: 20, total: 35 },
  { name: 'Mar', completed: 22, pending: 18, total: 40 },
  { name: 'Apr', completed: 28, pending: 12, total: 40 },
  { name: 'May', completed: 32, pending: 8, total: 40 },
  { name: 'Jun', completed: 38, pending: 7, total: 45 },
  { name: 'Jul', completed: 42, pending: 8, total: 50 },
];

// Task priority distribution for pie chart
export const taskPriorityData = [
  { name: 'High', value: 18, fill: '#F87171' },
  { name: 'Medium', value: 35, fill: '#FBBF24' },
  { name: 'Low', value: 22, fill: '#60A5FA' },
];

// Team performance data for bar chart
export const teamPerformanceData = [
  { name: 'Team Alpha', tasks: 45 },
  { name: 'Team Beta', tasks: 38 },
  { name: 'Team Gamma', tasks: 52 },
  { name: 'Team Delta', tasks: 29 },
];

// Overall summary statistics
export const summaryStats = {
  totalProjects: 12,
  activeProjects: 8,
  totalTasks: 156,
  completedTasks: 94,
  overdueTask: 7,
  taskCompletionRate: 60.2,
};

// Weekly productivity data
export const weeklyProductivityData = [
  { day: 'Mon', productivity: 67 },
  { day: 'Tue', productivity: 72 },
  { day: 'Wed', productivity: 88 },
  { day: 'Thu', productivity: 78 },
  { day: 'Fri', productivity: 65 },
  { day: 'Sat', productivity: 45 },
  { day: 'Sun', productivity: 30 },
];
