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
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute(
      "data-bs-theme",
      theme === "light" ? "dark" : "light"
    );
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
