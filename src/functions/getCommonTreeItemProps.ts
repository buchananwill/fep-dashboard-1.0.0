interface BaseReportItem {
  passes: boolean;
}

export function getColor(payload: BaseReportItem) {
  return { color: payload.passes ? '#3c8039' : '#f15865' };
}

export function getBgColor(payload: BaseReportItem) {
  return { bgColor: payload.passes ? '#e6f4ea' : '#f4e6e6' };
}
