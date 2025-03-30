'use client';

import React, { useEffect } from 'react';

const Hero: React.FC = () => {
  useEffect(() => {
    // 在组件挂载后创建粒子
    createParticles();
    
    // 为了避免重复创建粒子，绑定到window大小变化事件
    window.addEventListener('resize', createParticles);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);

  // 创建粒子的函数
  const createParticles = () => {
    // 获取容器
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建粒子
    const particleCount = 250;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // 设置基本样式
      particle.className = 'particle';
      
      // 随机位置
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // 随机大小 (增大粒子尺寸)
      const size = Math.random() * 4 + 2;
      
      // 随机透明度 (提高透明度)
      const opacity = Math.random() * 0.7 + 0.3;
      
      // 设置样式
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity.toString();
      
      // 随机动画延迟和持续时间
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${Math.random() * 20 + 15}s`;
      
      // 添加到容器
      container.appendChild(particle);
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#121926', position: 'relative' }}>
      {/* 粒子容器 - 移至最底层 */}
      <div 
        id="particle-container"
        className="absolute inset-0"
        style={{ overflow: 'hidden', zIndex: 0 }}
      ></div>
      
      {/* 内容区域 */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">智启未来 · 橙就卓越</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">安迪 · AI企业培训专家</h2>
        <p className="text-lg sm:text-xl md:text-2xl text-orange-200 mb-8 md:mb-10">微软Office Master大师 | AI赋能办公体系专家</p>
        
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8 md:mb-12">
          <div className="glass-card rounded-lg p-4 md:p-6 text-white w-full sm:w-64 transition-all duration-300">
            <i className="fas fa-brain text-2xl md:text-3xl mb-2 md:mb-3 text-orange-300"></i>
            <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">AI赋能办公</h3>
            <p className="text-sm md:text-base text-orange-100">将AI技术与办公软件深度融合，提升企业效率</p>
          </div>
          <div className="glass-card rounded-lg p-4 md:p-6 text-white w-full sm:w-64 transition-all duration-300">
            <i className="fas fa-chart-line text-2xl md:text-3xl mb-2 md:mb-3 text-orange-300"></i>
            <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">数据分析</h3>
            <p className="text-sm md:text-base text-orange-100">复杂数据分析技能转化为易于理解的课程内容</p>
          </div>
          <div className="glass-card rounded-lg p-4 md:p-6 text-white w-full sm:w-64 transition-all duration-300">
            <i className="fas fa-user-tie text-2xl md:text-3xl mb-2 md:mb-3 text-orange-300"></i>
            <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">实战培训</h3>
            <p className="text-sm md:text-base text-orange-100">500强企业实战经验，真实场景案例教学</p>
          </div>
        </div>
        
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105">
          预约培训咨询
        </button>
      </div>

      <style jsx global>{`
        .particle {
          position: absolute;
          background-color: #FF6D00;
          border-radius: 50%;
          animation: float 30s linear infinite;
          z-index: 1;
        }
        
        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(20px, -15px); }
          50% { transform: translate(-15px, 10px); }
          75% { transform: translate(15px, 15px); }
          100% { transform: translate(0, 0); }
        }
        
        .glass-card {
          position: relative;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          isolation: isolate;
          z-index: 2;
        }
        
        .glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0.5rem;
          z-index: -1;
        }
        
        .glass-card:hover {
          background-color: rgba(249, 115, 22, 0.2);
          box-shadow: 0 8px 30px 0 rgba(249, 115, 22, 0.3);
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};

export default Hero;
