import { Table } from "antd";
import PoliticiansStatistics from "../Politicians/Components/PoliticiansStatistics";
import { useEffect, useState } from "react";
import { getStatistics } from "../Common/services/Politicians.API";
import { GetStatisticsResponse } from "../Common/interfaces/GetStatisticsResponse.interface";
import { Politician } from "../Common/interfaces/Politician.interface";
import type { ColumnsType } from "antd/es/table";
import { PoliticianRow } from "../Common/interfaces/PoliticianRow.interface";
import CellToolTip from "../Common/components/CellToolTip";
import { formatCurrency } from "../Common/helpers/Common.helper";

function Statistics() {
  const [statistics, setStatistics] = useState<GetStatisticsResponse>({
    statistics: {
      avg: 0,
      median: 0,
    },
    top10: [],
  } as GetStatisticsResponse);
  const [statisticsLoaded, setStatisticsLoaded] = useState<boolean>(false);
  useEffect(() => {
    if(!statisticsLoaded){
      getStatistics().then((response) => {
        setStatistics(response);
        setStatisticsLoaded(true);
      });
    }
  }, [statistics, statisticsLoaded]);


  const columns: ColumnsType<PoliticianRow> = [
    {
      key: "n",
      dataIndex: "n",
      title: "N°",
      width: "4rem",
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
      responsive: ["md", "lg", "xl", "xxl"],
      width: "10rem",
    },
    {
      key: "community",
      dataIndex: "community",
      title: "CCAA",
      responsive: ["md", "lg","xl", "xxl"],
      width: "10rem",
      render: CellToolTip,
    },
    {
      key: "baseSalary",
      dataIndex: "baseSalary",
      title: "Sueldo Base",
      responsive: ["md", "lg", "xl", "xxl"],
      width: "10rem",
      render: formatCurrency,
    },
  ];

  return (
    <div>
      <PoliticiansStatistics statistics={statistics} />
      <Table
        dataSource={statistics?.top10.map(
          (politician: Politician, i: number) => ({
            ...politician,
            key: politician.id,
            n: i + 1,
          })
        )}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}

export default Statistics;
