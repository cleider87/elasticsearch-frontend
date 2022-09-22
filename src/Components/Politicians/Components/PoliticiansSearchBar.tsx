import { AutoComplete, Button, Col, Input, Row, Select, Tooltip } from "antd";
import { Option } from "antd/lib/mentions";
import { SearchOutlined } from "@ant-design/icons";
import { getParties } from "../../Common/services/Politicians.API";
import { useEffect, useState } from "react";

function PoliticiansSearchBar(props: any) {
  const { setSearchQuery, searchQuery, searchHandler } = props;
  const { gender, fullName, partyFilter } = searchQuery;
  const [parties, setParties] = useState<string[]>([]);

  useEffect(() => {
    getParties().then((response) => {
      setParties(response);
    });
  }, []);

  const requestSearch = () => {
    searchHandler();
  };

  return (
    <div className="site-layout-background" style={{ margin: 10 }}>
      <Input.Group size="large">
        <Row justify="center" gutter={16}>
          <Col span={8}>
            <Input
              allowClear
              placeholder="Filtrar por nombre"
              size="large"
              value={fullName}
              onChange={(action) =>{
                setSearchQuery({
                  ...searchQuery,
                  fullName: action.target.value,
                })
                requestSearch();
              }}
              onPressEnter={requestSearch}
            />
          </Col>
          <Col span={8}>
            <AutoComplete
              style={{ width: "100%" }}
              allowClear
              placeholder="Filtrar por partido"
              size="large"
              value={partyFilter}
              dataSource={parties.filter((option: string) =>
                option?.toLowerCase().match(partyFilter?.toLowerCase())
              )}
              onChange={(value) => {
                setSearchQuery({ ...searchQuery, partyFilter: value });
                requestSearch();
              }}
              onSearch={(search) =>
                {
                  setSearchQuery({ ...searchQuery, partyFilter: search });
                  requestSearch();
                }
              }
              onSelect={(value: string) => {
                setSearchQuery({ ...searchQuery, partyFilter: value });
                requestSearch();
              }}
            >
              {parties.map((party: string) => (
                <Option key={party} value={party}>
                  {party}
                </Option>
              ))}
            </AutoComplete>
          </Col>
          <Col span={6}>
            <Select
              size="large"
              style={{ width: "100%" }}
              allowClear
              value={gender}
              onChange={(action) =>{
                setSearchQuery({ ...searchQuery, gender: action })
                requestSearch();
              }}
            >
              <Option value="mujer">Mujer</Option>
              <Option value="hombre">Hombre</Option>
            </Select>
          </Col>
          <Col span={2}>
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
