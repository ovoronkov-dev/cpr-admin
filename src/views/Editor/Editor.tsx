import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Typography } from "@mui/material";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { ControlledTextField } from "~components/ControlledTextField";
import { EditorFormValues, editorValidationSchema, generateEmptyEditorVariant } from "./common/validation-schema";
import { EditorVariantControl } from "./components/VariantControl";
import { EditorVariantPlaceholder } from "./components/VariantPlaceholder";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { ref, uploadBytesResumable } from "firebase/storage";
import { firebaseDb, firebaseStorage } from "~firebase/index";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Editor = () => {
  const navigate = useNavigate();

  const form = useForm<EditorFormValues>({
    resolver: yupResolver(editorValidationSchema),
    mode: "onChange",
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const handleVariantInsert = () => append(generateEmptyEditorVariant());

  const handleVariantRemove = (index: number) => remove(index);

  const handleSubmit = async (values: EditorFormValues) => {
    const imagesToUpload = values.variants
      .map((variant, index) => [index, variant.file as File] satisfies [number, File])
      .filter(([file]) => file !== null);

    const uploadResult = (await Promise.all(
      imagesToUpload.map(([index, file]) =>
        uploadBytesResumable(ref(firebaseStorage, `${Date.now()}`), file).then(
          (result) => [index, result.metadata.fullPath] satisfies [number, string]
        )
      )
    )) as [number, string][];

    const uploadResultMap = new Map(uploadResult);

    const result = await addDoc(collection(firebaseDb, "polls"), {
      title: values.title,
      description: values.description,
      variants: values.variants.map((variant, index) => ({
        title: variant.title,
        url: variant.file ? (uploadResultMap.get(index) as string) : variant.url,
      })),
    });

    navigate(`/viewer/${result.id}`);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container alignItems="center">
          <Grid item xs={6} container alignItems="center">
            <Typography variant="h2">Text</Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              disabled={!form.formState.isValid}
              startIcon={<CheckRoundedIcon />}
              type="submit"
            >
              Зберегти
            </Button>
          </Grid>
        </Grid>

        <Grid container wrap="wrap" spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={3}>
            <ControlledTextField name="title" label="Назва опитування" fullWidth variant="filled" />
          </Grid>

          <Grid item xs={3}>
            <ControlledTextField name="description" label="Опис опитування" fullWidth variant="filled" />
          </Grid>
        </Grid>

        <Typography variant="h3" sx={{ mt: 1 }}>
          Варіанти:
        </Typography>

        <Grid container wrap="wrap" spacing={3} sx={{ mt: 1 }}>
          {fields.map((field, index) => (
            <Grid item xs={3} key={field.id}>
              <EditorVariantControl index={index} onDelete={handleVariantRemove} />
            </Grid>
          ))}

          <Grid item xs={3}>
            <EditorVariantPlaceholder onClick={handleVariantInsert} />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};
