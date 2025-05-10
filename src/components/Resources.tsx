'use client';

interface Resource {
  id: number;
  title: string;
  description: string;
  icon: string;
  buttonText: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: '《AI赋能办公白皮书》',
    description: '解析AI在办公自动化领域的最新应用趋势与发展前景',
    icon: 'fa-book-open',
    buttonText: '免费下载'
  },
  {
    id: 2,
    title: 'Excel AI工具包',
    description: '体验我为企业开发的Excel AI工具包，包含常用模板与案例',
    icon: 'fa-tools',
    buttonText: '立即试用'
  },
  {
    id: 3,
    title: 'AI办公应用案例',
    description: '观看各行业成功应用AI办公自动化的案例解析',
    icon: 'fa-video',
    buttonText: '观看视频'
  }
];

export default function Resources() {
  return (
    <section id="resources" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">资源中心</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            免费获取最新AI趋势报告、工具和行业洞察
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {resources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                <i className={`fas ${resource.icon} text-white text-6xl`}></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                  {resource.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 id="qrcode" className="text-2xl font-bold mb-4">关注公众号获取更多资源</h3>
              <p className="mb-6">扫描右侧二维码关注&ldquo;智启未来&rdquo;公众号，回复&ldquo;资源包&rdquo;即可获取完整AI办公资源合集，包括：</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-2"></i>
                  <span>《AI赋能办公白皮书》完整版</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-2"></i>
                  <span>Excel AI工具包专业版</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-2"></i>
                  <span>AI办公案例视频全集</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-2"></i>
                  <span>每周更新行业AI应用报告</span>
                </li>
              </ul>
              <button className="bg-white text-amber-500 hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-all duration-300">
                立即关注
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-lg w-48 h-48 flex items-center justify-center mb-4">
                <img src="/images/mc-qrcode.jpg" alt="美橙办公公众号二维码" />
              </div>
              <p className="text-center">扫码关注&ldquo;美橙办公&rdquo;公众号</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">订阅AI办公资讯</h3>
              <p className="text-gray-600 mb-6">每月获取最新的AI办公自动化动态、技术进展与应用案例</p>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="您的姓名"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="电子邮箱"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white">
                    <option>选择您感兴趣的行业</option>
                    <option>金融</option>
                    <option>制造</option>
                    <option>零售</option>
                    <option>医疗</option>
                    <option>教育</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
                >
                  立即订阅
                </button>
              </form>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-amber-100 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-amber-200 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-amber-300 flex items-center justify-center">
                      <i className="fas fa-envelope-open-text text-amber-600 text-4xl"></i>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                  NEW
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 