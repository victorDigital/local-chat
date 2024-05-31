import { createOllama } from 'ollama-ai-provider';
import { z } from 'zod';
import { StreamingTextResponse, streamText, tool } from 'ai';
import type { RequestHandler } from './$types';

const ollama = createOllama({
	baseURL: 'https://llm.voe.dk/api'
});

export const POST = (async ({ request }) => {
	const { messages } = await request.json();

	const result = await streamText({
		model: ollama('llama3'),
		messages: [
			{
				role: 'system',
				content:
					'you are a helpful and useful assistent, you must respond in markdown formatting. when writing math use latex formatting. but not the official latex syntax, this is the corret and required syntax: a normal markdown codeblock but with the lang set to "latex". every message must be a markdown formatted string, and all math must be formatted as described. dont use code blocks for other things than math and code, other things should be formatted as normal markdown. you must also respond in markdown formatting.'
			},
			...messages
		]
	});

	return result.toAIStreamResponse();
}) satisfies RequestHandler;
