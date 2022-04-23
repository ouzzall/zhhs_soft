// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import DataTable from "examples/Tables/DataTable";
import SearchPatientsData from "layouts/applications/data-tables/data/SearchPatientsData";
import { Link } from "react-router-dom";

function SearchPatient() {
  return (
    <SuiBox>
      <SuiBox textAlign="" mx="auto" mb={0} display="flex" justifyContent="space-between" p={1}>
        <SuiBox>
          <SuiTypography variant="h5" fontWeight="regular">
            Search Patient
          </SuiTypography>
        </SuiBox>
        <SuiBox>
          <Link to="/patients/new-patient">
            <SuiButton variant="gradient" color="success">
              New Patient
            </SuiButton>
          </Link>
        </SuiBox>
      </SuiBox>
      <SuiBox>
        <DataTable table={SearchPatientsData} canSearch />
      </SuiBox>
    </SuiBox>
  );
}

export default SearchPatient;
