import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "@/config/constants";
import React, { useState } from "react";
import {
  Home,
  History,
  BarChart3,
  Menu,
  X,
  ChevronRight,
  Upload,
  FileText,
  Brain,
  Plus,
  Calendar,
  Users,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    let authResult;

    try {
      authResult = await context.queryClient.fetchQuery({
        queryKey: ["auth"],
        queryFn: async () => {
          const response = await axios.get(`${BASE_URL}/auth/check-auth`, {
            withCredentials: true,
          });
          return response.data;
        },
        staleTime: 5 * 60 * 1000,
      });
    } catch (err) {
      toast.error("Some error occurred. Please try again.");
      console.log(err);
      throw redirect({ to: "/" });
    }

    if (!authResult.isAuthenticated) {
      toast.error("You are not logged in.");
      throw redirect({ to: "/" });
    }

    return { user: authResult.user };
  },
  component: Sidebar,
});

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTaxonomy, setSelectedTaxonomy] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");

  // Sample quiz history data
  const quizHistory = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      date: "2024-01-15",
      questions: 25,
      attempts: 143,
      avgScore: 78,
      taxonomy: ["Remember", "Understand", "Apply"],
    },
    {
      id: 2,
      title: "Python Programming Basics",
      date: "2024-01-10",
      questions: 30,
      attempts: 89,
      avgScore: 85,
      taxonomy: ["Apply", "Analyze", "Create"],
    },
    {
      id: 3,
      title: "Data Structures Quiz",
      date: "2024-01-08",
      questions: 20,
      attempts: 67,
      avgScore: 72,
      taxonomy: ["Understand", "Apply", "Analyze"],
    },
  ];

  const menuItems = [
    { name: "Dashboard", icon: Home, href: "#" },
    { name: "Quiz History", icon: History, href: "#" },
    { name: "Analytics", icon: BarChart3, href: "#" },
  ];

  const bloomsTaxonomy = [
    {
      level: "Remember",
      description: "Recall facts and basic concepts",
      color: "bg-red-100 text-red-700",
    },
    {
      level: "Understand",
      description: "Explain ideas or concepts",
      color: "bg-orange-100 text-orange-700",
    },
    {
      level: "Apply",
      description: "Use information in new situations",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      level: "Analyze",
      description: "Draw connections among ideas",
      color: "bg-green-100 text-green-700",
    },
    {
      level: "Evaluate",
      description: "Justify a stand or decision",
      color: "bg-blue-100 text-blue-700",
    },
    {
      level: "Create",
      description: "Produce new or original work",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTaxonomyToggle = (level) => {
    setSelectedTaxonomy((prev) =>
      prev.includes(level)
        ? prev.filter((item) => item !== level)
        : [...prev, level]
    );
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          AI Quiz Generator
        </h2>
        <p className="text-lg text-gray-600">
          Create intelligent quizzes from your content using Bloom's Taxonomy
        </p>
      </div>

      {/* Quiz Creation Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Brain className="mr-2 text-blue-600" size={24} />
          Create New Quiz
        </h3>

        <div className="space-y-6">
          {/* Quiz Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quiz Title
            </label>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="Enter quiz title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Content
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-sm text-gray-600 mb-2">
                  {selectedFile
                    ? selectedFile.name
                    : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, TXT, PPT (Max 10MB)
                </p>
              </label>
            </div>
          </div>

          {/* Bloom's Taxonomy Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select Bloom's Taxonomy Levels
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bloomsTaxonomy.map((item) => (
                <div
                  key={item.level}
                  onClick={() => handleTaxonomyToggle(item.level)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTaxonomy.includes(item.level)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${item.color}`}
                    >
                      {item.level}
                    </span>
                    {selectedTaxonomy.includes(item.level) && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            disabled={
              !selectedFile ||
              selectedTaxonomy.length === 0 ||
              !quizTitle.trim()
            }
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Zap className="mr-2" size={20} />
            Generate Quiz
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Quizzes
            </h3>
            <FileText size={24} className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {quizHistory.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Attempts
            </h3>
            <Users size={24} className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {quizHistory.reduce((sum, quiz) => sum + quiz.attempts, 0)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Avg Score</h3>
            <Trophy size={24} className="text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {Math.round(
              quizHistory.reduce((sum, quiz) => sum + quiz.avgScore, 0) /
                quizHistory.length
            )}
            %
          </p>
        </div>
      </div>
    </div>
  );

  const renderQuizHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quiz History</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus size={20} className="mr-2" />
          New Quiz
        </button>
      </div>

      <div className="grid gap-6">
        {quizHistory.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {quiz.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar size={16} />
                <span>{quiz.date}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <FileText size={16} className="text-blue-600" />
                <span className="text-sm text-gray-600">
                  {quiz.questions} questions
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-green-600" />
                <span className="text-sm text-gray-600">
                  {quiz.attempts} attempts
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy size={16} className="text-yellow-600" />
                <span className="text-sm text-gray-600">
                  {quiz.avgScore}% avg score
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Target size={16} className="text-purple-600" />
                <span className="text-sm text-gray-600">
                  {quiz.taxonomy.length} levels
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {quiz.taxonomy.map((level) => {
                  const taxonomyItem = bloomsTaxonomy.find(
                    (item) => item.level === level
                  );
                  return (
                    <span
                      key={level}
                      className={`px-2 py-1 rounded text-xs font-medium ${taxonomyItem?.color}`}
                    >
                      {level}
                    </span>
                  );
                })}
              </div>
              <button
                onClick={() => setActiveItem("Analytics")}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                View Analytics →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Quiz Analytics</h2>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              Total Questions
            </h3>
            <FileText size={20} className="text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">75</p>
          <p className="text-sm text-green-600 mt-1">+12% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              Completion Rate
            </h3>
            <TrendingUp size={20} className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">87%</p>
          <p className="text-sm text-green-600 mt-1">+5% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Avg Time</h3>
            <Clock size={20} className="text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12m</p>
          <p className="text-sm text-red-600 mt-1">+2m from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
            <Trophy size={20} className="text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">78%</p>
          <p className="text-sm text-green-600 mt-1">+8% from last month</p>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Performance by Bloom's Taxonomy
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {bloomsTaxonomy.map((item, index) => {
              const performance = Math.floor(Math.random() * 30) + 60; // Random performance data
              return (
                <div
                  key={item.level}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${item.color}`}
                    >
                      {item.level}
                    </span>
                    <span className="text-sm text-gray-600">
                      {item.description}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${performance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800 w-10">
                      {performance}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return renderDashboard();
      case "Quiz History":
        return renderQuizHistory();
      case "Analytics":
        return renderAnalytics();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${isOpen ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col border-r border-blue-100`}
      >
        {/* Header */}
        <div className="p-4 border-b border-blue-100">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="text-white" size={20} />
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  Quizzie
                </span>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {isOpen ? (
                <X size={20} className="text-gray-600" />
              ) : (
                <Menu size={20} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Icon
                  size={20}
                  className={`${isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`}
                />
                {isOpen && (
                  <>
                    <span className="ml-3 font-medium">{item.name}</span>
                    {isActive && <ChevronRight size={16} className="ml-auto" />}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-blue-100">
          <div
            className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"}`}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">QA</span>
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  Quiz Admin
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@quizai.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{activeItem}</h1>
              <p className="text-sm text-gray-600">
                {activeItem === "Dashboard" &&
                  "Create intelligent quizzes with AI"}
                {activeItem === "Quiz History" &&
                  "View and manage your created quizzes"}
                {activeItem === "Analytics" &&
                  "Track quiz performance and insights"}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};
