import { Tag } from "antd";

const CellGenderTag = (value: string) => {
  let color = "grey";
  if (value.toLowerCase() === "mujer") {
    color = "red";
  }
  if (value.toLowerCase() === "hombre") {
    color = "blue";
  }
  return (
    <Tag color={color} key={value}>
      {value}
    </Tag>
  );
};

export default CellGenderTag;
