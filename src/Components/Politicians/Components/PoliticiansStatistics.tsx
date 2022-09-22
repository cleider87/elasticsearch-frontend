import { Col, Row, Statistic } from "antd";

function PoliticiansStatistics(props: any) {
  return (
    <Row justify="center" gutter={16}>
      <Col span={12}>
        <Statistic
          title="Promedio de Sueldo Base"
          value={props.statistics?.statistics.avg.toFixed(2) || 0}
          precision={2}
          formatter={(val) => `${val} €`}
        />
      </Col>
      <Col span={12}>
        <Statistic
          title="Mediana de Sueldo Base"
          value={props.statistics?.statistics.median.toFixed(2) || 0}
          precision={2}
          formatter={(val) => `${val} €`}
        />
      </Col>
    </Row>
  );
}

export default PoliticiansStatistics;
