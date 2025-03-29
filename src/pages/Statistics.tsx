
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckSquare, Layers, Calendar, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatsCard from '@/components/StatsCard';
import {
  summaryStats,
  projectProgressData,
  taskPriorityData,
  teamPerformanceData,
  weeklyProductivityData
} from '@/utils/mockStatsData';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const Statistics = () => {
  // Prepare data for the completion rate display
  const completionRate = summaryStats.taskCompletionRate;
  const remainingRate = 100 - completionRate;
  const completionData = [
    { name: 'Completed', value: completionRate, fill: '#60A5FA' },
    { name: 'Remaining', value: remainingRate, fill: '#374151' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="animated-background"></div>
      
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Statistics</h1>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Projects" 
            value={summaryStats.totalProjects}
            description={`${summaryStats.activeProjects} active projects`}
            icon={<Layers className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard 
            title="Total Tasks" 
            value={summaryStats.totalTasks}
            description={`${summaryStats.completedTasks} completed tasks`}
            icon={<CheckSquare className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard 
            title="Task Completion Rate" 
            value={`${summaryStats.taskCompletionRate}%`}
            description="60% is the target rate"
            icon={<BarChart3 className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard 
            title="Overdue Tasks" 
            value={summaryStats.overdueTask}
            description="Tasks that missed deadline"
            icon={<Calendar className="h-4 w-4" />}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Project Progress Over Time */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  completed: { label: "Completed", color: "#60A5FA" },
                  pending: { label: "Pending", color: "#FBBF24" },
                  total: { label: "Total", color: "#F87171" },
                }}
              >
                <LineChart data={projectProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#60A5FA"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pending"
                    stroke="#FBBF24"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#F87171"
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>

          {/* Task Priority Distribution */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h2 className="text-lg font-semibold mb-4">Task Priority Distribution</h2>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskPriorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {taskPriorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Performance */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h2 className="text-lg font-semibold mb-4">Team Performance</h2>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  tasks: { label: "Completed Tasks", color: "#60A5FA" },
                }}
              >
                <BarChart data={teamPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="tasks" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          {/* Weekly Productivity */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h2 className="text-lg font-semibold mb-4">Weekly Productivity</h2>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  productivity: { label: "Productivity", color: "#60A5FA" },
                }}
              >
                <AreaChart data={weeklyProductivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="productivity"
                    stroke="#60A5FA"
                    fill="#60A5FA"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics;
