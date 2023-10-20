import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

export const useData = () => {
  const { user, isLoaded: userIsLoaded, isSignedIn } = useUser();

  const { data: mesoData, isLoading: mesoIsLoading } =
    api.mesocycles.getAll.useQuery();

  const { data: weekData, isLoading: weekIsLoading } =
    api.weeks.getAll.useQuery();

  const { data: dayData, isLoading: dayIsLoading } = api.days.getAll.useQuery();

  const { data: exData, isLoading: exIsLoading } =
    api.exercises.getAll.useQuery();

  const isLoading =
    exIsLoading ||
    mesoIsLoading ||
    dayIsLoading ||
    weekIsLoading ||
    !userIsLoaded;

  const hasError = !exData || !mesoData || !dayData || !weekData || !user;

  if (isLoading) return { isLoading };
  if (hasError) return { hasError };

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

  return {
    // isLoading,
    // hasError,
    user,
    userIsLoaded,
    isSignedIn,
    getCurrMeso,
    getCurrMesoWeeks,
    getCurrWeek,
    getCurrWeekDays,
    getCurrDay,
    getCurrDayExercises,
  };
};
