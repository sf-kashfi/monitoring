import React from "react";
import { persion } from "../../constants/persian";
import { AgGridReact } from "ag-grid-react";
import { AgGridThemeProvider } from "../AgGridThemeProvider";
import { ColDef, IServerSideDatasource } from "ag-grid-community";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { AG_GRID_LOCALE_FA } from "../../constants/aggrid";
import { DashboardContentContainer } from "../../styled-components/DashboardContentContainer";
import { DashboardContentContainerTitle } from "../../styled-components/DashboardContentContainerTitle";
import { DashboardContentContainerHeader } from "../../styled-components/DashboardContentContainerHeader";
import { getWarrants } from "../../api/requests";
import {
  createGridDataSourceGetRows,
  replaceNullOrUndefinedValueWithDefaultValue,
} from "../../helpers/ag-grid";
import { Warrant } from "../../models/warrant";
import { convertISODateToJalali } from "../../helpers/date";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export const Warrants = () => {
  const colDefs: ColDef<Warrant>[] = [
    {
      headerName: persion.ROW,
      valueGetter: (params) =>
        params.node?.rowIndex ? params.node.rowIndex + 1 : 1,
      filter: false,
      sortable: false,
      width: 80,
      resizable: false,
    },
    {
      field: "symbol",
      headerName: persion.INSTRUMENT,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "isin",
      headerName: persion.ISIN,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      headerName: persion.UPDATE_INTERVALS,
      valueGetter: () => "30 ثانیه",
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "lastModifiedDate",
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
      headerName: persion.LAST_MODIFY_DATE,
      valueFormatter: replaceNullOrUndefinedValueWithDefaultValue<
        Warrant,
        Warrant["lastModifiedDate"]
      >(convertISODateToJalali),
    },
    {
      headerName: persion.WARNING,
      width: 80,
      cellRenderer: () => {
        if (true) {
          return <FaCheckCircle color="green" />;
        }
        return <FaExclamationTriangle color="red" />;
      },
      filter: false,
      sortable: false,
    },
  ];
  const dataSource: IServerSideDatasource = {
    getRows: createGridDataSourceGetRows(getWarrants),
  };
  const pageSize = 20;
  return (
    <DashboardContentContainer container data-cy="warrants-container">
      <DashboardContentContainerHeader item>
        <DashboardContentContainerTitle>
          {persion.WARRANTS}
        </DashboardContentContainerTitle>
      </DashboardContentContainerHeader>

      <AgGridThemeProvider>
        <AgGridReact<Warrant>
          modules={[ServerSideRowModelModule]}
          rowModelType="serverSide"
          enableRtl
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          columnDefs={colDefs}
          serverSideDatasource={dataSource}
          pagination
          paginationPageSize={pageSize}
          cacheBlockSize={pageSize}
          localeText={AG_GRID_LOCALE_FA}
          multiSortKey="ctrl"
        ></AgGridReact>
      </AgGridThemeProvider>
    </DashboardContentContainer>
  );
};
