import { checkAIAvailability } from "@/app/actions-utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function EnvCard() {
  const result = await checkAIAvailability();
  return !result && (
    <div className="max-w-xl mx-auto mt-5">
      <Alert className="bg-red-500 text-white">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You need to add an OPENAI_API_KEY as an environment variable. See the .env.example file for an example.
        </AlertDescription>
      </Alert>
    </div>
  );
}