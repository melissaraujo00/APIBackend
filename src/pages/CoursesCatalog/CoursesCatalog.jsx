import { useState } from "react";
import {
  Search,
  Filter,
  Book,
  Clock,
  Star,
  Users,
  Zap,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function CoursesCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "DevOps",
  ];

  const courses = [
    {
      id: 1,
      title: "Advanced JavaScript Concepts",
      description:
        "Master complex JavaScript topics with AI-powered personalized learning.",
      category: "Web Development",
      level: "Advanced",
      duration: "40 hours",
      rating: 4.8,
      students: 1500,
      isAIPersonalized: true,
    },
    {
      id: 2,
      title: "React Native for Beginners",
      description:
        "Build your first mobile app with React Native and personalized guidance.",
      category: "Mobile Development",
      level: "Beginner",
      duration: "30 hours",
      rating: 4.6,
      students: 1200,
      isAIPersonalized: true,
    },
    {
      id: 3,
      title: "Python for Data Science",
      description: "Learn Python fundamentals and data analysis techniques.",
      category: "Data Science",
      level: "Intermediate",
      duration: "50 hours",
      rating: 4.9,
      students: 2000,
      isAIPersonalized: false,
    },
    // Add more courses as needed
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            FutureCode
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              Home
            </Link>
            <Link href="#" className="text-indigo-600 font-semibold">
              Courses
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              AI Personalization
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              About
            </Link>
          </nav>
          <Link
            href="/dashboard"
            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 hidden md:block"
          >
            My Dashboard
          </Link>
        </div>
      </header> */}
      <Header/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Explore Our Courses
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="relative mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 w-full md:w-80 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors">
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-indigo-600">
                    {course.category}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.students}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/course/${course.id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-300"
                  >
                    View Course
                  </Link>
                  {course.isAIPersonalized && (
                    <div className="flex items-center text-green-600">
                      <Zap className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">
                        AI Personalized
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer/>
      {/* <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">FutureCode</h3>
              <p className="mt-2 text-sm text-gray-400">
                Empowering developers with AI-enhanced learning
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
