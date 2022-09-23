import { Menu } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import { Route, Routes, useNavigate } from "react-router-dom";
import PoliticianEditor from "./Components/PoliticianEditor/PoliticianEditor";
import Politicians from "./Components/Politicians/Politicians";
import PoliticianUpload from "./Components/PoliticiansUpload/PoliticiansUpload";
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
            defaultSelectedKeys={["0"]}
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
              {
                key: "2",
                label: `Cargar Datos`,
                onClick: () => {
                  navigate(`/upload`);
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
              <Route path="politicians/:id" element={<PoliticianEditor />} />
              <Route path="politicians" element={<Politicians />}></Route>
              <Route path="upload" element={<PoliticianUpload />} />
              <Route path="/" element={<Statistics />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
}

export default App;
