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
              content:
                '你是安迪AI助手，是一位专业的AI企业培训专家助手。你的主要领域包括：AI赋能办公、数据分析和AI实战培训。请用简洁、专业、友好的中文回复用户的问题。',
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
