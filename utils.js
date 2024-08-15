const calculate_old_regime = (amount, exemptions = 0, deductions = 50_000) => {
  const ctc = amount;
  const basic_salary = amount * 0.5;
  const epf = Math.min(basic_salary * 0.12, 750_000);
  const gross_salary = ctc - epf;
  const net_salary = gross_salary - exemptions;
  const taxable_income = net_salary - deductions;

  let tax = 0;
  if (taxable_income <= 500_000) {
    return tax;
  }

  // Slab tax
  tax =
    Math.min(Math.max(taxable_income - 0, 0), 250_000) * 0 +
    Math.min(Math.max(taxable_income - 250_000, 0), 500_000 - 250_000) * 0.05 +
    Math.min(Math.max(taxable_income - 500_000, 0), 1_000_000 - 500_000) * 0.2 +
    Math.max(taxable_income - 1_000_000, 0) * 0.3;

  // Surcharge
  if (taxable_income > 50_000_000) {
    tax += tax * 0.25; // Updated to 25%
  } else if (taxable_income > 20_000_000) {
    tax += tax * 0.25; // Updated to 25%
  } else if (taxable_income > 10_000_000) {
    tax += tax * 0.15;
  } else if (taxable_income > 5_000_000) {
    tax += tax * 0.1;
  }

  // Health and education cess
  tax += tax * 0.04;

  return tax;
};

const calculate_new_regime = (amount, exemptions = 0, deductions = 75_000) => {
  const ctc = amount;
  const basic_salary = amount * 0.5;
  const epf = Math.min(basic_salary * 0.12, 750_000);
  const gross_salary = ctc - epf;
  const net_salary = gross_salary - exemptions;
  const taxable_income = net_salary - deductions;

  let tax = 0;
  if (taxable_income <= 700_000) {
    return tax;
  }

  // Slab tax
  tax =
    Math.min(Math.max(taxable_income - 0, 0), 300_000) * 0 +
    Math.min(Math.max(taxable_income - 300_000, 0), 600_000 - 300_000) * 0.05 +
    Math.min(Math.max(taxable_income - 600_000, 0), 900_000 - 600_000) * 0.1 +
    Math.min(Math.max(taxable_income - 900_000, 0), 1_200_000 - 900_000) *
      0.15 +
    Math.min(Math.max(taxable_income - 1_200_000, 0), 1_500_000 - 1_200_000) *
      0.2 +
    Math.max(taxable_income - 1_500_000, 0) * 0.3;

  // Surcharge
  if (taxable_income > 50_000_000) {
    tax += tax * 0.25; // Updated to 25%
  } else if (taxable_income > 20_000_000) {
    tax += tax * 0.25; // Updated to 25%
  } else if (taxable_income > 10_000_000) {
    tax += tax * 0.15;
  } else if (taxable_income > 5_000_000) {
    tax += tax * 0.1;
  }

  // Health and education cess
  tax += tax * 0.04;

  return tax;
};

const approximate_ctc = (target_tax, exemptions = 0, deductions = 50_000) => {
  let ctc_guess = 0;
  const step = 10_000;
  const tolerence = 3000;

  while (true) {
    let calculated_tax = calculate_new_regime(
      ctc_guess,
      exemptions,
      deductions
    );
    if (Math.abs(calculated_tax - target_tax) < tolerence) {
      break;
    }
    ctc_guess += step;
  }
  return ctc_guess;
};
