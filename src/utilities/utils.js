const calculate_tax = (taxable_income, slabs, surcharges) => {
  let tax = 0;

  // Calculate slab tax
  slabs.forEach((slab) => {
    const [start, end, rate] = slab;
    tax += Math.min(Math.max(taxable_income - start, 0), end - start) * rate;
  });

  // Apply surcharge
  surcharges.forEach(([limit, rate]) => {
    if (taxable_income > limit) {
      tax += tax * rate;
      return;
    }
  });

  // Apply health and education cess (4%)
  tax += tax * 0.04;

  return tax;
};

const calculate_old_regime = (amount, exemptions = 0, deductions = 50_000) => {
  const slabs = [
    [0, 250_000, 0],
    [250_000, 500_000, 0.05],
    [500_000, 1_000_000, 0.2],
    [1_000_000, Infinity, 0.3],
  ];

  const surcharges = [
    [50_000_000, 0.25],
    [20_000_000, 0.25],
    [10_000_000, 0.15],
    [5_000_000, 0.1],
  ];

  const ctc = amount;
  const basic_salary = ctc * 0.5;
  const epf = Math.min(basic_salary * 0.12, 750_000);
  const gross_salary = ctc - epf;
  const net_salary = Math.max(gross_salary - exemptions, 0);
  const taxable_income = Math.max(net_salary - deductions, 0);

  if (taxable_income <= 500_000) {
    return 0;
  }

  return calculate_tax(taxable_income, slabs, surcharges);
};

const calculate_new_regime = (amount, exemptions = 0, deductions = 75_000) => {
  const slabs = [
    [0, 300_000, 0],
    [300_000, 600_000, 0.05],
    [600_000, 900_000, 0.1],
    [900_000, 1_200_000, 0.15],
    [1_200_000, 1_500_000, 0.2],
    [1_500_000, Infinity, 0.3],
  ];

  const surcharges = [
    [50_000_000, 0.25],
    [20_000_000, 0.25],
    [10_000_000, 0.15],
    [5_000_000, 0.1],
  ];

  const ctc = amount;
  const basic_salary = ctc * 0.5;
  const epf = Math.min(basic_salary * 0.12, 750_000);
  const gross_salary = ctc - epf;
  const net_salary = Math.max(gross_salary - exemptions, 0);
  const taxable_income = Math.max(net_salary - deductions, 0);

  if (taxable_income <= 700_000) {
    return 0;
  }

  return calculate_tax(taxable_income, slabs, surcharges);
};

const approximate_ctc = (
  target_tax,
  exemptions = 0,
  deductions = 50_000,
  calculate_tax_func
) => {
  let ctc_guess = 0;
  const step = 1_000;
  const tolerance = 1_0000;
  const max_iterations = 100_000;
  let iteration_count = 0;

  if (target_tax < 26_000) {
    return -1;
  } else if (target_tax > 100_000_000) {
    return -2;
  }

  while (iteration_count < max_iterations) {
    const calculated_tax = calculate_tax_func(
      ctc_guess,
      exemptions,
      deductions
    );
    // console.log(ctc_guess, calculated_tax);
    if (Math.abs(calculated_tax - target_tax) < tolerance) {
      break;
    }
    ctc_guess += step;
    iteration_count++;
  }
  if (iteration_count === max_iterations) {
    return -3;
  }
  return ctc_guess;
};

const formatNumberIndian = (number) => {
  // Convert the number to a string and split it into integer and fractional parts (if any)
  const [integerPart, fractionalPart] = number.toString().split(".");

  // Add commas to the integer part according to Indian numbering format
  const lastThreeDigits = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);

  const formattedIntegerPart = otherDigits
    ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThreeDigits
    : lastThreeDigits;

  // Combine the integer part with the fractional part (if any)
  return fractionalPart
    ? `${formattedIntegerPart}.${fractionalPart}`
    : formattedIntegerPart;
};

const parseIndianNumber = (str) => {
  if (str === "") {
    return "";
  } else {
    return parseFloat(str.replace(/,/g, ""));
  }
};

const allowOnlyNumbers = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

export {
  calculate_new_regime,
  calculate_old_regime,
  approximate_ctc,
  formatNumberIndian,
  parseIndianNumber,
  allowOnlyNumbers,
};
