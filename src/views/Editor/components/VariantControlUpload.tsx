import { Box, styled, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const PREFIX = "EditorVariantControlUpload";

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled(Box)(({ theme: { shape } }) => ({
  [`&.${classes.root}`]: {
    height: 100,

    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    borderRadius: shape.borderRadius,
  },
}));

interface Props {
  previewUrl: string;
  onChange: (file: File, url: string) => void;
}

export const EditorVariantControlUpload = ({ previewUrl, onChange }: Props) => {
  const { getInputProps, getRootProps, acceptedFiles } = useDropzone();

  useEffect(() => {
    let isSubscribed = true;

    if (acceptedFiles.length > 0) {
      (async (file: File) => {
        const reader = new FileReader();

        reader.onload = function () {
          if (this.result && isSubscribed) {
            onChange(file, this.result as string);
          }
        };

        reader.readAsDataURL(file);
      })(acceptedFiles[0]);
    }

    return () => {
      isSubscribed = false;
    };
  }, [acceptedFiles, onChange]);

  return (
    <Root className={classes.root} sx={{ backgroundImage: `url(${previewUrl})` }} {...getRootProps()}>
      {!previewUrl && <Typography variant="caption">Натисніть аби завантажити картинку</Typography>}

      <input type="file" hidden {...getInputProps()} />
    </Root>
  );
};
