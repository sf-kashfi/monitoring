import React from "react";
import { persion } from "../../constants/persian";
import { AgGridReact } from "ag-grid-react";
import { AgGridThemeProvider } from "../AgGridThemeProvider";
import {
  ColDef,
  GetDetailRowDataParams,
  IServerSideDatasource,
} from "ag-grid-community";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { AG_GRID_LOCALE_FA } from "../../constants/aggrid";
import { DashboardContentContainer } from "../../styled-components/DashboardContentContainer";
import { DashboardContentContainerTitle } from "../../styled-components/DashboardContentContainerTitle";
import { DashboardContentContainerHeader } from "../../styled-components/DashboardContentContainerHeader";
import { getCapitalIncrease } from "../../api/requests";
import {
  createGridDataSourceGetRows,
  replaceNullOrUndefinedValueWithDefaultValue,
} from "../../helpers/ag-grid";
import { CapitalChanges, CapitalIncrease } from "../../models/capital-increase";
import { convertISODateToJalali } from "../../helpers/date";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export const CapitalIncreases = () => {
  const colDefs: ColDef<CapitalIncrease>[] = [
    { cellRenderer: "agGroupCellRenderer", width: 50, resizable: false },
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
      field: "isin",
      headerName: persion.ISIN,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      headerName: persion.UPDATE_INTERVALS,
      valueGetter: () => "12 ساعت",
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
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
  const detailColDefs: ColDef<CapitalChanges>[] = [
    {
      field: "capitalChangePercent",
      headerName: persion.CAPITAL_CHANGE_PERCENT,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "contributionPercent",
      headerName: persion.CONTRIBUTION_PERCENT,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "date",
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
      headerName: persion.DATE,
      valueFormatter: replaceNullOrUndefinedValueWithDefaultValue<
        CapitalChanges,
        CapitalChanges["date"]
      >(convertISODateToJalali),
    },
    {
      field: "newCapital",
      headerName: persion.NEW_CAOITAL,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "premiumPercent",
      headerName: persion.PREMIUM_PERCENT,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "previousCapital",
      headerName: persion.PREVIUS_CAPITAL,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "reservePercent",
      headerName: persion.RESERVE_PERCENT,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
  ];
  const dataSource: IServerSideDatasource = {
    getRows: createGridDataSourceGetRows(getCapitalIncrease),
  };
  const pageSize = 20;
  return (
    <DashboardContentContainer
      container
      data-cy="financial-relations-container"
    >
      <DashboardContentContainerHeader item>
        <DashboardContentContainerTitle>
          {persion.CAPITAL_INCREASE}
        </DashboardContentContainerTitle>
      </DashboardContentContainerHeader>

      <AgGridThemeProvider>
        <AgGridReact<CapitalIncrease>
          modules={[ServerSideRowModelModule, MasterDetailModule]}
          rowModelType="serverSide"
          enableRtl
          defaultColDef={{ sortable: true, resizable: true }}
          columnDefs={colDefs}
          masterDetail={true}
          detailCellRendererParams={{
            detailGridOptions: {
              columnDefs: detailColDefs,
              enableRtl: true,
              localeText: AG_GRID_LOCALE_FA,

              defaultColDef: {
                resizable: true,
              },
            },
            getDetailRowData: (
              params: GetDetailRowDataParams<CapitalIncrease, CapitalChanges>
            ) => {
              return params.successCallback(params.data.capitalChanges);
            },
          }}
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
