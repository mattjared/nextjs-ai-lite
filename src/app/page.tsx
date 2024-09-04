import Chat from "@/components/chat";
import EnvCard from "@/components/envcard";
import GeoDisplay from "@/components/geoCard";

export default function Home() {
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden pb-10 flex-col">
      <EnvCard /> 
      <GeoDisplay />
      <Chat />
    </div>
  );
}
