import React, { useMemo } from "react";
import { persion } from "../../constants/persian";
import { AgGridReact } from "ag-grid-react";
import { AgGridThemeProvider } from "../AgGridThemeProvider";
import {
  ColDef,
  GridReadyEvent,
  IServerSideDatasource,
} from "ag-grid-community";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { AG_GRID_LOCALE_FA } from "../../constants/aggrid";
import { DashboardContentContainer } from "../../styled-components/DashboardContentContainer";
import { DashboardContentContainerTitle } from "../../styled-components/DashboardContentContainerTitle";
import { DashboardContentContainerHeader } from "../../styled-components/DashboardContentContainerHeader";

export const Indicators = () => {
  const colDefs: ColDef[] = useMemo(
    () => [
      { field: "name", headerName: "نام", minWidth: 170 },
      { field: "age", headerName: "سن" },
      { field: "country", headerName: "کشور" },
    ],
    []
  );
  const dataSource: IServerSideDatasource = {
    getRows(params) {
      setTimeout(() => {
        const request = {};
        // getIndicators(request).then(()=>{})
      }, 3000);
    },
  };
  // const onGridReady = useCallback((params: GridReadyEvent) => {
  //   params.api.setServerSideDatasource(dataSource);
  // }, []);
  const pageSize = 20;
  return (
    <DashboardContentContainer container data-cy="indicators-container">
      <DashboardContentContainerHeader item>
        <DashboardContentContainerTitle>
          {persion.INDICATORS}
        </DashboardContentContainerTitle>
      </DashboardContentContainerHeader>

      <AgGridThemeProvider>
        <AgGridReact
          modules={[ServerSideRowModelModule]}
          rowModelType="serverSide"
          enableRtl
          defaultColDef={{ sortable: true }}
          columnDefs={colDefs}
          serverSideDatasource={dataSource}
          pagination
          paginationPageSize={pageSize}
          localeText={AG_GRID_LOCALE_FA}
        ></AgGridReact>
      </AgGridThemeProvider>
    </DashboardContentContainer>
  );
};

const fake = [
  { name: "عرفان", age: 30, country: "ایران" },
  { name: "عرفان", age: 30, country: "ایران" },
  { name: "عرفان", age: 30, country: "ایران" },
  { name: "عرفان", age: 30, country: "ایران" },
  { name: "عرفان", age: 30, country: "ایران" },
];
