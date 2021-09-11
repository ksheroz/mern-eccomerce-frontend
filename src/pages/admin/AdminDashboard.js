import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";

function AdminDashboard() {
  return (
    <>
      <Row>
        <Col sm={{ span: 6, offset: 0 }} xs={{ span: 0, offset: 0 }}>
          <AdminNav />
        </Col>
        <Col sm={{ span: 18, offset: 0 }} xs={{ span: 20, offset: 2 }}>
          <h4>Admin Dashboard</h4>
        </Col>
      </Row>
    </>
  );
}

export default AdminDashboard;
