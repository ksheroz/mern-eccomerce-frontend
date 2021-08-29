import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import { Col, Row } from "antd";

function AdminDashboard() {
  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 0 }} xs={{ span: 0, offset: 0 }}>
          <AdminNav />
        </Col>
        <Col sm={{ span: 19, offset: 0 }} xs={{ span: 20, offset: 2 }}></Col>
      </Row>
    </>
  );
}

export default AdminDashboard;
