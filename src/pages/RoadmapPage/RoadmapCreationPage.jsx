import { useState } from "react";
import { Brain, Send, ArrowLeft, Loader, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function RoadmapCreationPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);

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
          { title: "HTML & CSS Fundamentals", duration: "4 weeks" },
          { title: "JavaScript Essentials", duration: "6 weeks" },
          { title: "Front-end Frameworks (React)", duration: "8 weeks" },
          {
            title: "Back-end Development (Node.js & Express)",
            duration: "8 weeks",
          },
          { title: "Database Management (SQL & NoSQL)", duration: "4 weeks" },
          { title: "DevOps & Deployment", duration: "2 weeks" },
        ],
      });
      setIsGenerating(false);
    }, 3000);
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
                  href="/dashboard"
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
            )}
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
