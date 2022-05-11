import { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiEditor from "components/SuiEditor";
import { useDispatch, useSelector } from "react-redux";
import { setDiagnosis } from "redux/patDiagnosis";
// import SuiDropzone from "components/SuiDropzone";
import MyDropzone from "myApp/DropZoneHook";

function PatientDiagnosis() {
  const { patientDiagnosis } = useSelector((state) => state.patDiagnosis);
  const [editorValue, setEditorValue] = useState(patientDiagnosis);

  const dispatch = useDispatch();

  function editorHandler(e) {
    setEditorValue(e);
    dispatch(setDiagnosis(e));
  }

  return (
    <SuiBox>
      <SuiBox width="80%" textAlign="center" mx="auto" mb={1.5}>
        <SuiBox>
          <SuiTypography variant="h5" fontWeight="regular">
            Patient Diagnosis
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      <SuiBox>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Diagnosis
              </SuiTypography>
            </SuiBox>
            <SuiEditor value={editorValue} onChange={editorHandler} />
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox>
        <SuiTypography component="label" variant="caption" fontWeight="bold">
          Upload Reports Here...
        </SuiTypography>
        <MyDropzone>{}</MyDropzone>
        {/* <SuiDropzone
          options={{
            addRemoveLinks: true,
            maxFilesize: 10,
            acceptedFiles: ".jpeg,.jpg,.png,.gif",
          }}
        /> */}
      </SuiBox>
    </SuiBox>
  );
}

export default PatientDiagnosis;
