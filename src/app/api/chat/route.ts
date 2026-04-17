import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const client = new OpenAI({
  apiKey: process.env.SILICONFLOW_API_KEY,
  baseURL: 'https://api.siliconflow.cn/v1',
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  if (!process.env.SILICONFLOW_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await client.chat.completions.create({
          model: 'Qwen/Qwen3-8B',
          messages: [
            {
              role: 'system',
              content:
                '你是安迪AI助手，是一位专业的AI企业培训专家助手。你的主要领域包括：AI赋能办公、数据分析和AI实战培训。请用简洁、专业、友好的中文回复用户的问题。',
            },
            ...messages,
          ],
          stream: true,
          max_tokens: 1024,
        });

        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`));
          }
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
