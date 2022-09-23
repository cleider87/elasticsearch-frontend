import { EuroCircleOutlined } from "@ant-design/icons";
import { Form, Input, Select, Button, InputNumber } from "antd";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Politician } from "../Common/interfaces/Politician.interface";
import {
  deletePoliticianById,
  getPoliticianById,
  updatePoliticianById,
} from "../Common/services/Politicians.API";
import "./PoliticianEditor.css";

function PoliticianEditor() {
  const [form] = Form.useForm();
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (id)
      getPoliticianById(id).then((response) => {
        form.setFieldsValue(response);
      });
  }, [id, form]);

  const onFinish = async (values: Partial<Politician>) => {
    if (id) await updatePoliticianById(id, values);
  };

  const backHandler = () => navigate("/politicians");

  const deleteHandler = async (id?: string) => {
    if (id) await deletePoliticianById(id);
    backHandler();
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
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          label="Nombre"
          rules={[{ required: true, message: "El nombre es requerido" }]}
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Género" name="gender" style={{ width: "100%" }}>
          <Select>
            <Select.Option value="Mujer">Mujer</Select.Option>
            <Select.Option value="Hombre">Hombre</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="institution"
          label="Institución"
          rules={[{ required: true, message: "La institución es requerida" }]}
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>
        <Form.Item name="community" label="CCAA">
          <Input />
        </Form.Item>
        <Form.Item
          name="baseSalary"
          label="Sueldo Base"
          style={{ width: "100%" }}
        >
          <InputNumber
            prefix={<EuroCircleOutlined />}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="observations"
          label="Observaciones"
          style={{ width: "100%" }}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item style={{ width: "100%" }}>
          <Button block type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
        <Form.Item style={{ width: "100%" }}>
          <Button block type="primary" danger onClick={() => deleteHandler(id)}>
            Eliminar
          </Button>
        </Form.Item>
        <Form.Item style={{ width: "100%" }}>
          <Button block onClick={backHandler}>
            Volver
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PoliticianEditor;
