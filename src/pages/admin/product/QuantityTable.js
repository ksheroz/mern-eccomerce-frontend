import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";

function QuantityTable({ quantity, setQuantity }) {
  const [columns, setColumns] = useState([
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.key)}>Delete</a>
        </Space>
      ),
    },
  ]);

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  const handleDelete = (key) => {
    console.log("handleDelete called!");
    setQuantity((prev) => prev.filter((item) => item.key !== key));
  };

  return (
    <>
      <Table columns={columns} dataSource={quantity} />
    </>
  );
}

export default QuantityTable;
