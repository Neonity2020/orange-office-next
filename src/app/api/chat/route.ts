import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const client = new OpenAI({
  apiKey: process.env.AGNES_API_KEY,
  baseURL: 'https://apihub.agnes-ai.com/v1',
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  if (!process.env.AGNES_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Agnes-2.0-Flash 的流式接口 (stream:true) 服务端会挂起不返回数据,
        // 因此改用非流式调用获取完整回复,再在前端逐块推送以保留打字机体验。
        const completion = await client.chat.completions.create({
          model: 'agnes-2.0-flash',
          messages: [
            {
              role: 'system',
              content: `你是「安迪AI助手」，服务于"美橙办公"(Orange Office)，一家专注于AI企业培训与数字化转型的线上服务机构。请用简洁、专业、友好的中文回复。

【回答原则】
- 只基于下方"业务资料"作答；资料未提及的信息一律回复"这部分我暂不了解，建议关注微信公众号「美橙办公」获取最新信息"，切勿编造电话、价格、地址等具体数据。
- 回答尽量精炼，能用列表就用列表；涉及联系方式或价格时，统一引导到微信公众号或免费咨询。

【业务资料】
品牌：美橙办公(Orange Office)，定位AI企业培训与数字化转型，线上服务。
讲师：安迪，AI企业培训专家，微软Office Master大师级认证，华为/科大讯飞双认证AI应用导师，10年+办公软件自动化与AI应用经验，著有《巧学巧用Excel》系列等。
主营方向：AI赋能办公、数据分析、Prompt工程、PPT设计、自动化流程优化。服务覆盖金融、医疗、零售、制造等行业。

核心课程：
1. Deepseek全场景实战应用系列课程(高级/全员适用)
2. DeepSeek效率加速器(中级/管理层)
3. AI赋能职场办公应用(中级/全员适用)
4. 职场突围，5小时精通DeepSeek(初级/新人必备)
价格说明：课程与咨询服务均根据企业需求定制，建议预约免费咨询获取专属报价。

部分客户案例：华润医疗集团、泰康人寿、中电金信、周六福珠宝等(均实现效率显著提升)。

免费资源：关注公众号可领取《AI赋能办公白皮书》、Excel AI工具包、AI办公案例视频等(回复"资源包"获取)。

【联系方式】(仅公开以下渠道)
- 微信公众号：美橙办公(关注后回复"资源包"可获取免费资源，课程咨询也可通过公众号联系)
注意：不要提供邮箱、电话、个人微信号或其他项目未列出的联系方式。若用户坚持需要这些，建议其通过微信公众号「美橙办公」进一步咨询。`,
            },
            ...messages,
          ],
          stream: false,
          // Agnes-2.0-Flash 是推理模型,会先消耗大量 token 生成思维链
          // (reasoning_content),再输出正式回复 (content)。1024 会被思维链
          // 耗尽导致 content 为空,因此调到 4096 保证正式回复有足够额度。
          max_tokens: 4096,
        });

        const fullContent = completion.choices[0]?.message?.content ?? '';

        // 按句号、问号、换行等自然断点切块,模拟流式输出节奏
        const chunks = fullContent.match(/[^。！？!?\n]+[。！？!?\n]?/g) ?? [fullContent];
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          // 给前端留出渲染时间,呈现打字机效果
          await new Promise((resolve) => setTimeout(resolve, 30));
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '未知错误';
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
