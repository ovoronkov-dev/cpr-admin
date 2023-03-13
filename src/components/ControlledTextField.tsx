import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { useController } from "react-hook-form";

export type ControlledTextField = TextFieldProps & {
  name: Required<string>;
};

export const ControlledTextField = (props: ControlledTextField) => {
  const { name, ...inputProps } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <Box mb={1}>
      <TextField {...inputProps} {...field} />

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
};
