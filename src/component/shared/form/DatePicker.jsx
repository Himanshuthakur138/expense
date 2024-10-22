import { FormControl, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
export default function DateSelect({
  name,
  control,
  label,
  className,
  placeholder,
  value,
  errors,
  defaultValue,
}) {
  console.log("errors", errors?.[name]?.message);
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              className={className}
              label={label}
              value={value}
              placeholder={placeholder}
              onChange={(date) => {
                field.onChange(date);
              }}
              renderInput={(params) => (
                <TextField
                {...params}
                  InputLabelProps={{ shrink: true }}
                  defaultValue={dayjs(new Date())}
                  error={!!errors?.[name]}
                  helperText={errors?.[name]?.message}
                />
              )}
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
