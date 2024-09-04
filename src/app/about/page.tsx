import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import  Link from "next/link";

export default function About() {
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden pb-10">
      <div className="group w-full overflow-auto">
        <div className="max-w-xl mx-auto">
            <Card className="mt-20">
              <CardHeader>
                <CardTitle>Next AI SDK Lite</CardTitle>
                <CardDescription>A no bells or whistles AI starter kit</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-normal"> 
                <p className="mb-3">A simplified Next.js AI starter kit designed with simplicity and speed in mind.</p>
                <p className="mb-3">Built with Next.js, AI SDK, Tailwind, Shadcn you can build a bare minimum AI Chatbot with extremely low overhead. Based off the popular <Link href="https://chat.vercel.ai/">Next AI Chatbot</Link> as the gold standard the aim for this project is to remove any dependency outside of basic functionality and examples with an emphasis on making changes and customizations to the AI SDK as possible. </p>
                <p className="mb-3 font-semibold">Quick start guide:</p>
                <ul className="flex">
                  <li><pre className="bg-slate-200 p-1 rounded">git clone https://github.com/mattjared/nextjs-ai-lite</pre></li>
                </ul>
                <p>See to <Link href="/about" className="underline">about page</Link> for complete documentation and examples</p>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}