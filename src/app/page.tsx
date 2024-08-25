'use client';

import { type CoreMessage } from 'ai';
import { useState } from 'react';
import { continueConversation } from './actions';
import { readStreamableValue } from 'ai/rsc';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconArrowUp } from '@/components/ui/icons';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState<string>('');

  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden pb-10">
      <div className="group w-full overflow-auto">
        <div className="bg-white rounded p-10 max-w-xl mx-auto">
          <h1 className="text-lg font-semibold mb-8">Next AI SDK Lite</h1>
          <p>A simplified AI chatbot focused on speed to learning, wins and deployment.</p>
          <p>To edit this chatbot</p>
        </div>
        <div className="max-w-xl mx-auto">
          {messages.map((message, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {message.role === 'user' ? 'User: ' : 'Bot: '}
              {message.content as string}
            </div>
          ))}
        </div>
        <div className="fixed inset-x-0 bottom-0 w-full">
          <div className="w-full max-w-lg space-y-4 mx-auto">
            <form
              onSubmit={async e => {
                e.preventDefault();
                const newMessages: CoreMessage[] = [
                  ...messages,
                  { content: input, role: 'user' },
                ];

                setMessages(newMessages);
                setInput('');

                const result = await continueConversation(newMessages);

                for await (const content of readStreamableValue(result)) {
                  setMessages([
                    ...newMessages,
                    {
                      role: 'assistant',
                      content: content as string, 
                    },
                  ]);
                }
              }}
            >
            <div className="flex">
              <Input
                type="text"
                value={input}
                onChange={event => {
                  setInput(event.target.value);
                }}
                className="w-full"
              />
              <Button>
                <IconArrowUp />
              </Button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
