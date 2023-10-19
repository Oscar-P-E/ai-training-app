/* eslint-disable @next/next/no-img-element */
import { SignIn, useUser, UserButton } from "@clerk/nextjs";

import { api } from "~/utils/api";

export default function Home() {
  const { user, isLoaded: userIsLoaded, isSignedIn } = useUser();

  // user_2WNbTGz64IpsFgkkNlkTzeqaolI

  const { data: mesoData, isLoading: mesoIsLoading } =
    api.mesocycles.getAll.useQuery();

  const { data: weekData, isLoading: weekIsLoading } =
    api.weeks.getAll.useQuery();

  const { data: dayData, isLoading: dayIsLoading } =
    api.days.getAll.useQuery();

  const { data: exData, isLoading: exIsLoading } =
    api.exercises.getAll.useQuery();

  if (
    exIsLoading ||
    mesoIsLoading ||
    dayIsLoading ||
    weekIsLoading ||
    !userIsLoaded
  ) {
    return <div>Loading...</div>;
  }

  if (!exData || !mesoData || !dayData || !weekData || !user) {
    return <div>Error loading data</div>;
  }

  const getCurrUserMesos = () => {
    return mesoData.filter(({ meso }) => meso.ownerId === user.id);
  };

  const getCurrMeso = () => {
    return getCurrUserMesos()[0]?.meso; // todo
  };

  const getCurrMesoWeeks = () => {
    return weekData.filter(
      ({ week }) => week.mesocycleId === getCurrMeso()?.id,
    );
  };

  const getCurrWeek = () => {
    return getCurrMesoWeeks()[0]?.week; // todo
  };

  const getCurrWeekDays = () => {
    return dayData.filter(({ day }) => day.weekId === getCurrWeek()?.id);
  };

  const getCurrDay = () => {
    const currWeek = getCurrWeek();
    if (currWeek && currWeek.days.length > 0) {
      return currWeek.days[0];
    }
    return undefined;
  };

  const getCurrDayExercises = () => {
    const currDay = getCurrDay();
    if (currDay) {
      return exData.filter(({ exercise }) => exercise.days.includes(currDay));
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
                    {!isSignedIn && <SignIn />}
                    {isSignedIn && <UserButton afterSignOutUrl="/" />}
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
                    <div key={getCurrDay()?.id}>{getCurrDay()?.name}</div>
                  </div>
                </div>

                {/* <div className="card bg-secondary flex justify-between text-center">
                  {[...dayData].map((days) => (
                    <div key={days.id}>{days.name}</div>
                  ))}
                </div> */}

                {getCurrDayExercises()?.map(({ exercise }) => (
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
