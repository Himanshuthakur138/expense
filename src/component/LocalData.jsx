const LocalData = () => {
  if (typeof window === "undefined") {
    console.log("lllllll", JSON.parse(localStorage.getItem("register")));
  }
};
export default LocalData;
// Pa$$w0rd!
