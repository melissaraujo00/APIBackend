// import { useState } from "react";
import {
  Book,
  Clock,
  CheckCircle,
  ArrowRight,
  Brain,
  Zap,
  ChevronRight,
  Target,
  Code,
  Database,
  Globe,
} from "lucide-react";
// import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function PersonalizedRoadmapPage() {
  // const [activeModule, setActiveModule] = useState(0);

  const user = {
    name: "Alex Johnson",
    goal: "Full Stack Web Developer",
  };

  const roadmap = {
    title: "Your Personalized Full Stack Web Development Roadmap",
    description:
      "This AI-generated roadmap is tailored to your learning style, current skills, and career goals.",
    estimatedTime: "6 months",
    modules: [
      {
        title: "Foundations of Web Development",
        icon: <Code className="w-6 h-6 text-indigo-600" />,
        color: "bg-indigo-100",
        topics: [
          {
            title: "HTML5 Essentials",
            duration: "2 weeks",
            status: "completed",
          },
          {
            title: "CSS3 and Responsive Design",
            duration: "3 weeks",
            status: "in-progress",
          },
          {
            title: "JavaScript Fundamentals",
            duration: "4 weeks",
            status: "not-started",
          },
        ],
      },
      {
        title: "Front-end Frameworks",
        icon: <Globe className="w-6 h-6 text-blue-600" />,
        color: "bg-blue-100",
        topics: [
          {
            title: "React.js Basics",
            duration: "3 weeks",
            status: "not-started",
          },
          {
            title: "State Management with Redux",
            duration: "2 weeks",
            status: "not-started",
          },
          {
            title: "Building Responsive UIs",
            duration: "2 weeks",
            status: "not-started",
          },
        ],
      },
      {
        title: "Back-end Development",
        icon: <Database className="w-6 h-6 text-green-600" />,
        color: "bg-green-100",
        topics: [
          {
            title: "Node.js and Express.js",
            duration: "3 weeks",
            status: "not-started",
          },
          {
            title: "RESTful API Design",
            duration: "2 weeks",
            status: "not-started",
          },
          {
            title: "Database Management with MongoDB",
            duration: "3 weeks",
            status: "not-started",
          },
        ],
      },
      {
        title: "Full Stack Integration",
        icon: <Target className="w-6 h-6 text-red-600" />,
        color: "bg-red-100",
        topics: [
          {
            title: "Full Stack Project: E-commerce Platform",
            duration: "4 weeks",
            status: "not-started",
          },
          {
            title: "Deployment and DevOps Basics",
            duration: "2 weeks",
            status: "not-started",
          },
          {
            title: "Performance Optimization",
            duration: "2 weeks",
            status: "not-started",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            FutureCode
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              Dashboard
            </Link>
            <Link
              href="/courses"
              className="text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              Courses
            </Link>
            <Link
              href="/profile"
              className="text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header> */}

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {roadmap.title}
              </h1>
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="text-xl text-gray-600 mb-8">{roadmap.description}</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Your Learning Path
                </h2>
                <div className="relative">
                  {roadmap.modules.map((module, index) => (
                    <div key={index} className="mb-8">
                      <div className="flex items-center mb-4">
                        <div
                          className={`w-12 h-12 rounded-full ${module.color} flex items-center justify-center mr-4`}
                        >
                          {module.icon}
                        </div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {module.title}
                        </h3>
                      </div>
                      <div className="ml-6 pl-6 border-l-2 border-gray-200">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="mb-4 relative">
                            <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-white border-2 border-gray-200"></div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center text-sm">
                                {topic.status === "completed" && (
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                )}
                                {topic.status === "in-progress" && (
                                  <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                                )}
                                {topic.status === "not-started" && (
                                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                )}
                                {topic.title}
                              </span>
                              <span className="text-xs text-gray-500">
                                {topic.duration}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Roadmap Overview
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                      <span>Estimated time: {roadmap.estimatedTime}</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Book className="w-5 h-5 mr-2 text-indigo-600" />
                      <span>Total modules: {roadmap.modules.length}</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Brain className="w-5 h-5 mr-2 text-indigo-600" />
                      <span>AI-personalized for: {user.name}</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <ArrowRight className="w-5 h-5 mr-2 text-indigo-600" />
                      <span>Goal: {user.goal}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-600 p-6 rounded-lg shadow-sm text-white">
                  <h2 className="text-xl font-semibold mb-4">
                    Need Assistance?
                  </h2>
                  <p className="mb-4">
                    Our AI tutor is here to help you with any questions or
                    challenges you face during your learning journey.
                  </p>
                  <button className="bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold hover:bg-indigo-100 transition duration-300">
                    Chat with AI Tutor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      {/* <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">FutureCode</h3>
              <p className="mt-2 text-sm text-gray-400">
                Empowering learners with AI-personalized roadmaps
              </p>
            </div>
            <div className="w-full md:w-auto text-center md:text-right">
              <p>&copy; 2024 FutureCode. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
