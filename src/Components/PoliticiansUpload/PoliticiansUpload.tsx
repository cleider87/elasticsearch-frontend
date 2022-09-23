import { UploadOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { uploadPoliticiansData } from "../Common/services/Politicians.API";

function PoliticianUpload() {
  const formData = new FormData();
  let navigate = useNavigate();

  const sendFile = async (e: any) => {
    await uploadPoliticiansData(formData);
    navigate("/");
  };

  const loadFile = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      formData.append("file", file, file.name);
    }
  };

  return (
    <div
      style={{ padding: 24, justifyContent: "center", alignContent: "center" }}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        className="login-form"
        size="large"
        onFinish={sendFile}
      >
        <Form.Item
          name="file"
          label="Archivo CSV"
          rules={[{ required: true, message: "El archivo es requerido" }]}
          style={{ width: "100%" }}
        >
          <Input type="file" accept="text/csv" onChange={loadFile} />
        </Form.Item>
        <Form.Item style={{ width: "100%" }}>
          <Button
            icon={<UploadOutlined />}
            block
            type="primary"
            htmlType="submit"
          >
            Procesar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PoliticianUpload;
