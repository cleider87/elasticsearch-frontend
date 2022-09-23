import { AutoComplete, Button, Col, Input, Row, Select, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getParties } from "../../Common/services/Politicians.API";
import { useEffect, useState } from "react";

function PoliticiansSearchBar(props: any) {
  const { setSearchQuery, searchQuery, searchHandler } = props;
  const { gender, fullName, partyFilter } = searchQuery;
  const [parties, setParties] = useState<{ value: string }[]>([]);

  useEffect(() => {
    getParties().then((response) => {
      setParties(response.map((party: string) =>({value: party})));
    });
  }, []);

  const requestSearch = () => {
    searchHandler();
  };

  return (
    <div className="site-layout-background" style={{ margin: 10 }}>
      <Input.Group size="large">
        <Row justify="center" gutter={[8,8]}>
          <Col xs={24} sm={24} md={6} lg={8}>
            <Input
              allowClear
              placeholder="Filtrar por nombre"
              size="large"
              value={fullName}
              onChange={(action) => {
                setSearchQuery({
                  ...searchQuery,
                  fullName: action.target.value,
                });
                requestSearch();
              }}
              onPressEnter={requestSearch}
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={8}>
            <AutoComplete
              style={{ width: "100%" }}
              allowClear
              placeholder="Filtrar por partido"
              size="large"
              options={parties}
              value={partyFilter}
              onChange={(value) => {
                setSearchQuery({ ...searchQuery, partyFilter: value });
                requestSearch();
              }}
              onSearch={(search) => {
                setSearchQuery({ ...searchQuery, partyFilter: search });
                requestSearch();
              }}
              onSelect={(value: string) => {
                setSearchQuery({ ...searchQuery, partyFilter: value });
                requestSearch();
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={8} >
            <Select
              size="large"
              style={{ width: "100%" }}
              allowClear
              value={gender}
              onChange={(action) => {
                setSearchQuery({ ...searchQuery, gender: action });
                requestSearch();
              }}
            >
              <Select.Option value="mujer">Mujer</Select.Option>
              <Select.Option value="hombre">Hombre</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={4} lg={2}>
            <Tooltip title="Buscar">
              <Button
                size="large"
                type="primary"
                shape="round"
                icon={<SearchOutlined />}
                style={{ width: "100%" }}
                onClick={requestSearch}
              />
            </Tooltip>
          </Col>
        </Row>
      </Input.Group>
    </div>
  );
}

export default PoliticiansSearchBar;
