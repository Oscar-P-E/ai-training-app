import { useUser } from "@clerk/nextjs";
import { type Exercise } from "@prisma/client";
import { api } from "~/utils/api";

export const useData = () => {
  const { user, isLoaded: userIsLoaded, isSignedIn } = useUser();

  const { data: mesoData, isLoading: mesoIsLoading } =
    api.mesocycles.getAll.useQuery();

  const { data: dayData, isLoading: dayIsLoading } = api.days.getAll.useQuery();

  const { data: exData, isLoading: exIsLoading } =
    api.exercises.getAll.useQuery();

  const { data: setData, isLoading: setIsLoading } = api.sets.getAll.useQuery();

  const isLoading =
    exIsLoading ||
    mesoIsLoading ||
    dayIsLoading ||
    setIsLoading ||
    !userIsLoaded;

  const hasError = !exData || !mesoData || !dayData || !setData || !user;

  if (isLoading) return { isLoading };
  if (hasError) return { hasError };

  const getCurrUserMesos = () => {
    return mesoData.filter(({ meso }) => meso.ownerId === user.id);
  };

  const getActiveMeso = () => {
    const currUserMesos = getCurrUserMesos();

    if (!currUserMesos) return undefined;

    const activeMesos = currUserMesos.find(({ meso }) => meso.active);

    return activeMesos ? activeMesos.meso : undefined;
  };

  const getActiveMesoDays = () => {
    const activeMesoDays = dayData.filter(
      ({ day }) => day.mesocycleId === getActiveMeso()?.id,
    );

    return activeMesoDays.map((day) => ({
      day: day.day,
    }));
  };

  const getNextDay = () => {
    const incompleteDays = getActiveMesoDays().filter(
      ({ day }) => !day.completed,
    );

    const sortedDays = incompleteDays.sort((a, b) => {
      if (a.day.weekNumber === b.day.weekNumber) {
        return a.day.dayNumber - b.day.dayNumber;
      }
      return a.day.weekNumber - b.day.weekNumber;
    });

    if (sortedDays.length > 0 && sortedDays[0]) {
      return sortedDays[0].day;
    }

    return undefined;
  };

  const getNextDayExercises = () => {
    const nextDay = getNextDay();

    if (!nextDay) return undefined;

    return nextDay.exercises.map((exercise) => ({
      exercise,
      sortedSets: getSortedSetsForExercise(exercise.id),
    }));
  };

  const getSortedSetsForExercise = (exerciseId: Exercise["id"]) => {
    const sets = setData.filter(({ set }) => set.exerciseId === exerciseId);

    const sortedSets = sets.sort((a, b) => a.set.order - b.set.order);

    return sortedSets;
  };

  return {
    user,
    isSignedIn,
    isLoading,
    hasError,
    getCurrUserMesos,
    getActiveMeso,
    getActiveMesoDays,
    getNextDay,
    getNextDayExercises,
    getSortedSetsForExercise,
  };
};
