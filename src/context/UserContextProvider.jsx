"use client";
import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import useLocalStorage from "use-local-storage";

const UserContextProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const getApi = async () => {
    const response = await axios.get("https://dummyapi.online/api/movies");
    setApiData(response.data);
  };
  useEffect(() => {
    getApi();
  }, []);
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [resetData, setResetData] = useState();
  const [totalbalance, setTotalBalance] = useLocalStorage("balance");
  useEffect(() => {
    const savedUser = localStorage.getItem("users");
    const savedData = localStorage.getItem("data");
    if (savedUser && savedData) {
      setUser(JSON.parse(savedUser));
      setValue(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("users", JSON.stringify(user));
      localStorage.setItem("data", JSON.stringify(value));
    } else {
      localStorage.removeItem("users");
      localStorage.removeItem("data");
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        apiData,
        setApiData,
        value,
        setValue,
        tableData,
        setTableData,
        resetData,
        setResetData,
        totalbalance,
        setTotalBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
