import { useState } from "react";
import {
  Send,
  ArrowLeft,
  Loader,
  Download,
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
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../auth/useAuth";

export default function RoadmapCreationPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);
  const { userId, userName, userEmail, userRole, loading } = useAuth();

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

  const user = {
    name: "Alex Johnson",
    goal: "Full Stack Web Developer",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    // Here you would typically send the prompt to your AI service and get the response
    // For this example, we'll simulate a delay and then set a mock roadmap
    setTimeout(() => {
      setGeneratedRoadmap({
        title: "Full Stack Web Development Roadmap",
        description:
          "A comprehensive learning path for becoming a full stack web developer.",
        steps: [
          { title: "HTML & CSS Fundamentals", duration: "" },
          { title: "JavaScript Essentials", duration: "" },
          { title: "Front-end Frameworks (React)", duration: "" },
          {
            title: "Back-end Development (Node.js & Express)",
            duration: "",
          },
          { title: "Database Management (SQL & NoSQL)", duration: "" },
          { title: "DevOps & Deployment", duration: "" },
        ],
      });
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-28 ">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                AI Roadmap Creation
              </h1>
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="text-gray-600 mb-6">
              Describe your learning goals, and our AI will generate a
              personalized learning roadmap for you.
            </p>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Learning Goal
                </label>
                <textarea
                  id="prompt"
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. I want to become a full stack web developer in 6 months, focusing on JavaScript technologies."
                  required
                />
              </div>
              <div className="flex justify-between">
                <Link
                  to={userRole == 3 ? "/admin" : "/dashboard"}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Dashboard
                </Link>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Generate Roadmap
                    </>
                  )}
                </button>
              </div>
            </form>

            {generatedRoadmap && (
              <div className="mt-8 border-t pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {roadmap.title}
                  </h2>
                  <Brain className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-gray-600 mb-6">{roadmap.description}</p>

                <div className="">
                  <div className="md:col-span-2">
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500  pl-3 w-1/3 mb-3"
                      >
                        <Save className="h-5 w-5 mr-2" />
                        Save Roadmap
                      </button>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                      Your Learning Path
                    </h2>
                    <div className="relative">
                      {roadmap.modules.map((module, index) => (
                        <div key={index} className=" border-t pt-3">
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
                                  <span className="flex  text-sm flex-col">
                                    <div className=" flex items-center ">
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
                                    </div>
                                    <iframe
                                      className="iframe-youtube drop-shadow"
                                      src={`https://www.youtube.com/embed/`}
                                      title="YouTube video player"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      referrerPolicy="strict-origin-when-cross-origin"
                                      allowFullScreen
                                    ></iframe>
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
                </div>
              </div>
            )}

            {/* {generatedRoadmap && (
              <div className="mt-8 border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {generatedRoadmap.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {generatedRoadmap.description}
                </p>
                <ul className="space-y-4">
                  {generatedRoadmap.steps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <span className="text-indigo-600 font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500">{step.duration}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Roadmap
                  </button>
                </div>
              </div>
            )} */}
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
                Empowering learners with AI-generated personalized roadmaps
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
