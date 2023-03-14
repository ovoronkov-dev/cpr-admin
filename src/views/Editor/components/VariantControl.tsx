import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Fragment, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ControlledTextField } from "~components/ControlledTextField";
import { EditorVariantUploadType } from "../common/enums";
import { EditorVariantControlTypeToggler } from "./VariantControlTypeToggler";
import { EditorVariantControlUpload } from "./VariantControlUpload";

interface Props {
  index: number;

  onDelete: (index: number) => void;
}

export const EditorVariantControl = ({ index, onDelete }: Props) => {
  const { setValue } = useFormContext();

  const [uploadType, setUploadType] = useState(EditorVariantUploadType.Url);

  const currentUrl = useWatch({ name: `variants.${index}.url` });

  const handleDelete = () => onDelete(index);

  const handleTypeChange = (type: EditorVariantUploadType) => {
    setUploadType(type);

    setValue(`variants.${index}.url`, "");
    setValue(`variants.${index}.file`, null);
  };

  const handleFileChange = (file: File, url: string) => {
    setValue(`variants.${index}.url`, url);
    setValue(`variants.${index}.file`, file);
  };

  return (
    <Fragment>
      <Box>
        <EditorVariantControlTypeToggler value={uploadType} onChange={handleTypeChange} />

        <Button onClick={handleDelete}>Delete</Button>
      </Box>

      {uploadType === EditorVariantUploadType.Upload && (
        <EditorVariantControlUpload previewUrl={currentUrl} onChange={handleFileChange} />
      )}

      {uploadType === EditorVariantUploadType.Url && (
        <ControlledTextField name={`variants.${index}.url`} label="Посилання на картинку" variant="filled" fullWidth />
      )}

      <ControlledTextField name={`variants.${index}.title`} label="Назва картинки" variant="filled" fullWidth />
    </Fragment>
  );
};
