import { useState, useEffect } from "react";
import {
  Book,
  Clock,
  BarChart,
  Award,
  Zap,
  ChevronRight,
  Play,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { useAuth } from "../../../auth/useAuth";

export default function UserDashboard() {
  const { userName } = useAuth();
  const [activeTab, setActiveTab] = useState(1);

  const user = {
    name: "Alex Johnson",
  };

  const courses = [
    {
      id: 1,
      title: "Advanced JavaScript Concepts",
      progress: 60,
      lastAccessed: "2 days ago",
      isAIPersonalized: true,
    },
    {
      id: 2,
      title: "React Native for Beginners",
      progress: 30,
      lastAccessed: "1 week ago",
      isAIPersonalized: true,
    },
    {
      id: 3,
      title: "Python Fundamentals",
      completedDate: "2023-11-15",
      certificate: true,
      isAIPersonalized: false,
    },
  ];

  const recommendations = [
    {
      id: 4,
      title: "Machine Learning Basics",
      description: "Recommended based on your interests in Data Science",
      isAIPersonalized: true,
    },
    {
      id: 5,
      title: "Advanced React Patterns",
      description: "Next step in your React journey",
      isAIPersonalized: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome back, {userName}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Overall Progress
              </h2>
              <BarChart className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: `${user.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                ></div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {user.progress}% of your enrolled courses completed
            </p>
          </div> */}

          {/* <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Learning Streak
              </h2>
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-indigo-600 mb-2">7 days</p>
            <p className="text-gray-600 text-sm">
              Keep it up! You're on a roll!
            </p>
          </div> */}

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Roadmaps Creados
              </h2>
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-indigo-600 mb-2">1</p>
            <p className="text-gray-600 text-sm">Keep learning!</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="flex border-b">
            <button
              className={`flex-1 text-center py-4 ${
                activeTab === 1
                  ? "text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(1)}
            >
              Mis Roadmaps IA
            </button>
            <button
              className={`flex-1 text-center py-4 ${
                activeTab === 2
                  ? "text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(2)}
            >
              Mis cursos
            </button>
          </div>
          <div className="p-6">
            {activeTab === 1 && (
              <div className="space-y-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 rounded-full p-3">
                        <Zap className="w-5 h-5 text-green-600 mr-1" />
                        {/* <CheckCircle className="w-6 h-6 text-green-600" /> */}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Completed on {course.completedDate}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/certificate/${course.id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
                    >
                      Ver RoadMap
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 2 && (
              <div className="space-y-6">
                {recommendations.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 rounded-full p-3">
                        <Book className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Completed on {course.completedDate}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/certificate/${course.id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
                    >
                      Ver curso
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Recommended for You
            </h2>
            <div className="space-y-6">
              {recommendations.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {course.isAIPersonalized && (
                      <div className="flex items-center text-green-600">
                        <Zap className="w-5 h-5 text-green-600 mr-1" />
                        <span className="text-sm font-medium">
                          AI Personalized
                        </span>
                      </div>
                    )}
                    <Link
                      href={`/course/${course.id}`}
                      className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-300"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </main>
      <Footer />
    </div>
  );
}
