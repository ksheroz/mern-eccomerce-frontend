import { Col, Row } from "antd";
import React from "react";
import UserNav from "../../components/nav/UserNav";

function History() {
  return (
    <>
      <Row>
        <Col sm={{ span: 4, offset: 0 }} xs={{ span: 0, offset: 0 }}>
          <UserNav />
        </Col>
        <Col sm={{ span: 20, offset: 0 }} xs={{ span: 20, offset: 2 }}>
          <h4>Hello from History</h4>
        </Col>
      </Row>
    </>
  );
}

export default History;
