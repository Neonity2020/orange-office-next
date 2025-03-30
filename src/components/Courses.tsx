'use client';

import { useState } from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  audience: string;
  coverImage: string;
  icon: string;
}

const initialCourses: Course[] = [
  {
    id: 1,
    title: 'Deepseek全场景实战应用系列课程',
    description: '全面掌握Deepseek在各业务场景中的实战应用技巧',
    level: '高级',
    audience: '全员适用',
    coverImage: '/images/courses-covers/1.webp',
    icon: 'fa-robot'
  },
  {
    id: 2,
    title: 'DeepSeek效率加速器',
    description: '利用Deepseek大幅提升工作效率的实战技巧',
    level: '中级',
    audience: '管理层',
    coverImage: '/images/courses-covers/2.webp',
    icon: 'fa-bolt'
  },
  {
    id: 3,
    title: 'AI赋能职场办公应用',
    description: 'AI技术在办公场景中的全方位应用实践',
    level: '中级',
    audience: '全员适用',
    coverImage: '/images/courses-covers/3.webp',
    icon: 'fa-laptop-code'
  },
  {
    id: 4,
    title: '职场突围，5小时精通DeepSeek',
    description: '快速掌握DeepSeek核心功能的速成课程',
    level: '初级',
    audience: '新人必备',
    coverImage: '/images/courses-covers/4.webp',
    icon: 'fa-graduation-cap'
  }
];

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.title && newCourse.description) {
      const course: Course = {
        id: courses.length + 1,
        title: newCourse.title,
        description: newCourse.description,
        level: newCourse.level || '中级',
        audience: newCourse.audience || '全员适用',
        coverImage: '/images/courses-covers/4.2.webp',
        icon: 'fa-plus-circle'
      };
      setCourses([...courses, course]);
      setIsModalOpen(false);
      setNewCourse({});
    }
  };

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI赋能企业课程体系</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            根据企业不同岗位需求设计的模块化课程，助力企业快速实现AI转型
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div 
                className="course-cover h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${course.coverImage})` }}
              >
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <i className={`fas ${course.icon} text-white text-6xl`}></i>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    <i className="fas fa-users mr-1"></i>
                    {course.audience}
                  </span>
                  <button className="text-orange-500 hover:text-orange-700 text-sm font-medium">
                    查看详情 <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
          >
            添加新课程 <i className="fas fa-plus ml-2"></i>
          </button>
          <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">
            查看全部课程 <i className="fas fa-arrow-down ml-2"></i>
          </button>
        </div>
      </div>

      {/* 添加课程模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <h3 className="text-xl font-bold mb-4">添加新课程</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">课程名称</label>
                <input
                  type="text"
                  value={newCourse.title || ''}
                  onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">课程描述</label>
                <textarea
                  value={newCourse.description || ''}
                  onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">课程难度</label>
                <select
                  value={newCourse.level || '中级'}
                  onChange={e => setNewCourse({ ...newCourse, level: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="初级">初级</option>
                  <option value="中级">中级</option>
                  <option value="高级">高级</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">适用人群</label>
                <input
                  type="text"
                  value={newCourse.audience || '全员适用'}
                  onChange={e => setNewCourse({ ...newCourse, audience: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
              >
                添加课程
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
} 