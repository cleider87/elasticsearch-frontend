import { Button, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import CellGenderTag from "../../Common/components/CellGenderTag";
import CellToolTip from "../../Common/components/CellToolTip";
import { formatCurrency } from "../../Common/helpers/Common.helper";
import { PoliticianRow } from "../../Common/interfaces/PoliticianRow.interface";
import { Politician } from "../../Common/interfaces/Politician.interface";
import type { ColumnsType } from "antd/es/table";
import { deletePoliticianById } from "../../Common/services/Politicians.API";
import { useState } from "react";

function PoliticiansTable(props: any) {
  const {
    page,
    pageSize,
    politicians,
    total,
    setPage,
    setPageSize,
    setLoaded,
  } = props;
  const [loading, setIsLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  const editHandler = (id?: string) => {
    if (id) navigate(`/politicians/${id}`);
  };

  const deleteHandler = async (id?: string) => {
    if (id) await deletePoliticianById(id);
    setIsLoading(true);
    setTimeout(() => {
      setLoaded(false);
      setIsLoading(false);
    }, 900);
  };

  const columns: ColumnsType<PoliticianRow> = [
    {
      key: "n",
      dataIndex: "n",
      title: "N°",
    },
    {
      key: "fullName",
      dataIndex: "fullName",
      title: "Nombre",
      width: "15rem",
      render: CellToolTip,
    },
    {
      key: "gender",
      dataIndex: "gender",
      title: "Género",
      responsive: ["xl", "lg", "md", "sm"],
      width: "5rem",
      render: CellGenderTag,
    },
    {
      key: "occupation",
      dataIndex: "occupation",
      title: "Cargo",
      responsive: ["xl"],
      width: "10rem",
      render: CellToolTip,
    },
    {
      key: "partyFilter",
      dataIndex: "partyFilter",
      title: "Partido",
      responsive: ["xl", "lg", "md"],
      width: "8rem",
      render: (value: string, record: PoliticianRow) => (
        <Tooltip placement="top" title={value}>
          {record.party}
        </Tooltip>
      ),
    },
    {
      key: "community",
      dataIndex: "community",
      title: "CCAA",
      responsive: ["xl", "lg"],
      width: "10rem",
      render: CellToolTip,
    },
    {
      key: "institution",
      dataIndex: "institution",
      title: "Institución",
      responsive: ["xl", "lg"],
      width: "10rem",
      render: CellToolTip,
    },
    {
      key: "baseSalary",
      dataIndex: "baseSalary",
      title: "Sueldo Base",
      responsive: ["xl", "lg", "md"],
      width: "8rem",
      render: formatCurrency,
    },
    {
      key: "otherAllowancesAndIndemnities",
      dataIndex: "otherAllowancesAndIndemnities",
      title: "Otras Dietas e Indemnizaciones",
      responsive: ["xl"],
      width: "10rem",
      render: formatCurrency,
    },
    {
      title: <EditOutlined />,
      key: "mobileAction",
      responsive: ["xs"],
      render: (_: any, record: Politician) => (
        <Button.Group>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            size="small"
            onClick={() => editHandler(record.id)}
          />
        </Button.Group>
      ),
    },
    {
      title: "Opciones",
      key: "action",
      responsive: ["sm", "md", "lg", "xl", "xxl"],
      render: (_: any, record: Politician) => (
        <Button.Group>
          <Button
            type="primary"
            shape="circle"
            color="red"
            icon={<EditOutlined />}
            size="small"
            onClick={() => editHandler(record.id)}
          />
          <Button
            danger
            type="primary"
            shape="circle"
            color="red"
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => deleteHandler(record.id)}
          />
        </Button.Group>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      bordered
      size="small"
      scroll={{ y: "35rem" }}
      columns={columns}
      rowKey={(record) => record.id + ""}
      dataSource={politicians}
      pagination={{
        current: page,
        pageSize,
        total,
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
          setLoaded(false);
        },
        onShowSizeChange: (current, size) => {
          setPage(current);
          setPageSize(size);
          setLoaded(false);
        },
      }}
    />
  );
}

export default PoliticiansTable;
