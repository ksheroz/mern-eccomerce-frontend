import React, { useState, useEffect } from "react";
import {
  Col,
  InputNumber,
  Row,
  Form,
  Input,
  Select,
  Button,
  Divider,
  List,
} from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  createProduct,
  getAllBrands,
  getAllColors,
  getAllSizes,
} from "../../../functions/product";
import Title from "antd/lib/typography/Title";
import {
  CloseSquareTwoTone,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import QuantityTable from "./QuantityTable";

const { TextArea } = Input;
const { Option } = Select;

const initialValues = {
  articleNo: "",
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  images: [],
  quantity: [],
  brand: "",
  categories: [],
};

function ProductCreate() {
  // const [values, setValues] = useState(initialValues);
  // const [loading, setLoading] = useState(false);
  // const [brands, setBrands] = useState([]);

  // // destructure
  // const {
  //   articleNo,
  //   title,
  //   description,
  //   price,
  //   categories,
  //   category,
  //   subs,
  //   quantity,
  //   images,
  //   brand,
  // } = values;

  // // redux
  // const { user } = useSelector((state) => ({ ...state }));

  // useEffect(() => {
  //   getAllBrands()
  //     .then((res) => {
  //       setBrands(res.data);
  //     })
  //     .catch();
  // }, []);

  // useEffect(() => {
  //   console.log(quantity);
  // }, [quantity]);

  // const productCreateForm = () => (
  //   <Form
  //     name="categoryForm"
  //     labelCol={{ span: 8 }}
  //     wrapperCol={{ span: 16 }}
  //     //   onFinish={handleSubmit}
  //     onValuesChange={onValuesChange}
  //   >
  //     <Form.Item
  //       wrapperCol={{
  //         span: 24,
  //       }}
  //     >
  //       {loading ? (
  //         <Title type="success" level={3}>
  //           Loading...
  //         </Title>
  //       ) : (
  //         <Title level={3}>Add a new Product</Title>
  //       )}
  //     </Form.Item>

  //     <Form.Item
  //       label="Title"
  //       name="name"
  //       rules={[
  //         { type: "string" },
  //         { required: true, message: "Please input a valid title!" },
  //       ]}
  //     >
  //       <Input />
  //     </Form.Item>

  //     <Form.Item
  //       label="Article Number"
  //       name="articleNo"
  //       rules={[
  //         { type: "string" },
  //         { required: true, message: "Please input a valid Article Number!" },
  //       ]}
  //     >
  //       <Input />
  //     </Form.Item>

  //     <Form.Item
  //       label="Description"
  //       name="description"
  //       rules={[
  //         { type: "string" },
  //         { required: true, message: "Please input a description!" },
  //       ]}
  //     >
  //       <TextArea rows={4} />
  //     </Form.Item>

  //     <Form.Item label="Size" name="size">
  //       <Select
  //         style={{ width: 240 }}
  //         placeholder="Size"
  //         dropdownRender={(menu) => (
  //           <div>
  //             {menu}
  //             <Divider style={{ margin: "4px 0" }} />
  //             <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
  //               <Input
  //                 style={{ flex: "auto" }}
  //                 value={localState.size}
  //                 onChange={(e) =>
  //                   setLocalState({ ...localState, size: e.target.value })
  //                 }
  //               />
  //               <a
  //                 style={{
  //                   flex: "none",
  //                   padding: "8px",
  //                   display: "block",
  //                   cursor: "pointer",
  //                 }}
  //                 onClick={addSize}
  //               >
  //                 <PlusOutlined /> Add item
  //               </a>
  //             </div>
  //           </div>
  //         )}
  //       >
  //         {sizes.map((size) => (
  //           <Option key={size}>{size}</Option>
  //         ))}
  //       </Select>
  //     </Form.Item>
  //     <Form.Item label="Color" name="color">
  //       <Select
  //         style={{ width: 240 }}
  //         placeholder="Color"
  //         dropdownRender={(menu) => (
  //           <div>
  //             {menu}
  //             <Divider style={{ margin: "4px 0" }} />
  //             <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
  //               <Input
  //                 style={{ flex: "auto" }}
  //                 value={localState.color}
  //                 onChange={(e) =>
  //                   setLocalState({ ...localState, color: e.target.value })
  //                 }
  //               />
  //               <a
  //                 style={{
  //                   flex: "none",
  //                   padding: "8px",
  //                   display: "block",
  //                   cursor: "pointer",
  //                 }}
  //                 onClick={addColor}
  //               >
  //                 <PlusOutlined /> Add item
  //               </a>
  //             </div>
  //           </div>
  //         )}
  //       >
  //         {colors.map((color) => (
  //           <Option key={color}>{color}</Option>
  //         ))}
  //       </Select>
  //     </Form.Item>
  //     <Form.Item label="Available Quantity" name="available">
  //       <InputNumber min={1} />
  //     </Form.Item>
  //     <Form.Item
  //       wrapperCol={{
  //         sm: {
  //           span: 16,
  //           offset: 8,
  //         },
  //         xs: { span: 24, offset: 0 },
  //       }}
  //     >
  //       <Button
  //         htmlType="submit"
  //         type="primary"
  //         danger
  //         block
  //         onClick={addQuantity}
  //       >
  //         Add Assortment
  //       </Button>
  //     </Form.Item>
  //     <Form.Item
  //       wrapperCol={{
  //         sm: {
  //           span: 16,
  //           offset: 8,
  //         },
  //         xs: { span: 24, offset: 0 },
  //       }}
  //     >
  //       <List
  //         itemLayout="horizontal"
  //         dataSource={quantity}
  //         renderItem={(item) => (
  //           <List.Item
  //             style={{
  //               borderRadius: "10px",
  //               padding: "1em",
  //               backgroundColor: "#faad14",
  //               margin: "0.25em",
  //             }}
  //           >
  //             <List.Item.Meta title={item.size} />
  //             <Button
  //               type="primary"
  //               danger
  //               onClick={() => handleRemove(item.size, item.color)}
  //               icon={<DeleteOutlined />}
  //             ></Button>
  //           </List.Item>
  //         )}
  //       />
  //     </Form.Item>

  //     <Form.Item label="Brand" name="brand">
  //       <Select
  //         style={{ width: 240 }}
  //         placeholder="Brand"
  //         dropdownRender={(menu) => (
  //           <div>
  //             {menu}
  //             <Divider style={{ margin: "4px 0" }} />
  //             <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
  //               <Input
  //                 style={{ flex: "auto" }}
  //                 value={localState.brand}
  //                 onChange={(e) =>
  //                   setLocalState({ ...localState, brand: e.target.value })
  //                 }
  //               />
  //               <a
  //                 style={{
  //                   flex: "none",
  //                   padding: "8px",
  //                   display: "block",
  //                   cursor: "pointer",
  //                 }}
  //                 onClick={addBrand}
  //               >
  //                 <PlusOutlined /> Add item
  //               </a>
  //             </div>
  //           </div>
  //         )}
  //       >
  //         {brands.map((brand) => (
  //           <Option key={brand}>{brand}</Option>
  //         ))}
  //       </Select>
  //     </Form.Item>

  //     <Form.Item
  //       label="Price"
  //       name="price"
  //       rules={[
  //         { type: "number" },
  //         { required: true, message: "Please input a valid price!" },
  //       ]}
  //     >
  //       <InputNumber min={1} />
  //     </Form.Item>

  //     <Form.Item
  //       wrapperCol={{
  //         sm: {
  //           span: 16,
  //           offset: 8,
  //         },
  //         xs: { span: 24, offset: 0 },
  //       }}
  //     >
  //       <Button htmlType="submit" type="primary" block>
  //         Save
  //       </Button>
  //     </Form.Item>
  //   </Form>
  // );

  return (
    <>
      <Row>
        <Col sm={{ span: 4, offset: 0 }} xs={{ span: 0, offset: 0 }}>
          <AdminNav />
        </Col>
        <Col
          sm={{ span: 12, offset: 2 }}
          xs={{ span: 20, offset: 2 }}
          style={{ marginTop: "1.5rem" }}
        >
          {/* {productCreateForm()} */}
          <QuantityTable />
        </Col>
      </Row>
    </>
  );
}

export default ProductCreate;
