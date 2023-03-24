import moment from "moment";

export const date2str = (date) => {
  return moment(date).format("MMMM D, YYYY [at] h:mm A");
};

export const isSame = (v1, v2) => {
  //eslint-disable-next-line
  if (v1 == v2) return true;
  else return false;
};
