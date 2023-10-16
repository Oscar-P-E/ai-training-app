/* eslint-disable @next/next/no-img-element */
import { SignIn, useUser, UserButton } from "@clerk/nextjs";
// import {
//   User,
//   Mesocycle,
//   Microcycle,
//   Workout,
//   Exercise,
// } from "@prisma/client";

import { api } from "~/utils/api";

// const createWizard = () => {
//   const { user } = useUser();
//   if (!user) return null;

//   return (
//     <div>
//       <img src={user.imageUrl} alt="" />
//     </div>
//   );
// };

export default function Home() {
  const user = useUser();

  const { data: mesoData, isLoading: mesoIsLoading } =
    api.mesocycles.getAll.useQuery();

  const { data: microData, isLoading: microIsLoading } =
    api.microcycles.getAll.useQuery();

  const { data: workoutData, isLoading: workoutIsLoading } =
    api.workouts.getAll.useQuery();

  const { data: exData, isLoading: exIsLoading } =
    api.exercises.getAll.useQuery();

  if (exIsLoading || mesoIsLoading || workoutIsLoading || microIsLoading) {
    return <div>Loading...</div>;
  }

  if (!exData || !mesoData || !workoutData || !microData || !user.user) {
    return <div>Error loading data</div>;
  }

  const getCurrUserMesos = () => {
    return mesoData.filter(({ meso }) => meso.userId === user.user.id);
  };

  const getCurrMeso = () => {
    return getCurrUserMesos()[0]?.meso; // todo
  };

  const getCurrMesoMicros = () => {
    return microData.filter(
      ({ micro }) => micro.mesocycleId === getCurrMeso()?.id,
    );
  };

  const getCurrMicro = () => {
    return getCurrMesoMicros()[0]?.micro; // todo
  };

  const getCurrMicroWorkouts = () => {
    return workoutData.filter(
      ({ workout }) => workout.microcycleId === getCurrMicro()?.id,
    );
  };

  const getCurrWorkout = () => {
    const currMicro = getCurrMicro();
    if (currMicro && currMicro.workouts.length > 0) {
      return currMicro.workouts[0];
    }
    return undefined;
  };

  const getCurrWorkoutExercises = () => {
    const currWorkout = getCurrWorkout();
    if (currWorkout) {
      return exData.filter(({ exercise }) =>
        exercise.workouts.includes(currWorkout),
      );
    }
    return undefined;
  };

  return (
    <>
      <div className="absolute inset-0">
        <div className="flex h-full w-full">
          <main className="scrollbar-hide h-full w-full overflow-auto">
            <div className="relative h-full w-full max-w-screen-lg lg:mx-auto">
              <div className="w-full p-4">
                <div className="flex items-center justify-between">
                  {/* <div className="w-8"></div> */}
                  {/* <div className="flex items-center gap-4"> */}
                  {/* <img
                      src="http://placehold.co/32x32"
                      alt="gAIns Logo"
                      className="h-8 w-8"
                    /> */}
                  <div className="text-sm font-bold">gAIns AI Training App</div>
                  {/* </div> */}
                  <div className="bg-primary h-8 w-8 rounded-full">
                    {!user.isSignedIn && <SignIn />}
                    {!!user.isSignedIn && <UserButton afterSignOutUrl="/" />}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="card border-neutral flex flex-col items-center border-y font-bold">
                  <div key={getCurrMeso()?.id} className="text-lg">
                    {/* todo: only get mesos for current user */}
                    {/* {meso.userId === "clnkb640c00001y7htytliavl" && meso.name} */}
                    {getCurrMeso()?.name}
                  </div>

                  <div className="flex gap-2 pt-1 text-sm">
                    Week 1 Day 1<span>•</span>
                    <div key={getCurrWorkout()?.id}>
                      {getCurrWorkout()?.name}
                    </div>
                  </div>
                </div>

                {/* <div className="card bg-secondary flex justify-between text-center">
                  {[...workoutData].map((workouts) => (
                    <div key={workouts.id}>{workouts.name}</div>
                  ))}
                </div> */}

                {getCurrWorkoutExercises()?.map(({ exercise }) => (
                  <div key={exercise.id} className="card flex flex-col gap-4">
                    <div className="font-bold">{exercise.name}</div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>Weight</div>
                      <div>Reps</div>
                      <div>RIR</div>
                      <div></div>
                      <select
                        id="weight"
                        name="weight"
                        defaultValue="blank"
                        className="h-6"
                      >
                        <option key={"blank"} value={"blank"}>
                          -
                        </option>
                        {Array.from({ length: 27.5 / 2.5 }, (_, i) => (
                          <option
                            key={(i + 1) * 2.5 + 2.5}
                            value={(i + 1) * 2.5 + 2.5}
                          >
                            {(i + 1) * 2.5 + 2.5}
                          </option>
                        ))}
                        {Array.from({ length: (1110 - 30) / 5 }, (_, i) => (
                          <option
                            key={(i + 1) * 5 + 30}
                            value={(i + 1) * 5 + 30}
                          >
                            {(i + 1) * 5 + 30}
                          </option>
                        ))}
                      </select>
                      <select
                        id="reps"
                        name="reps"
                        defaultValue="blank"
                        className="h-6"
                      >
                        <option key={"blank"} value={"blank"}>
                          -
                        </option>

                        {Array.from({ length: 200 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        id="rir"
                        name="rir"
                        defaultValue="blank"
                        className="h-6"
                      >
                        <option key={"blank"} value={"blank"}>
                          -
                        </option>

                        <option key={"failure"} value={"failure"}>
                          Fail
                        </option>
                        {Array.from({ length: 5 }, (_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                        <option key={"5+"} value={"5+"}>
                          5+
                        </option>
                      </select>
                      <button className="bg-accent flex h-6 items-center justify-center self-center text-sm">
                        Done
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-secondary sticky -bottom-4 flex items-start justify-between px-6 pb-8 pt-4">
                <div className="text-accent text-sm">Cancel</div>
                <div className="text-special text-sm">45:17</div>
                <div className="text-accent text-sm font-bold">Finish</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
