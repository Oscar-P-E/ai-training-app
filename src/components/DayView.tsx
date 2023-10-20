import { useData } from "~/server/api/helpers/useData";

export const DayView = () => {
  const { isLoading, hasError, getCurrMeso, getCurrDay, getCurrDayExercises } =
    useData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card border-neutral flex flex-col items-center border-y font-bold">
        <div key={getCurrMeso()?.id} className="text-lg">
          {getCurrMeso()?.name}
        </div>

        <div className="flex gap-2 pt-1 text-sm">
          Week 1 <span>•</span> {/* todo: week x */}
          <div key={getCurrDay()?.id}>
            {getCurrDay()?.dayLabel ?? getCurrDay()?.name}
            {/* Day 1 */}
          </div>
        </div>
      </div>

      {getCurrDayExercises()?.map(({ exercise }) => (
        <div key={exercise.id} className="card flex flex-col gap-4">
          <div className="font-bold">{exercise.name}</div>
          <div className="grid grid-cols-4 gap-4">
            <div>Weight</div>
            <div>Reps</div>
            <div>RPE</div>
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
                <option key={(i + 1) * 2.5 + 2.5} value={(i + 1) * 2.5 + 2.5}>
                  {(i + 1) * 2.5 + 2.5}
                </option>
              ))}
              {Array.from({ length: (1110 - 30) / 5 }, (_, i) => (
                <option key={(i + 1) * 5 + 30} value={(i + 1) * 5 + 30}>
                  {(i + 1) * 5 + 30}
                </option>
              ))}
            </select>
            <select id="reps" name="reps" defaultValue="blank" className="h-6">
              <option key={"blank"} value={"blank"}>
                -
              </option>

              {Array.from({ length: 200 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select id="rpe" name="rpe" defaultValue="blank" className="h-6">
              <option key={"blank"} value={"blank"}>
                -
              </option>
              {Array.from({ length: 9 }, (_, i) => (
                <option key={10 - i * 0.5} value={10 - i * 0.5}>
                  {10 - i * 0.5}
                </option>
              ))}
            </select>
            <button className="bg-accent flex h-6 items-center justify-center self-center text-sm">
              Done
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
