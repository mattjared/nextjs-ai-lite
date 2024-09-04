'use client';

import { useState } from 'react';
import { continueConversation, Message } from '@/app/actions-genui';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { IconArrowUp } from './ui/icons';
import GenUICard from './genuicard';

export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  return (
    <div className="group w-full overflow-auto">
      <div className="max-w-xl mx-auto mt-10 mb-24">
        {conversation.length <=0 && (
          <GenUICard />
        )}
        {conversation.map((message, index) => (
          <div key={index} className="whitespace-pre-wrap flex mb-5">
            <div className={`${message.role === 'user' ? 'bg-slate-200 ml-auto' : 'bg-transparent'} p-2 rounded-lg`}>
              {message.content as string}
              {message.display}
            </div>
          </div>
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-10 w-full ">
        <div className="w-full max-w-xl mx-auto">
          <Card className="p-2">
            <div className="flex">
              <Input
                type="text"
                value={input}
                onChange={event => {
                  setInput(event.target.value);
                }}
                className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none"
                placeholder='Ask me anything...'
              />
              <Button
                onClick={async () => {
                  const { messages } = await continueConversation([
                    // exclude React components from being sent back to the server:
                    ...conversation.map(({ role, content }) => ({ role, content })),
                    { role: 'user', content: input },
                  ]);
                  setInput("")
                  setConversation(messages);
                }}
                disabled={!input.trim()}
              >
                <IconArrowUp />
              </Button> 
            </div>
          </Card>
        </div>
        
      </div>
    </div>
  );
}