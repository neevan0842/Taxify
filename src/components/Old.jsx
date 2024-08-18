import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import {
  approximate_ctc,
  calculate_old_regime,
  formatNumberIndian,
  parseIndianNumber,
} from "../utilities/utils";
import InputGroup from "react-bootstrap/InputGroup";

const Old = () => {
  const [data, setdata] = useState({
    CtcOrTax: "",
    exemptions: "",
    deductions: "",
  });
  const [Convertion, setConvertion] = useState("CtcToTax");
  const { theme, colors } = useContext(ThemeContext);
  const [Amount, setAmount] = useState(0);

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: parseIndianNumber(e.target.value) });
  };

  const toggleConvertion = () => {
    if (Convertion === "CtcToTax") {
      setConvertion("TaxToCtc");
    } else {
      setConvertion("CtcToTax");
    }
  };

  useEffect(() => {
    if (Convertion === "CtcToTax") {
      setAmount(
        calculate_old_regime(
          data.CtcOrTax,
          data.exemptions,
          data.deductions + 50_000
        )
      );
    } else {
      setAmount(
        approximate_ctc(
          data.CtcOrTax,
          data.exemptions,
          data.deductions + 50_000,
          calculate_old_regime
        )
      );
    }
  }, [data]);

  return (
    <div>
      <Card>
        <Card.Header className="text-center">
          <strong>Old Tax Regime</strong>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicCTC">
              <Form.Label>
                {Convertion === "CtcToTax" ? "CTC" : "Target Tax"}
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>₹</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={
                    Convertion === "CtcToTax" ? "Enter CTC" : "Enter Tax"
                  }
                  onChange={handleChange}
                  name="CtcOrTax"
                  value={formatNumberIndian(data.CtcOrTax)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicExemptions">
              <Form.Label>Exemptions</Form.Label>
              <InputGroup>
                <InputGroup.Text>₹</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter Exemptions"
                  onChange={handleChange}
                  name="exemptions"
                  value={formatNumberIndian(data.exemptions)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDeductions">
              <Form.Label>Deductions</Form.Label>
              <InputGroup>
                <InputGroup.Text>₹</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter Deductions"
                  onChange={handleChange}
                  name="deductions"
                  value={formatNumberIndian(data.deductions)}
                />
              </InputGroup>
              <Form.Text className="text-muted">
                Standard Deduction of ₹50,000 already considered.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={toggleConvertion}>
              {Convertion === "CtcToTax" ? "CTC to Tax" : "Tax to CTC"}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="d-flex justify-content-between px-2">
            <div>
              {Convertion === "CtcToTax" ? "Tax Amount:" : "Approx CTC:"}
            </div>
            <div>{`\u20B9 ${formatNumberIndian(Amount.toFixed(2))}`}</div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Old;
