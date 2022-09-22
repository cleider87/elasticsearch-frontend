import { Menu } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import { Route, Routes, useNavigate } from "react-router-dom";
import PoliticianEditor from "./Components/Politician/Politician";
import Politicians from "./Components/Politicians/Politicians";
import Statistics from "./Components/Statistics/Statistics";

function App() {
  let navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "0",
                label: `Inicio`,
                onClick: () => {
                  navigate(`/`);
                },
              },
              {
                key: "1",
                label: `Políticos`,
                onClick: () => {
                  navigate(`/politicians`);
                },
              },
            ]}
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <Route path="/" element={<Statistics />} />
              <Route path="politicians" element={<Politicians />}></Route>
              <Route path="politicians/:id" element={<PoliticianEditor />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
}

export default App;
