'use client';

import { useState } from 'react';
import { streamComponent } from '../actions';
export const maxDuration = 30;

export default function Example() {
  const [component, setComponent] = useState<React.ReactNode>();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <form
        onSubmit={async e => {
          e.preventDefault();
          setComponent(await streamComponent());
        }}
      >
        <button className="bg-red-300">Click to Stream Component</button>
      </form>
      <div>{component}</div>
    </div>
  );
}