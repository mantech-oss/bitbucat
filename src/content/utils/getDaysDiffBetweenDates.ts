export const getDaysDiffBetweenDates = (dateInitial: any, dateFinal: any): number => {
  return Math.ceil((dateFinal - dateInitial) / (1000 * 3600 * 24));
}