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
import { getFinancialStats } from "../../api/requests";
import {
  createGridDataSourceGetRows,
  replaceNullOrUndefinedValueWithDefaultValue,
} from "../../helpers/ag-grid";
import { FinancialStats } from "../../models/financial-stats";
import { formatISODateToShortDate } from "../../helpers/date";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

export const FinancialRelations = () => {
  const colDefs: ColDef<FinancialStats>[] = [
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
      field: "item",
      headerName: persion.ITEM,
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "value",
      headerName: persion.VSLUE,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      headerName: persion.UPDATE_INTERVALS,
      valueGetter: () => "20 ساعت",
      filter: "agTextColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "date",
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
      headerName: persion.DATE,
      valueFormatter: replaceNullOrUndefinedValueWithDefaultValue<
        FinancialStats,
        FinancialStats["date"]
      >(formatISODateToShortDate),
    },
    {
      field: "fiscalMonth",
      headerName: persion.FISCAL_MONTH,
      filter: "agNumberColumnFilter",
      filterParams: { maxNumConditions: 1 },
    },
    {
      field: "fiscalYear",
      headerName: persion.FISCAL_YEAR,
      filter: "agNumberColumnFilter",
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
  const dataSource: IServerSideDatasource = {
    getRows: createGridDataSourceGetRows(getFinancialStats),
  };
  const pageSize = 20;
  return (
    <DashboardContentContainer
      container
      data-cy="financial-relations-container"
    >
      <DashboardContentContainerHeader item>
        <DashboardContentContainerTitle>
          {persion.FINANCIAL_RELATIONS}
        </DashboardContentContainerTitle>
      </DashboardContentContainerHeader>

      <AgGridThemeProvider>
        <AgGridReact
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
