import {
  IServerSideGetRowsParams,
  IServerSideGetRowsRequest,
  NumberFilterModel,
  SortModelItem,
  TextFilterModel,
  ValueFormatterParams,
} from "ag-grid-community";
import { ISimpleFilterModelType } from "ag-grid-community/dist/lib/filter/provided/simpleFilter";
import { valueFormatterNullOrUndefinedValue } from "../constants/aggrid";
import { ServerResponse } from "../models/server-response";
import { AxiosResponse } from "axios";

export const createUrlParamsFromObject = (object: {
  [key: string]: string | number;
}) =>
  Object.entries(object)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

export const convertPagingParamsToBackendParams = ({
  startRow,
  endRow,
}: Pick<IServerSideGetRowsRequest, "startRow" | "endRow">): string => {
  const defaultSize = 20;
  const defaultPage = 0;
  let size = defaultSize;
  if (typeof startRow === "number" && typeof endRow === "number") {
    size = endRow - startRow;
  }
  let page = defaultPage;
  if (typeof endRow === "number") {
    page = Math.ceil(endRow / size) - 1;
  }
  return createUrlParamsFromObject({ size, page });
};

export const convertSortParamsToBackendParams = (
  sortModel: SortModelItem[]
): string => {
  let result = "";
  sortModel.forEach((item) => {
    result += `${result ? "&" : ""}sort=${
      item.colId
    },${item.sort.toUpperCase()}`;
  });
  return result;
};
export const convertFiltersToBackendParams = (filters: {
  [key: string]: TextFilterModel | NumberFilterModel;
}) => {
  return Object.entries(filters)
    .map(([fieldName, filterParams]) => ({
      fieldName,
      ...filterParams,
    }))
    .map(convertFilterParamToBackendParam)
    .join("&");
};
export const convertFilterParamToBackendParam = ({
  fieldName,
  type,
  filter,
}: { fieldName: string } & (TextFilterModel | NumberFilterModel)) => {
  if (!type || filter === null || filter === undefined) return;
  if (
    type === "notContains" ||
    type === "empty" ||
    type === "notBlank" ||
    type === "blank" ||
    type === "inRange"
  ) {
    if (type === "inRange") {
      return `${createParamFromFilter(
        fieldName,
        "greaterThanOrEqual",
        filter
      )}&${createParamFromFilter(fieldName, "lessThanOrEqual", filter)}`;
    } else if (type === "notBlank") {
      return createParamFromFilter(
        fieldName,
        "matches",
        // eslint-disable-next-line no-useless-escape
        "^(?!s*$).+"
      );
    } else if (type === "blank") {
      return createParamFromFilter(
        fieldName,
        "equal",
        // eslint-disable-next-line no-useless-escape
        ""
      );
    }
  } else
    return createParamFromFilter(
      fieldName,
      mapAgGridFiltersToBackendParams[type],
      filter
    );
};
export const createRequestParamsFromGridParams = (
  gridParams: IServerSideGetRowsRequest
) => {
  const pagingParams = convertPagingParamsToBackendParams(gridParams);
  const sortParams = convertSortParamsToBackendParams(gridParams.sortModel);
  const filterParams = convertFiltersToBackendParams(
    gridParams.filterModel as Parameters<
      typeof convertFiltersToBackendParams
    >[0]
  );
  return `${pagingParams}&${sortParams}&${filterParams}`;
};
const createParamFromFilter = (
  fieldName: string,
  type: string,
  filter: string | number
) => `${fieldName}=${type}(${filter})`;

const mapAgGridFiltersToBackendParams: {
  [key in ISimpleFilterModelType]: string;
} = {
  equals: "eq",
  notEqual: "ne",
  lessThan: "lt",
  lessThanOrEqual: "lte",
  greaterThan: "gt",
  greaterThanOrEqual: "gte",
  inRange: "inRange",
  blank: "blank",
  notBlank: "notBlank",
  empty: "empty",
  contains: "contains",
  notContains: "notContains",
  startsWith: "startsWith",
  endsWith: "endsWith",
};
export const replaceNullOrUndefinedValueWithDefaultValue =
  <Row, Value>(
    func: (value: Value) => string,
    defaultValue = valueFormatterNullOrUndefinedValue
  ) =>
  (params: ValueFormatterParams<Row, Value>) =>
    params.value === null || params.value === undefined
      ? defaultValue
      : func(params.value);

export const setGridDataFromServerResponse = <Row>(
  params: IServerSideGetRowsParams<Row>,
  { data, count }: { data: Row[]; count: number }
) => {
  params.success({
    rowData: data,
    rowCount: count,
  });
};

export const setGridNoRowsOverLayInCaseOfEmptyData = <Row>(
  params: IServerSideGetRowsParams<Row>,
  data?: Row[]
) => {
  if (!data || !data.length) {
    params.api.showNoRowsOverlay();
  }
};

export const createGridDataSourceGetRows = <Row>(
  getData: (
    requestParams: string
  ) => Promise<AxiosResponse<ServerResponse<Row[]>>>
) => {
  return (params: IServerSideGetRowsParams<Row>) => {
    const requestParams = createRequestParamsFromGridParams(params.request);
    getData(requestParams)
      .then((resp) => {
        setGridDataFromServerResponse(params, {
          data: resp.data.content ?? [],
          count: resp.data.totalElements,
        });
        setGridNoRowsOverLayInCaseOfEmptyData(params, resp.data.content);
      })
      .catch(() => {
        params.fail();
      });
  };
};
