import { Form, Input, Select, Button, InputNumber } from "antd";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Politician } from "../Common/interfaces/Politician.interface";
import {
  deletePoliticianById,
  getPoliticianById,
  updatePoliticianById,
} from "../Common/services/Politicians.API";

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
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size="large"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          label="Nombre"
          rules={[{ required: true, message: "El nombre es requerido" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Género" name="gender">
          <Select>
            <Select.Option value="Mujer">Mujer</Select.Option>
            <Select.Option value="Hombre">Hombre</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="institution"
          label="Institución"
          rules={[{ required: true, message: "La institución es requerida" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="community" label="CCAA">
          <Input />
        </Form.Item>
        <Form.Item name="baseSalary" label="Sueldo Base">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button.Group>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
            <Button type="primary" danger onClick={() => deleteHandler(id)}>
              Eliminar
            </Button>
          </Button.Group>
        </Form.Item>
        <Form.Item>
          <Button.Group>
            <Button onClick={backHandler}>Volver</Button>
          </Button.Group>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PoliticianEditor;
