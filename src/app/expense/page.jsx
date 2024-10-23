"use client";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Expense from "@/component/Expense";
import Income from "@/component/Income";
import Transaction from "@/component/Transaction";
import ExpenseDesign from "@/component/ExpenseDesign/ExpenseDesign";

const ExpenseData = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="tabs example">
              <Tab label="Transactions" value="1" />
              <Tab label="Income" value="2" />
              <Tab label="Expense" value="3" />
            </TabList>
          </Box>
          <br/>
      <ExpenseDesign />

          <TabPanel value="1">
            <Transaction />
          </TabPanel>
          <TabPanel value="2">
            <Income />
          </TabPanel>
          <TabPanel value="3">
            <Expense />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ExpenseData;
