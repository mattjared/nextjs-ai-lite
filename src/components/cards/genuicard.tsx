import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function GenUICard() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Next AI SDK Lite</CardTitle>
          <CardDescription>Start streaming UI Components!</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground/90 leading-normal prose"> 
          <p className="mb-3">A simple prompt based way to enter into streaming components./</p>
          <p className="mb-3">Try asking for the weather in any American city and see what returns. </p>
          <p className="mb-3">Notice when the component returns you can interact with it! </p>
          <p><Link href="https://github.com/mattjared/nextjs-ai-lite" className="underline">Fork the repo and get hacking</Link> </p>
        </CardContent>
      </Card>
    </div>
  )
}
