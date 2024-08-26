'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type CoreMessage } from 'ai';
import { useState } from 'react';
import { continueConversation } from '@/app/actions';
import { readStreamableValue } from 'ai/rsc';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconArrowUp } from '@/components/ui/icons';
import  Link from "next/link";
export const maxDuration = 30;

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState<string>('');
  return (    
    <div className="group w-full overflow-auto">
      {messages.length === 0 && (
        <div className="max-w-xl mx-auto mt-20">
          <Card>
            <CardHeader>
              <CardTitle>Next AI SDK Lite</CardTitle>
              <CardDescription>A no bells or whistles AI starter kit</CardDescription>
            </CardHeader>
            <CardContent>
              <p>A simplified Next.js AI starter kit designed with simplicity and wins in mind.</p>
              <p>See to <Link href="/about" className="underline">about page</Link> for complete documentation</p>
            </CardContent>
          </Card>
          <div className="bg-white rounded-lg max-w-xl mx-auto p-5 mt-10 border">
          <h1 className="text-lg font-semibold mb-8">Next AI SDK Lite</h1>
          <p>A simplified AI chatbot focused on speed to learning, wins and deployment.</p>
          <p>To edit this chatbot</p>
        </div>
        </div>
      )}
      
      {messages.length > 0 && (
        <div className="max-w-xl mx-auto mt-10 mb-24">
          {messages.map((message, index) => (
            <div key={index} className="whitespace-pre-wrap flex mb-5">
              <div className={`${message.role === 'user' ? 'bg-slate-200 ml-auto' : 'bg-transparent'} p-2 rounded-lg`}>
                {message.content as string}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="fixed inset-x-0 bottom-10 w-full ">
        <div className="w-full max-w-xl mx-auto">
          <Card className="p-2">
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
                className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none"
                placeholder='Ask me anything...'
              />
              <Button disabled={!input.trim()}>
                <IconArrowUp />
              </Button>
            </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
