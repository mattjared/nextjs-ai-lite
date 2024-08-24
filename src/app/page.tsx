'use client';

import { useState } from 'react';
import { Message, continueConversation } from './actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden pb-10">
      <div className="group w-full overflow-auto">
        <div className="bg-white rounded p-10 max-w-xl mx-auto">
          <h1 className="text-lg font-semibold mb-8">Next AI SDK Lite</h1>
          <p>A simplified AI chatbot focused on speed to learning, wins and deployment.</p>
          <p>To edit this chatbot</p>
        </div>
        <div className="max-w-xl">
          {conversation.map((message, index) => (
            <div key={index}>
              {message.role}: {message.content}
              {message.display}
            </div>
          ))}
        </div>
        <div className="fixed inset-x-0 bottom-0 w-full">
          <div className="w-full max-w-lg space-y-4 mx-auto">
            <Input
              type="text"
              value={input}
              onChange={event => {
                setInput(event.target.value);
              }}
              className="w-full"
            />
            <Button
              className="w-full"
              onClick={async () => {
                const { messages } = await continueConversation([
                  ...conversation.map(({ role, content }) => ({ role, content })),
                  { role: 'user', content: input },
                ]);
                setConversation(messages);
                setInput("");
              }}
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
