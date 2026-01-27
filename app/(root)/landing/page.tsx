"use client"

import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-gray-900">Partner AI</div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
            How it Works
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Master Any Interview with
          <span className="text-emerald-600"> AI-Powered</span> Practice
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Get personalized feedback, practice with realistic scenarios, and build confidence 
          for technical and non-technical interviews across all industries.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link href="/select-interview">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg">
              Start Practicing Free
            </Button>
          </Link>
          <Button variant="outline" className="border-gray-300 text-gray-700 px-8 py-4 text-lg font-semibold rounded-lg">
            Watch Demo
          </Button>
        </div>

        {/* Hero Image/Video Placeholder */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">AI Interviewer</div>
                <div className="text-sm text-gray-500">Ready to begin your practice session</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <p className="text-gray-700">
                "Hello! I'm your AI interviewer. I'll help you practice for your dream job with 
                personalized questions and real-time feedback. Ready to get started?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to interview success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload & Analyze</h3>
              <p className="text-gray-600">
                Upload your resume and let our AI analyze your background to suggest 
                the perfect interview type and difficulty level.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Practice & Learn</h3>
              <p className="text-gray-600">
                Engage in realistic interview scenarios with our AI interviewer. 
                Practice both technical and behavioral questions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Feedback</h3>
              <p className="text-gray-600">
                Receive detailed feedback on your performance and personalized 
                suggestions to improve your interview skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to ace your next interview</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-600">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">Smart resume analysis and personalized interview recommendations</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-600">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry-Specific</h3>
              <p className="text-gray-600">Practice for tech, finance, healthcare, and more industries</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-600">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Feedback</h3>
              <p className="text-gray-600">Get scored feedback and improvement suggestions</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-600">🎤</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Practice</h3>
              <p className="text-gray-600">Practice speaking with our AI interviewer for realistic experience</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-600">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your improvement over time with detailed analytics</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-emerald-600">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Enhancement</h3>
              <p className="text-gray-600">Get suggestions to improve your resume and stand out</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that works for you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <div className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg text-gray-500">/month</span></div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-emerald-600 mr-3">✓</span>
                  3 practice interviews per month
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-emerald-600 mr-3">✓</span>
                  Basic feedback and scoring
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-emerald-600 mr-3">✓</span>
                  Resume analysis
                </li>
              </ul>
              
              <Button variant="outline" className="w-full border-gray-300 text-gray-700">
                Get Started Free
              </Button>
            </div>

            <div className="bg-emerald-600 p-8 rounded-2xl text-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-emerald-100 mb-6">For serious job seekers</p>
              <div className="text-4xl font-bold mb-6">$19<span className="text-lg text-emerald-200">/month</span></div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-emerald-200 mr-3">✓</span>
                  Unlimited practice interviews
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-200 mr-3">✓</span>
                  Advanced AI feedback & analytics
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-200 mr-3">✓</span>
                  Industry-specific questions
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-200 mr-3">✓</span>
                  Resume enhancement suggestions
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-200 mr-3">✓</span>
                  Priority support
                </li>
              </ul>
              
              <Button className="w-full bg-white text-emerald-600 hover:bg-gray-100">
                Start Pro Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">Partner AI</div>
          <p className="text-gray-400 mb-8">Master any interview with AI-powered practice</p>
          
          <div className="flex justify-center space-x-8 text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;