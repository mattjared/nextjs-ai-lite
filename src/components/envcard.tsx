// import { checkAIAvailability } from './actions';

import { checkAIAvailability } from "@/app/actions";

export default async function EnvCard() {
  // const OPENAIKEY = checkAIAvailability;
  const result = await checkAIAvailability();
  console.log(result);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
