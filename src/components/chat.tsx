'use client';

import {
  Card,
  CardContent,
  CardDescription,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
  }

  const resetChat = () => {
    setMessages([]);
    setInput("");
  }
  return (    
    <div className="group w-full overflow-auto ">
      <div className="max-w-xl mx-auto mt-20">
        <Card >
          <CardHeader>
            <CardTitle>Next AI SDK Lite</CardTitle>
            <CardDescription>A no bells or whistles AI starter kit</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground/90 leading-normal"> 
            <p className="mb-3">A simplified Next.js AI starter kit designed with simplicity and speed in mind.</p>
            <p className="mb-3">Built with Next.js, AI SDK, Tailwind, Shadcn you can build a bare minimum AI Chatbot with extremely low overhead. Based off the popular <Link href="https://chat.vercel.ai/">Next AI Chatbot</Link> as the gold standard the aim for this project is to remove any dependency outside of basic functionality and examples with an emphasis on making changes and customizations to the AI SDK as possible. </p>
            <p className="mb-3 font-semibold">Big Opinions:</p>
            <ul className="flex">
              <li>→ Speed to learning and experimenting AI SDK</li>
              <li>→ Latest and greatest Next.js (App Router, Server Actions, React Server Components)</li>
              <li></li>
            </ul>
            <p>See to <Link href="/about" className="underline">about page</Link> for complete documentation and examples</p>
          </CardContent>
        </Card>
      </div>
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
            <form onSubmit={handleSubmit}>
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
