import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCallback } from "react";
import { EditorVariantUploadType } from "../common/enums";

interface Props {
  value: EditorVariantUploadType;
  onChange: (value: EditorVariantUploadType) => void;
}

export const EditorVariantControlTypeToggler = ({ value, onChange }: Props) => {
  const handleChange = useCallback((_: unknown, value: EditorVariantUploadType) => onChange(value), [onChange]);

  return (
    <ToggleButtonGroup value={value} onChange={handleChange} exclusive>
      <ToggleButton value={EditorVariantUploadType.Url}>Посилання</ToggleButton>
      <ToggleButton value={EditorVariantUploadType.Upload}>Завантажити</ToggleButton>
    </ToggleButtonGroup>
  );
};
