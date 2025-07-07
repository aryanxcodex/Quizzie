// src/routes/index.jsx
import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Upload,
  Zap,
  BookOpen,
  Users,
  ArrowRight,
  Play,
  FileText,
  Brain,
  Sparkles,
  CheckCircle,
  Star,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const QuizzieHomepage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:3000/auth/login/google";
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">Quizzie</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#testimonials"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Reviews
          </a>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <FcGoogle className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 text-center">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Turn Documents into
            <span className="block text-blue-600">Interactive Quizzes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload any document and let AI create engaging quizzes instantly.
            Perfect for educators, trainers, and students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5" />
              Start Creating
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-8 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload Documents",
                desc: "Drop your PDFs, docs, or text files",
                number: "01",
              },
              {
                icon: Brain,
                title: "AI Analysis",
                desc: "Smart extraction of key concepts",
                number: "02",
              },
              {
                icon: Sparkles,
                title: "Generate Quiz",
                desc: "Get ready-to-use questions instantly",
                number: "03",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="text-6xl font-bold text-gray-200 mb-4">
                    {step.number}
                  </div>
                  <step.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
                {index < 2 && (
                  <ArrowRight className="hidden md:block w-8 h-8 text-gray-400 absolute top-1/2 -right-4 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Generate comprehensive quizzes in seconds",
              },
              {
                icon: BookOpen,
                title: "Smart Analysis",
                desc: "AI understands context and creates relevant questions",
              },
              {
                icon: Users,
                title: "Multi-Format",
                desc: "Works with PDFs, Word docs, presentations",
              },
              {
                icon: FileText,
                title: "Customizable",
                desc: "Multiple choice, true/false, short answer",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-8 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            What Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Educator",
                text: "Quizzie transformed how I create assessments. What used to take hours now takes minutes!",
              },
              {
                name: "Marcus Rodriguez",
                role: "Corporate Trainer",
                text: "The AI understands our training materials perfectly. Game-changer for our team.",
              },
              {
                name: "Dr. Emily Watson",
                role: "Professor",
                text: "My students love the variety of questions generated. It's like having a teaching assistant.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-blue-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-blue-600 text-white rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Content?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of educators and trainers who are already using
              Quizzie to create engaging assessments.
            </p>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              Sign in with Google
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Quizzie</span>
          </div>
          <p className="text-gray-500">© 2025 Quizzie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: QuizzieHomepage,
});
