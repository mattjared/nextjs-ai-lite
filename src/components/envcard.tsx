import { checkAIAvailability } from "@/app/actions-utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function EnvCard() {
  const result = await checkAIAvailability();
  return !result && (
    <div className="absolute inset-0 top-3 left-0 right-0 flex items-center justify-center w-md">
      <div className="bg-red-500 text-white rounded shadow-md p-2">
        <AlertTitle className="text-sm font-bold">Heads up!</AlertTitle>
        <AlertDescription className="text-xs flex flex-col">
          <span>You need to add an OPENAI_API_KEY as an environment variable.</span>
          <span>See the .env.example file for an example.</span>
        </AlertDescription>
      </div>
    </div>
  );
}
