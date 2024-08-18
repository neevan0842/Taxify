import React, { useContext, useEffect } from "react";
import NavBar from "./components/NavBar";
import ThemeContext from "./context/ThemeContext";
import Alertx from "./components/Alertx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import New from "./components/New";
import Old from "./components/Old";

const App = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "#F8F9FA" : "#121212";
  }, [theme]);

  return (
    <>
      <NavBar />
      <Alertx />
      <Container>
        <Row xs={1} md={2}>
          <Col>
            <Old />
          </Col>
          <Col>
            <New />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
