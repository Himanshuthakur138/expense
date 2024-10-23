import { FormControl, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
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
          defaultValue={null}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              {...field}
              className={className}
              label={label}
              value={value || field.value}
              placeholder={placeholder}
              onChange={(date) => {
                field.onChange(date);
              }}
              renderInput={(params) => (
                // defaultValue={defaultValue || dayjs(new Date())}
                <TextField
                  {...params}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors?.[name]}
                  helperText={errors?.[name]?.message}
                />
              )}
            />
          )}
        />
      </LocalizationProvider>
      <FormHelperText
        className="help1"
      >
        {errors?.[name]?.message}
      </FormHelperText>
    </FormControl>
  );
}
