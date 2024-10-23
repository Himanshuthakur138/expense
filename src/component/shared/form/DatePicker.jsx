import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputAdornment } from "@mui/material";
import dayjs from "dayjs";
const DateSelect = ({
  name,
  control,
  label,
  inputFormat,
  errors,
  value,
  className,
}) => {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <>
      <div>
        <Controller
          name={name}
          control={control}
          value={value}
          defaultValue={dayjs(new Date())}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                inputFormat={inputFormat}
                label={label}
                open={isDatePickerOpen}
                onClose={() => setDatePickerOpen(false)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <DateRangeIcon
                        className="cursor-pointer"
                        onClick={() => setDatePickerOpen(!isDatePickerOpen)}
                      />
                    </InputAdornment>
                  ),
                }}
                value={value || null}
                onChange={(newValue) => {
                  onChange(newValue || value);
                  setDatePickerOpen(false);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
                    placeholder="YYYY-MM-DD"
                    className={className}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
      </div>
    </>
  );
};
export default DateSelect;