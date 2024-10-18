import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/joy";

export default function DateSelect({
  name,
  control,
  label,
  className,
  placeholder,
  value,
  errors
}) {
  return (
    <FormControl fullWidth error={!!errors?.[name]}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          error={!!errors?.[name]}
          defaultValue={null} 
          render={({ field }) => (
            <DatePicker
              {...field}
              className={className}
              label={label}
              value={value}
              placeholder={placeholder}
              onChange={(date) => {
                field.onChange(date);
              }}
              renderInput={(params) => <TextField {...params} />} 
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
