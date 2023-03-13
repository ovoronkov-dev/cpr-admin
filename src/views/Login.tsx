import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { firebaseAuth } from "~firebase/index";
import { Navigate } from "react-router-dom";
import { ControlledTextField } from "~components/ControlledTextField";

const validationSchema = yup.object({
  email: yup.string().email().min(1).required(),
  password: yup.string().min(1).required(),
});

interface FormValues extends yup.InferType<typeof validationSchema> {}

export const Login = () => {
  const [signInWithEmailAndPassword, _, loading, error] =
    useSignInWithEmailAndPassword(firebaseAuth);

  const [user] = useAuthState(firebaseAuth);

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const { email, password } = values;

      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 2, width: 420 }}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              Вхід у Адмін-панель
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {error.message}
              </Alert>
            )}

            <ControlledTextField
              label="E-mail"
              placeholder="Введіть Ваш E-mail"
              variant="filled"
              name="email"
              fullWidth
            />

            <ControlledTextField
              type="password"
              label="Пароль"
              placeholder="Введіть Ваш пароль"
              variant="filled"
              name="password"
              fullWidth
            />

            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              color="primary"
            >
              Увійти
            </Button>
          </form>
        </FormProvider>
      </Paper>
    </Box>
  );
};
