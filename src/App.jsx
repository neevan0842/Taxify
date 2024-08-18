import React, { useContext, useEffect } from "react";
import NavBar from "./components/NavBar";
import ThemeContext from "./context/theme/ThemeContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CalculationCard from "./components/CalculationCard";
import { calculate_new_regime, calculate_old_regime } from "./utilities/utils";

const App = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute(
      "data-bs-theme",
      theme === "light" ? "light" : "dark"
    );
  }, [theme]);

  return (
    <>
      <NavBar />
      <Container className="my-4 py-4">
        <Row xs={1} md={2} className="g-5">
          <Col>
            <CalculationCard
              heading={"Old Tax Regime"}
              cal_func={calculate_old_regime}
            />
          </Col>
          <Col>
            <CalculationCard
              heading={"New Tax Regime"}
              cal_func={calculate_new_regime}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
