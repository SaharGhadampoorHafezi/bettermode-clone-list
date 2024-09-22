export const dateFormatter = (utcDateStr: string) => {
  const date = new Date(utcDateStr);
  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString();
  return localDate + "       " + localTime;
};
