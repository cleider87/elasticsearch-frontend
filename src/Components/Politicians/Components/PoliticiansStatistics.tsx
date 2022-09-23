import { Col, Row, Statistic } from "antd";
import { formatNumber } from "../../Common/helpers/Common.helper";

function PoliticiansStatistics(props: any) {
  const { statistics } = props;
  return (
    <Row justify="center" gutter={16}>
      <Col span={12}>
        <Statistic
          title="Promedio de Sueldo Base"
          value={formatNumber(
            statistics.statistics?.avg ? statistics.statistics.avg : 0
          )}
          precision={2}
          formatter={(val) => `${val} €`}
        />
      </Col>
      <Col span={12}>
        <Statistic
          title="Mediana de Sueldo Base"
          value={formatNumber(
            statistics.statistics?.median ? statistics.statistics.median : 0
          )}
          precision={2}
          formatter={(val) => `${val} €`}
        />
      </Col>
    </Row>
  );
}

export default PoliticiansStatistics;
