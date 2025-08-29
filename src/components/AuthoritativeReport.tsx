import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, CheckCircle, AlertTriangle, Target } from 'lucide-react';

interface ConfidenceMetric {
  category: string;
  score: number;
  description: string;
}

interface DataVisualization {
  type: 'bar' | 'pie' | 'line';
  title: string;
  data: any[];
}

interface ActionableRecommendation {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timeline: string;
}

interface AuthoritativeReportProps {
  confidenceMetrics: ConfidenceMetric[];
  visualizations: DataVisualization[];
  recommendations: ActionableRecommendation[];
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const getConfidenceColor = (score: number) => {
  if (score >= 80) return 'text-green-600 bg-green-50';
  if (score >= 60) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case 'medium':
      return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    case 'low':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    default:
      return <Target className="w-4 h-4 text-blue-500" />;
  }
};

const getPriorityBorder = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-l-red-500';
    case 'medium':
      return 'border-l-yellow-500';
    case 'low':
      return 'border-l-green-500';
    default:
      return 'border-l-blue-500';
  }
};

export const AuthoritativeReport: React.FC<AuthoritativeReportProps> = ({
  confidenceMetrics,
  visualizations,
  recommendations
}) => {
  const renderVisualization = (viz: DataVisualization) => {
    switch (viz.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={viz.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={viz.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {viz.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viz.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 mt-8">
      {/* Confidence Metrics Section */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Confidence Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {confidenceMetrics.map((metric, index) => (
            <div key={index} className="bg-background border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{metric.category}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(metric.score)}`}>
                  {metric.score}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${metric.score}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Visualizations Section */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <BarChart className="w-5 h-5 text-green-500" />
          Key Findings Visualized
        </h3>
        <div className="space-y-8">
          {visualizations.map((viz, index) => (
            <div key={index} className="bg-background border rounded-lg p-4">
              <h4 className="font-medium mb-4">{viz.title}</h4>
              {renderVisualization(viz)}
            </div>
          ))}
        </div>
      </div>

      {/* Expert Discussion Questions Section */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          10 Questions to Potentially Discuss with Experts – Not Covered in as Much Detail by LLM Results
        </h3>
        <div className="space-y-4">
          {[
            "What are the most common negotiation tactics used by top tyre manufacturers when dealing with premium automakers?",
            "How do regional regulations in the EU impact the supply chain strategies of tyre manufacturers?",
            "What are the key differences in supplier relationships between luxury and economy automotive segments?",
            "How are sustainability requirements changing the materials and manufacturing processes in the tyre industry?",
            "What are the emerging technologies that could disrupt traditional tyre manufacturing and supply chains?",
            "How do trade policies and tariffs affect the competitiveness of European tyre manufacturers?",
            "What are the key performance indicators that automakers use to evaluate tyre suppliers?",
            "How is the shift to electric vehicles impacting tyre specifications and supplier relationships?",
            "What are the most common pain points in the current tyre supply chain, and how are companies addressing them?",
            "How do tyre manufacturers balance cost, quality, and sustainability in their supplier selection process?"
          ].map((question, index) => (
            <div key={index} className="bg-background border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-medium text-sm">
                  {index + 1}
                </div>
                <p className="text-sm text-foreground">{question}</p>
              </div>
              <a
                href={`/ExpertSelection?question=${encodeURIComponent(question)}`}
                className="whitespace-nowrap inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/ExpertSelection?question=${encodeURIComponent(question)}`;
                }}
              >
                Ask experts the question
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
