// import Chat from "@/components/chat";
import ChatGenUI from "@/components/chat-genui";
import EnvCard from "@/components/envcard";

export default function GenUI() {
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden pb-10 flex-col">
      <EnvCard /> 
      <ChatGenUI />
    </div>
  );
}
