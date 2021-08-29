import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "antd";

function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      <Row justify="center">
        <Col style={{ padding: "2.5rem" }}>
          Redirecting you in {count} seconds
        </Col>
      </Row>
    </>
  );
}

export default LoadingToRedirect;
