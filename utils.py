def calculate_old_regime(amount, exemptions=0, deductions=50_000):
    ctc = amount
    basic_salary = ctc * 0.5
    epf = min(basic_salary * 0.12, 750_000)
    gross_salary = ctc - epf
    net_salary = gross_salary - exemptions
    taxable_income = net_salary - deductions

    tax = 0
    if taxable_income <= 500_000:
        return tax

    # Slab tax calculation
    tax = (
        min(max(taxable_income - 0, 0), 250_000) * 0
        + min(max(taxable_income - 250_000, 0), 500_000 - 250_000) * 0.05
        + min(max(taxable_income - 500_000, 0), 1_000_000 - 500_000) * 0.2
        + max(taxable_income - 1_000_000, 0) * 0.3
    )

    # Surcharge
    if taxable_income > 50_000_000:
        tax += tax * 0.25
    elif taxable_income > 20_000_000:
        tax += tax * 0.25
    elif taxable_income > 10_000_000:
        tax += tax * 0.15
    elif taxable_income > 5_000_000:
        tax += tax * 0.10

    # Health and education cess
    tax += tax * 0.04

    return tax


def calculate_new_regime(amount, exemptions=0, deductions=75_000):
    ctc = amount
    basic_salary = ctc * 0.5
    epf = min(basic_salary * 0.12, 750_000)
    gross_salary = ctc - epf
    net_salary = gross_salary - exemptions
    taxable_income = net_salary - deductions

    tax = 0
    if taxable_income <= 700_000:
        return tax

    # Slab tax calculation
    tax = (
        min(max(taxable_income - 0, 0), 300_000) * 0
        + min(max(taxable_income - 300_000, 0), 600_000 - 300_000) * 0.05
        + min(max(taxable_income - 600_000, 0), 900_000 - 600_000) * 0.1
        + min(max(taxable_income - 900_000, 0), 1_200_000 - 900_000) * 0.15
        + min(max(taxable_income - 1_200_000, 0), 1_500_000 - 1_200_000) * 0.2
        + max(taxable_income - 1_500_000, 0) * 0.3
    )

    # Surcharge
    if taxable_income > 50_000_000:
        tax += tax * 0.25
    elif taxable_income > 20_000_000:
        tax += tax * 0.25
    elif taxable_income > 10_000_000:
        tax += tax * 0.15
    elif taxable_income > 5_000_000:
        tax += tax * 0.10

    # Health and education cess
    tax += tax * 0.04

    return tax


def approximate_ctc(target_tax, exemptions=0, deductions=50_000):
    # Initial guess and range for CTC
    ctc_guess = 0
    step = 10_000
    tolerance = 3000  # tolerance level for approximating the tax

    while True:
        calculated_tax = calculate_new_regime(ctc_guess, exemptions, deductions)
        if abs(calculated_tax - target_tax) < tolerance:
            break
        ctc_guess += step

    return ctc_guess
