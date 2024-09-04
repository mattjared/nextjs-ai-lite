// import Chat from "@/components/chat";
'use client';

import ChatGenUI from "@/components/chat-genui";

export default function GenUI() {
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden pb-10 flex-col">
      <ChatGenUI />
    </div>
  );
}
