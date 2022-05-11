import React, { useEffect, useMemo, useState } from "react";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import { useDropzone } from "react-dropzone";
import "main.css";
import { useDispatch, useSelector } from "react-redux";
import { setReports } from "redux/patReports";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function MyDropzone() {
  const { patientReports } = useSelector((state) => state.patReports);
  const [files, setFiles] = useState(patientReports);

  // console.log(patientReports);

  // console.log(files);
  const dispatch = useDispatch();

  function removeHandler() {
    setFiles([]);
    dispatch(setReports([]));
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      // console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      dispatch(
        setReports(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div style={thumb}>
        <div style={thumbInner}>
          <img
            alt="alt_name"
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            // onLoad={() => {
            //   URL.revokeObjectURL(file.preview);
            // }}
          />
        </div>
      </div>
      <div className="image_detail">{file.name}</div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    // files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({ style, className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <SuiBox justifyContent="flex-end" display="flex" mt={2}>
        <SuiButton variant="gradient" size="small" onClick={removeHandler} color="error">
          EMPTY FILES SECTION
        </SuiButton>
      </SuiBox>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default MyDropzone;
