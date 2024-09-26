import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Code,
  Globe,
  Server,
  Layers,
} from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const selectColor = () => {
  const numRandon = Math.floor(Math.random() * 4);

  switch (numRandon) {
    case 0:
      return {
        icon: Code,
        color: "bg-blue-100",
        textColor: "text-blue-600",
      };
    case 1:
      return {
        icon: Code,
        color: "bg-blue-100",
        textColor: "text-blue-600",
      };

    case 2:
      return {
        icon: Globe,
        color: "bg-purple-100",
        textColor: "text-purple-600",
      };

    case 3:
      return {
        icon: Server,
        color: "bg-green-100",
        textColor: "text-green-600",
      };

    case 4:
      return {
        icon: Layers,
        color: "bg-red-100",
        textColor: "text-red-600",
      };
  }
};

const roadmapData = [
  {
    name: "Foundations of Web Development",
    lessons: [
      {
        name: "HTML5 Essentials",
        description: "Learn the basics of HTML5 and semantic markup.",
        videoUrl: "https://example.com/html5-video",
      },
      {
        name: "CSS3 and Responsive Design",
        duration: "3 weeks",
        description: "Master CSS3 and create responsive layouts.",
        videoUrl: "https://example.com/css3-video",
      },
      {
        name: "JavaScript Fundamentals",
        duration: "4 weeks",
        description:
          "Understand core JavaScript concepts and DOM manipulation.",
        videoUrl: "https://example.com/javascript-video",
      },
    ],
  },
  {
    name: "Front-end Frameworks",
    lessons: [
      {
        name: "React.js Basics",
        duration: "3 weeks",
        description:
          "Learn the fundamentals of React and component-based architecture.",
        videoUrl: "https://example.com/react-video",
      },
      {
        name: "State Management with Redux",
        description: "Master global state management using Redux.",
        videoUrl: "https://example.com/redux-video",
      },
      {
        name: "Building Responsive UIs",
        description:
          "Create beautiful and responsive user interfaces with modern CSS frameworks.",
        videoUrl: "https://example.com/responsive-ui-video",
      },
    ],
  },
  {
    name: "Back-end Development",
    lessons: [
      {
        name: "Node.js and Express.js",
        duration: "3 weeks",
        description: "Build server-side applications with Node.js and Express.",
        videoUrl: "https://example.com/nodejs-video",
      },
      {
        name: "RESTful API Design",
        description: "Design and implement RESTful APIs for your applications.",
        videoUrl: "https://example.com/rest-api-video",
      },
      {
        name: "Database Management with MongoDB",
        duration: "3 weeks",
        description: "Learn to work with NoSQL databases using MongoDB.",
        videoUrl: "https://example.com/mongodb-video",
      },
    ],
  },
  {
    name: "Full Stack Integration",
    lessons: [
      {
        name: "Full Stack Project: E-commerce Platform",
        duration: "4 weeks",
        description:
          "Build a complete e-commerce platform integrating all learned technologies.",
        videoUrl: "https://example.com/fullstack-project-video",
      },
      {
        name: "Deployment and DevOps Basics",
        description:
          "Learn to deploy your applications and understand basic DevOps principles.",
        videoUrl: "https://example.com/devops-video",
      },
      {
        name: "Performance Optimization",
        description:
          "Optimize your full stack application for better performance.",
        videoUrl: "https://example.com/optimization-video",
      },
    ],
  },
];

const LessonItem = ({ lesson, colorsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorData = selectColor();

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left rounded-md transition-colors duration-200 ease-in-out hover:bg-slate-300 p-1"
      >
        <div className="flex items-center">
          <colorData.icon className={`w-6 h-6 ${colorsData.textColor} mr-2`} />
          <span className="font-medium">{lesson.name}</span>
        </div>
        <div className="flex items-center">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 ml-7 pl-3 border-l-2 border-gray-200">
          <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
          {/* <a
            href={lesson.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Watch Video Lesson
          </a> */}
          <iframe
            className="w-4/12 aspect-video"
            src={`https://www.youtube.com/embed/CF_lbDaSo48`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

const PersonalizedRoadmap = () => {
  return (
    <div>
      <Header />

      <div className="pt-24">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Your Personalized Full Stack Web Development Roadmap
          </h1>
          <p className="text-gray-600 mb-8">
            This AI-generated roadmap is tailored to your learning style,
            current skills, and career goals.
          </p>
          <h2 className="text-2xl font-semibold mb-6">Your Learning Path</h2>
          <div className="space-y-6">
            {roadmapData.map((section, index) => {
              const colorsData = selectColor();
              return (
                <div
                  key={index}
                  className={`${colorsData.color} rounded-lg p-4`}
                >
                  <div className="flex items-center mb-4">
                    <colorsData.icon
                      className={`w-6 h-6 ${colorsData.textColor} mr-2`}
                    />
                    <h3
                      className={`text-xl font-semibold ${colorsData.textColor}`}
                    >
                      {section.name}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <LessonItem
                        key={lessonIndex}
                        lesson={lesson}
                        colorsData={colorsData}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalizedRoadmap;
