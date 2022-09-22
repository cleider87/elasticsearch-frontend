import { Tooltip } from "antd";

const CellToolTip = (value: string) => (
  <Tooltip placement="top" title={value}>
    {value}
  </Tooltip>
);

export default CellToolTip;
