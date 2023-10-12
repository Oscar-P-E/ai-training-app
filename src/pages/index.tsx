/* eslint-disable @next/next/no-img-element */
import { SignIn, useUser, UserButton } from "@clerk/nextjs";

import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();

  const { data: exData, isLoading: exIsLoading } =
    api.exercises.getAll.useQuery();

  const { data: mesoData, isLoading: mesoIsLoading } =
    api.mesocycles.getAll.useQuery();

  const { data: workoutData, isLoading: workoutIsLoading } =
    api.workouts.getAll.useQuery();

  if (exIsLoading || mesoIsLoading || workoutIsLoading) {
    return <div>Loading...</div>;
  }

  if (!exData || !mesoData || !workoutData) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="absolute inset-0">
        <div className="flex h-full w-full">
          <main className="scrollbar-hide h-full w-full overflow-auto">
            <div className="relative h-full w-full max-w-screen-lg lg:mx-auto">
              <div className="w-full bg-neutral-900 p-4 drop-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src="http://placehold.co/32x32"
                      alt="gAIns Logo"
                      className="h-8"
                    />
                    <div className="text-xl">gAIns AI Training App</div>
                  </div>
                  <div className="">
                    {!user.isSignedIn && <SignIn />}
                    {!!user.isSignedIn && <UserButton afterSignOutUrl="/" />}
                  </div>
                </div>
              </div>

              <div className="sticky top-0 flex justify-between bg-neutral-950 p-4 text-center">
                {[...mesoData].map(({ meso, owner }) => (
                  <div key={meso.id}>
                    {meso.name} {owner?.id}
                  </div>
                ))}
              </div>

              <div className="flex justify-between bg-neutral-900 p-4 text-center">
                {[...workoutData].map((workouts) => (
                  <div key={workouts.id}>{workouts.name}</div>
                ))}
              </div>

              <div className="p-4">
                {[...exData, ...exData].map((exercises) => (
                  <div key={exercises.id}>{exercises.name}</div>
                ))}
              </div>
              <div className="sticky bottom-0 flex h-12 items-center justify-around border border-b-2 border-neutral-900 bg-neutral-900 p-4">
                <div>One</div>
                <div>Two</div>
                <div>Three</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
