import { DATAS } from "./data";
export function getData() {
  const DataList = DATAS;
  return DataList;
}

export function filterData(dataType) {
  let filteredData = getData().filter((item) => item.party === dataType);
  return filteredData;
}
