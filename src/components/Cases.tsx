'use client';

interface Case {
  id: number;
  company: string;
  logo: string;
  title: string;
  subtitle: string;
  metrics: {
    text: string;
    value: string;
  }[];
}

interface Testimonial {
  id: number;
  content: string;
  author: string;
}

const cases: Case[] = [
  {
    id: 1,
    company: '华润医疗集团',
    logo: '/images/clients/hua-run-logo.webp',
    title: '华润医疗集团',
    subtitle: 'AIGC训练营 | 健康产业营销方案',
    metrics: [
      { text: '营销方案产出效率', value: '+45%' },
      { text: '数据分析时间', value: '-30%' }
    ]
  },
  {
    id: 2,
    company: '泰康人寿保险集团',
    logo: '/images/clients/泰康.png',
    title: '泰康人寿保险集团',
    subtitle: 'AIGC训练营 | Deepseek应用技能',
    metrics: [
      { text: '客户响应率', value: '+35%' },
      { text: '方案制作时间', value: '-25%' }
    ]
  },
  {
    id: 3,
    company: '中电金信',
    logo: '/images/clients/zhong-jin.jpg',
    title: '中电金信',
    subtitle: 'AIGC训练营 | AI+办公领域应用',
    metrics: [
      { text: '办公效率提升', value: '+40%' },
      { text: '人力投入', value: '-50%' }
    ]
  },
  {
    id: 4,
    company: '周六福珠宝',
    logo: '/images/clients/周六福.png',
    title: '周六福珠宝',
    subtitle: '数据分析训练营 | 客户数据分析',
    metrics: [
      { text: '客户转化率', value: '+30%' },
      { text: '营销成本', value: '-20%' }
    ]
  }
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: '安迪老师的AI培训课程与我们业务场景结合紧密，团队3个月内实现了从基础工具使用到核心业务场景落地的跨越，销售数据分析效率提升超预期。',
    author: '某医疗集团数字化负责人'
  },
  {
    id: 2,
    content: '《AI+供应链优化》课程不仅帮助我们建立了系统化分析框架，参训员工还自发开发了多个自动化工具包，这在传统培训中很少见。',
    author: '零售企业运营总监'
  },
  {
    id: 3,
    content: '与其他AI课程不同，这里没有华而不实的技术堆砌，Excel+AI的解决方案直接解决了我们80%的日常分析需求。',
    author: '金融机构数据分析主管'
  }
];

const trainingPhotos = [
  '/images/training-photos/1.jpg',
  '/images/training-photos/2.jpg',
  '/images/training-photos/3.jpg',
  '/images/training-photos/4.jpg'
];

export default function Cases() {
  return (
    <section id="cases" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">服务客户案例</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            已为多家世界500强企业及行业领军企业提供AI应用培训与咨询服务
          </p>
        </div>
        
        <div className="mb-12">
          <div className="flex overflow-x-auto pb-6 space-x-6">
            {cases.map(caseItem => (
              <div key={caseItem.id} className="flex-none w-64">
                <div className="bg-gray-50 rounded-xl p-6 h-full">
                  <div className="h-16 mb-4 flex items-center justify-center">
                    <img src={caseItem.logo} alt={caseItem.company} className="max-h-full" />
                  </div>
                  <h3 className="font-bold mb-2">{caseItem.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{caseItem.subtitle}</p>
                  <div className="bg-amber-50 rounded-lg p-3">
                    {caseItem.metrics.map((metric, index) => (
                      <p key={index} className="text-amber-800 text-sm">
                        <span className="font-bold">{metric.value}</span> {metric.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h3 className="text-xl font-bold mb-6">客户评价</h3>
          <div className="space-y-4">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 italic mb-2">&ldquo;{testimonial.content}&rdquo;</p>
                <p className="text-amber-500 font-medium">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-12">
          <h3 className="text-xl font-bold mb-4">培训现场照片</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {trainingPhotos.map((photo, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm h-40">
                <img src={photo} className="w-full h-full object-cover" alt={`培训现场照片 ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <button className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">
            查看更多案例 <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
} 