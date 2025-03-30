'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mr-2">
              {/* <i className="fas fa-user-tie"></i> */}
              <img src="/logo.jpg" alt="logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-gray-800">美橙培训</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="nav-link text-gray-700 hover:text-amber-500">
              首页
            </a>
            <a href="#courses" className="nav-link text-gray-700 hover:text-amber-500">
              课程体系
            </a>
            <a href="#cases" className="nav-link text-gray-700 hover:text-amber-500">
              客户案例
            </a>
            <a href="#about" className="nav-link text-gray-700 hover:text-amber-500">
              关于我
            </a>
            <a href="#resources" className="nav-link text-gray-700 hover:text-amber-500">
              资源中心
            </a>
          </div>
          
          <div className="relative">
            <select className="appearance-none bg-gray-100 border border-gray-300 rounded-full py-2 px-4 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option>选择您的行业</option>
              <option>金融</option>
              <option>制造</option>
              <option>零售</option>
              <option>医疗</option>
              <option>教育</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a 
                href="#home"
                className="text-gray-700 hover:text-amber-500"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </a>
              <a 
                href="#courses"
                className="text-gray-700 hover:text-amber-500"
                onClick={() => setIsMenuOpen(false)}
              >
                课程体系
              </a>
              <a 
                href="#cases"
                className="text-gray-700 hover:text-amber-500"
                onClick={() => setIsMenuOpen(false)}
              >
                客户案例
              </a>
              <a 
                href="#about"
                className="text-gray-700 hover:text-amber-500"
                onClick={() => setIsMenuOpen(false)}
              >
                关于我
              </a>
              <a 
                href="#resources"
                className="text-gray-700 hover:text-amber-500"
                onClick={() => setIsMenuOpen(false)}
              >
                资源中心
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 