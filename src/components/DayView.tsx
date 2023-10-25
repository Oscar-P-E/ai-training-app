import React, { useState } from "react";
import { useData } from "~/server/api/helpers/useData";
import { LoadingPage } from "./Loading";
import "font-awesome/css/font-awesome.min.css";

export const DayView = () => {
  const [checkedStates, setCheckedStates] = useState<
    Record<string | number, boolean>
  >({});

  const toggleCheck = (id: string | number) => {
    setCheckedStates({
      ...checkedStates,
      [id]: !checkedStates[id],
    });
  };

  const {
    isLoading,
    hasError,
    getActiveMeso,
    getNextDay,
    getNextDayExercises,
    getSortedSetsForExercise,
  } = useData();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (hasError) {
    return <div>Error loading data</div>;
  }

  const validWeight = (wt: number) => {
    if (!wt) return undefined;
    if (wt > 1110) return 1110;

    if (wt <= 27.5) {
      return Math.round(wt / 2.5) * 2.5;
    } else {
      return Math.round(wt / 5) * 5;
    }
  };

  const validReps = (reps: number) => {
    if (!reps) return undefined;
    if (reps > 200) return 200;
    return reps;
  };

  const validRpe = (rpe: number) => {
    // needs to be a multiple of 0.5 between 6 and 10
    if (!rpe || rpe < 6) return undefined;
    if (rpe > 10) return 10;
    if (rpe % 0.5 !== 0) return Math.round(rpe * 2) / 2;
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="card border-neutral flex flex-col items-center border-y font-bold">
          <div key={getActiveMeso()?.id} className="text-lg">
            {getActiveMeso()?.name}
          </div>

          <div className="flex gap-2 pt-1 text-sm">
            {getNextDay()?.weekNumber &&
            getNextDay()?.dayNumber !== undefined ? (
              <>
                <span>Week {getNextDay()?.weekNumber}</span>
                <span>•</span>
                <span>
                  {getNextDay()?.dayLabel ?? "Day " + getNextDay()?.dayNumber}
                </span>
              </>
            ) : (
              <span>New Workout</span>
            )}
          </div>
        </div>

        {getNextDayExercises()?.map(({ exercise }) => (
          <div key={exercise.id} className="card flex flex-col gap-4">
            <div className="font-bold">{exercise.name}</div>
            <div className="grid grid-cols-4 gap-4">
              <div>Weight</div>
              <div>Reps</div>
              <div>RPE</div>
              <div></div>

              {getSortedSetsForExercise(exercise.id)?.map(({ set }) => (
                <React.Fragment key={set.id}>
                  <select
                    id="weight"
                    name="weight"
                    defaultValue={
                      set.goalWeight ? validWeight(set.goalWeight) : "blank"
                    }
                    className={`h-6 max-w-[100px] ${
                      checkedStates[set.id]
                        ? "text-orange-400"
                        : "text-neutral-500"
                    }`}
                  >
                    <option key={"blank"} value={"blank"}>
                      ...
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
                      <option key={(i + 1) * 5 + 30} value={(i + 1) * 5 + 30}>
                        {(i + 1) * 5 + 30}
                      </option>
                    ))}
                  </select>

                  <select
                    id="reps"
                    name="reps"
                    defaultValue={
                      set.goalReps ? validReps(set.goalReps) : "blank"
                    }
                    className={`h-6 max-w-[100px] ${
                      checkedStates[set.id]
                        ? "text-orange-400"
                        : "text-neutral-500"
                    }`}
                  >
                    <option key={"blank"} value={"blank"}>
                      ...
                    </option>

                    {Array.from({ length: 200 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <select
                    id="rpe"
                    name="rpe"
                    defaultValue={set.goalRpe ? validRpe(set.goalRpe) : "blank"}
                    className={`h-6 max-w-[100px] ${
                      checkedStates[set.id]
                        ? "text-orange-400"
                        : "text-neutral-500"
                    }`}
                  >
                    <option key={"blank"} value={"blank"}>
                      ...
                    </option>
                    {Array.from({ length: 9 }, (_, i) => (
                      <option key={10 - i * 0.5} value={10 - i * 0.5}>
                        {10 - i * 0.5}
                      </option>
                    ))}
                  </select>
                  <div
                    className={`flex h-6 max-w-[100px] cursor-pointer items-center justify-center self-center text-sm ${
                      checkedStates[set.id]
                        ? "text-orange-400"
                        : "text-neutral-500"
                    }`}
                    onClick={() => toggleCheck(set.id)}
                  >
                    <i
                      className={`fa fa-check-circle ${
                        checkedStates[set.id]
                          ? "text-orange-400"
                          : "text-neutral-500"
                      }`}
                    ></i>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-secondary sticky -bottom-4 flex items-start justify-between px-6 pb-8 pt-4">
        <div className="text-accent text-sm">Cancel</div>
        <div className="text-special text-sm">45:17</div>
        <div className="text-accent text-sm font-bold">Finish</div>
      </div>
    </>
  );
};
