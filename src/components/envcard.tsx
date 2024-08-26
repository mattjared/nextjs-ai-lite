// import { checkAIAvailability } from './actions';

import { checkAIAvailability } from "@/app/actions";

export default async function EnvCard() {
  const result = await checkAIAvailability();
  return (
    <div>
      {/* <h1>hello</h1> */}
    </div>
  );
}
