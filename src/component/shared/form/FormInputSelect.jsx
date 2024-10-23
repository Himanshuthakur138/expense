import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSelect = ({
  name,
  control,
  label,
  options,
  errors,
  defaultValue,
  className,
}) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel className="field ">{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
            <Select
            InputLabelProps={{ shrink: true }}
              label={label}
              id={name}
              className={className}
              {...field}
              error={!!errors?.[name]}                                 
              helperText={errors?.[name]?.message}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option} className="capitalize">
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      
      </FormControl>
    </>
  );
};

export default FormInputSelect;
