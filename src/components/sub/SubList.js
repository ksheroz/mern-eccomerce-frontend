import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";
import { Button, Row, Typography } from "antd";

const { Title } = Typography;

function SubList() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);
  const showSubs = () =>
    subs.map((c) => (
      <Button key={c._id} type="default" style={{ margin: "0.5em" }}>
        <Link to={`/sub/${c.slug}`}>{c.name}</Link>
      </Button>
    ));

  return (
    <Row justify="center">
      {loading ? (
        <Title level={4} style={{ textAlign: "center" }}>
          Loading...
        </Title>
      ) : (
        showSubs()
      )}
    </Row>
  );
}

export default SubList;
