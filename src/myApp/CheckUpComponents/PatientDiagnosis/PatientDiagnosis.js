import { useState } from "react";
import SuiDropzone from "components/SuiDropzone";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiEditor from "components/SuiEditor";

function PatientDiagnosis() {
  const [editorValue, setEditorValue] = useState(
    "<p><strong>Symptoms:</strong><br><br><br><strong>Findings:</strong><br><br><br><strong>Care:</strong><br><br><br><strong>Suggestions:</strong><br><br><br><strong><em><u>By: Hakeem M. Ashraf</u></em></strong></p>"
  );

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
            <SuiEditor value={editorValue} onChange={setEditorValue} />
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox>
        <SuiTypography component="label" variant="caption" fontWeight="bold">
          Upload Reports Here...
        </SuiTypography>
        <SuiDropzone options={{ addRemoveLinks: true }} />
      </SuiBox>
    </SuiBox>
  );
}

export default PatientDiagnosis;
