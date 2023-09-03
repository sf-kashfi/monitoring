import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AgGridThemeProvider } from "../AgGridThemeProvider";
import { ColDef, IServerSideDatasource } from "ag-grid-community";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { AG_GRID_LOCALE_FA } from "../../constants/aggrid";
import { DashboardContentContainer } from "../../styled-components/DashboardContentContainer";
import { DashboardContentContainerTitle } from "../../styled-components/DashboardContentContainerTitle";
import { DashboardContentContainerHeader } from "../../styled-components/DashboardContentContainerHeader";
import { getBonds } from "../../api/requests";
import {
  createGridDataSourceGetRows,
  replaceNullOrUndefinedValueWithDefaultValue,
} from "../../helpers/ag-grid";
import { formatISODateToShortDate } from "../../helpers/date";
import { Bond } from "../../models/bond";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { persion } from "../../constants/persian";

export const Bonds = () => {
  const colDefs: ColDef<Bond>[] = [
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
      field: "symbol",
      headerName: persion.INSTRUMENT,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "symbolEn",
      headerName: persion.INSTRUMENT_EN,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "name",
      headerName: persion.NAME,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "nameEn",
      headerName: persion.NAME_EN,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "issuerClass",
      headerName: persion.ISSUER_CLASS,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "type1",
      headerName: persion.TYPE1,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "type2",
      headerName: persion.TYPE2,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "currency",
      headerName: persion.CURRENCY,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "numOfPayments",
      headerName: persion.NUM_OF_PAYMENTS,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "emissionVolume",
      headerName: persion.EMISSION_VOLUME,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "parValue",
      headerName: persion.PARVALUE,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "couponRate",
      headerName: persion.COUPONRATE,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      headerName: persion.UPDATE_INTERVALS,
      valueGetter: () => "2 ساعت",
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "issueDate",
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
      headerName: persion.ISSUE_DATE,
      valueFormatter: replaceNullOrUndefinedValueWithDefaultValue<
        Bond,
        Bond["issueDate"]
      >(formatISODateToShortDate),
    },
    {
      field: "maturityDay",
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
      headerName: persion.MATURITYDAY,
      valueFormatter: replaceNullOrUndefinedValueWithDefaultValue<
        Bond,
        Bond["maturityDay"]
      >(formatISODateToShortDate),
    },
    {
      field: "accrualStartDate",
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
      headerName: persion.ACCRUAL_START_DATE,
      valueFormatter: replaceNullOrUndefinedValueWithDefaultValue<
        Bond,
        Bond["accrualStartDate"]
      >(formatISODateToShortDate),
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
    getRows: createGridDataSourceGetRows(getBonds),
  };
  const pageSize = 20;
  return (
    <DashboardContentContainer
      container
      data-cy="financial-relations-container"
    >
      <DashboardContentContainerHeader item>
        <DashboardContentContainerTitle>
          {persion.BONDS}
        </DashboardContentContainerTitle>
      </DashboardContentContainerHeader>

      <AgGridThemeProvider>
        <AgGridReact
          modules={[ServerSideRowModelModule]}
          rowModelType="serverSide"
          enableRtl
          defaultColDef={{ sortable: true, resizable: true }}
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
