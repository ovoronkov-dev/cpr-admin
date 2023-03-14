import { array, InferType, mixed, object, string } from "yup";

export const editorVariantValidationSchema = object({
  title: string().required(),
  url: string().required(),
  file: mixed().nullable(),
});

export const editorValidationSchema = object({
  title: string().required(),
  description: string().default(""),
  variants: array(editorVariantValidationSchema.required()).min(2).default([]),
});

export type EditorVariantFormValues = InferType<typeof editorVariantValidationSchema>;

export type EditorFormValues = InferType<typeof editorValidationSchema>;

export const generateEmptyEditorVariant = (options: Partial<EditorVariantFormValues> = {}): EditorVariantFormValues =>
  editorVariantValidationSchema.cast({
    title: "",
    url: "",
    file: null,
    ...options,
  });
