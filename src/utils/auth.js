export const getUser = () =>
  JSON.parse(localStorage.getItem("user"));

export const isAdmin = () =>
  getUser()?.role === "admin";

export const isOperator = () =>
  getUser()?.role === "operator";
