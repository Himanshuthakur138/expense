import { Grid } from "@mui/material";
import React from "react";

const ExpenseDesign = () => {
  return (
    <>
      <Grid container className="bg-gray-500 p-3 des" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={9}>
          <div className="mar text-black font-bold text-2xl md:text-4xl mb-2">Track Your Monthly Expenses</div>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className="text-center">
            <img src="/helperimage.png" style={{ width: '100%', maxWidth: '150px' }} alt="Helper" />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ExpenseDesign;
