'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 公司信息 */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mr-2">
                <img src="/logo.jpg" alt="logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold">美橙培训</span>
            </div>
            <p className="text-gray-400 mb-4">
              专注于AI企业培训与数字化转型服务，助力企业实现智能化升级
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <i className="fab fa-weixin text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <i className="fab fa-weibo text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-orange-500 transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="#courses" className="text-gray-400 hover:text-orange-500 transition-colors">
                  课程体系
                </a>
              </li>
              <li>
                <a href="#cases" className="text-gray-400 hover:text-orange-500 transition-colors">
                  客户案例
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-orange-500 transition-colors">
                  关于我
                </a>
              </li>
              <li>
                <a href="#resources" className="text-gray-400 hover:text-orange-500 transition-colors">
                  资源中心
                </a>
              </li>
            </ul>
          </div>
          
          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-bold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <i className="fas fa-envelope mr-2"></i>
                <a href="mailto:contact@example.com" className="hover:text-orange-500 transition-colors">
                  contact@example.com
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-phone mr-2"></i>
                <a href="tel:+8612345678900" className="hover:text-orange-500 transition-colors">
                  +86 123 4567 8900
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>北京市朝阳区xxx大厦</span>
              </li>
            </ul>
          </div>
          
          {/* 订阅资讯 */}
          <div>
            <h3 className="text-lg font-bold mb-4">订阅资讯</h3>
            <p className="text-gray-400 mb-4">
              订阅我们的通讯，获取最新的AI培训资讯和行业动态
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="输入您的邮箱"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                订阅
              </button>
            </form>
          </div>
        </div>
        
        {/* 版权信息 */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 美橙培训. 保留所有权利
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                使用条款
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                网站地图
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 