'use server';

import { Weather } from '@/components/weather';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableUI } from 'ai/rsc';
import { ReactNode } from 'react';
import { z } from 'zod';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  display?: ReactNode;
}

export async function continueConversation(history: Message[]) {
  const stream = createStreamableUI();

  const { text, toolResults } = await generateText({
    model: openai('gpt-3.5-turbo'),
    system: 'You are a friendly assistant!',
    messages: history,
    tools: {
      showDoge: {
        description: 'Show the price trend for a crypto.',
        parameters: z.object({
          city: z.string().describe('The meme coin to show the price trend.'),
        }),
        execute: async ({ city, unit }) => {
          stream.done(<Weather city={city} unit={unit} />);
          return `Here's the weather for ${city}!`;
        },
      },
    },
  });

  return {
    messages: [
      ...history,
      {
        role: 'assistant' as const,
        content:
          text || toolResults.map(toolResult => toolResult.result).join(),
        display: stream.value,
      },
    ],
  };
}