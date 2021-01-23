export const formatDate = (date) => {
  const timestamp = new Date(Date.parse(date));
  //   return timestamp.toString().substring(4, 15);
  return {
    date: timestamp.toLocaleDateString("en-GB"),
    time: timestamp.toLocaleTimeString("en-GB"),
  };
};
