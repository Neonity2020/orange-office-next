'use client';

interface Book {
  id: number;
  title: string;
  publisher: string;
  coverImage: string;
}

interface Certificate {
  id: number;
  title: string;
  image: string;
}

const books: Book[] = [
  {
    id: 1,
    title: '《巧学巧用excel：迅速提升职场效率的关键技能》',
    publisher: '北京大学出版社',
    coverImage: '/images/books/巧学巧用PNG.png'
  },
  {
    id: 2,
    title: '《巧学巧用Excel函数：掌握核心技能，秒变数据分析高手》',
    publisher: '北京大学出版社',
    coverImage: '/images/books/巧学巧用函数PNG.png'
  },
  {
    id: 3,
    title: '《Excel数据可视化分析实战》',
    publisher: '电子工业出版社',
    coverImage: '/images/books/数据分析PNG.png'
  },
];

const certificates: Certificate[] = [
  {
    id: 1,
    title: '微软Office Master大师级认证',
    image: '/images/certificates/master证书.jpeg'
  },
  {
    id: 2,
    title: '华为AI应用导师认证',
    image: '/images/certificates/【华为】搜索与人工智能.png'
  },
  {
    id: 3,
    title: '科大讯飞AI培训专家',
    image: '/images/certificates/AI Prompt 工程师认证.png'
  },
  {
    id: 4,
    title: '国家健康管理师',
    image: '/images/certificates/健康管理师.png'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">关于安迪</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            资深的AI企业培训专家，拥有超过10年的办公软件自动化管理及AI技术应用经验
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-6">专业资历</h3>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-start mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <i className="fas fa-award text-orange-500"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-2">微软国际认证Office Master大师级专家</h4>
                  <p className="text-gray-700">Excel/Word/PowerPoint/Outlook专家级认证</p>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <i className="fas fa-certificate text-orange-500"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-2">华为/科大讯飞双认证人工智能应用导师</h4>
                  <p className="text-gray-700">企业AI应用与培训专家认证</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <i className="fas fa-user-graduate text-orange-500"></i>
                </div>
                <div>
                  <h4 className="font-bold mb-2">国家三级健康管理师/营养师</h4>
                  <p className="text-gray-700">医疗健康领域专业资质</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">工作经历</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <h4 className="font-bold text-lg">2023年至今</h4>
                  <p className="text-gray-600">AI+行业解决方案首席架构师</p>
                </div>
                <div className="timeline-item">
                  <h4 className="font-bold text-lg">2021-2023年</h4>
                  <p className="text-gray-600">多家全球500强企业特聘转型总教练</p>
                </div>
                <div className="timeline-item">
                  <h4 className="font-bold text-lg">2019-2021年</h4>
                  <p className="text-gray-600">金融集团智能决策中台项目经理</p>
                </div>
                <div className="timeline-item">
                  <h4 className="font-bold text-lg">2015-2019年</h4>
                  <p className="text-gray-600">全球TOP5医疗集团智慧医疗创新中心负责人</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="profile-photo-container h-[500px] bg-gray-100 flex items-center justify-center overflow-hidden relative">
                <img 
                  src="/images/IP.jpg"
                  alt="安迪老师照片"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">讲师简介</h3>
                <p className="text-gray-600 mb-4">
                  安迪老师是资深的AI企业培训专家，拥有超过10年的办公软件自动化管理及AI技术应用经验。作为微软国际认证的Office Master大师级专家，她专注于将人工智能技术与办公软件深度融合，为企业提供高效的数据管理与智能化解决方案。
                </p>
                <p className="text-gray-600 mb-4">
                  安迪老师在AI领域具备深厚的理论基础与实践经验，尤其在AI赋能办公体系、Prompt工程、数据分析、PPT设计与自动化流程优化方面表现突出。她曾为多家世界500强企业及行业领军企业提供AI应用培训与咨询服务，涵盖金融、医疗、零售、制造等多个领域，帮助企业实现数字化转型与智能化升级。
                </p>
                <p className="text-gray-600">
                  安迪老师还致力于将AI技术应用于医疗健康领域，推动智慧医疗与健康管理的数据化、智能化发展。她的课程设计以实战为导向，结合企业真实场景，帮助学员快速掌握AI工具的应用技能，并将其转化为实际生产力。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold">出版书籍</h4>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {books.map(book => (
              <div key={book.id} className="flex flex-col items-center text-center min-w-[160px]">
                <div className="w-32 h-40 bg-gray-100 mb-2 rounded-lg overflow-hidden">
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-700">{book.title}</p>
                <p className="text-xs text-gray-500">{book.publisher}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">荣誉与资质证书</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certificates.map(certificate => (
              <div key={certificate.id} className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                <div className="w-32 h-40 bg-gray-100 mb-2 rounded-lg overflow-hidden">
                  <img 
                    src={certificate.image} 
                    alt={certificate.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-700 text-center">{certificate.title}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">准备好开启AI转型之旅了吗？</h3>
              <p className="mb-6">我将为您提供免费咨询，量身定制适合您企业的AI培训方案</p>
              <button className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-all duration-300">
                立即预约咨询
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <i className="fas fa-robot text-orange-500 text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 