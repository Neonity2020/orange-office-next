export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-orange-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">抱歉，您访问的页面不存在。</p>
      <a href="/" className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
        返回首页
      </a>
    </div>
  );
}
