// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DataTable from "examples/Tables/DataTable";
import SearchPatientsData from "layouts/applications/data-tables/data/SearchPatientsData";

function SearchPatient() {
  return (
    <SuiBox>
      <SuiBox width="80%" textAlign="center" mx="auto" mb={0}>
        <SuiBox>
          <SuiTypography variant="h5" fontWeight="regular">
            Search Patient
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      <SuiBox>
        <DataTable table={SearchPatientsData} canSearch />
      </SuiBox>
    </SuiBox>
  );
}

export default SearchPatient;
