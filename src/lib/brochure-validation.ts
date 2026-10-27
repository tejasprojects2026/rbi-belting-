export type BrochureField = "name" | "company" | "phone" | "email";
export type BrochureValues = Record<BrochureField, string>;

export function validateBrochure(values: BrochureValues) {
  const errors: Partial<Record<BrochureField, string>> = {};
  const name = values.name.trim();
  if (name.length < 2 || name.length > 100 || !/\p{L}/u.test(name) || !/^[\p{L}\p{M}\s.'’\-]+$/u.test(name)) {
    errors.name = "Enter your name (2–100 characters, using letters, spaces, apostrophes or hyphens).";
  }
  if (values.company.trim().length > 120) errors.company = "Company must be 120 characters or fewer.";
  const phoneError = validateBrochurePhone(values.phone);
  if (phoneError) errors.phone = phoneError;
  const emailError = validateBrochureEmail(values.email);
  if (emailError) errors.email = emailError;
  return errors;
}

export function validateBrochureEmail(value: string): string | undefined {
  const email = value.trim();
  if (!email) return "Please enter your email address.";
  const [local = "", domain = ""] = email.split("@");
  const providerCorrections: Record<string, string> = {
    "gmail.co": "gmail.com",
    "gmail.con": "gmail.com",
    "gmail.cmo": "gmail.com",
    "gmai.com": "gmail.com",
    "gmial.com": "gmail.com",
    "gamil.com": "gmail.com",
    "yahoo.con": "yahoo.com",
    "outlook.con": "outlook.com",
    "hotmail.con": "hotmail.com",
  };
  const correction = providerCorrections[domain.toLowerCase()];
  if (correction) return `Check your email domain. Did you mean ${local}@${correction}?`;
  const validDomain = domain.split(".").every(label => /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label));
  if (email.length > 200 || local.length > 64 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email) || local.startsWith(".") || local.endsWith(".") || local.includes("..") || !validDomain) {
    return "Enter a valid email address, such as name@company.com.";
  }
  return undefined;
}

export function validateBrochurePhone(value: string): string | undefined {
  const phone = value.trim();
  if (!phone) return "Please enter your phone number.";
  if (!/^\+?[\d\s()\-]+$/.test(phone)) return "Use only digits and an optional country code, such as +91.";
  const digits = phone.replace(/\D/g, "");
  const indianCountryCode = phone.startsWith("+91") || (digits.startsWith("91") && digits.length > 10);
  if (indianCountryCode && digits.length !== 12) return "Enter exactly 10 digits after the +91 country code.";
  if (!phone.startsWith("+") && !indianCountryCode && digits.length > 10) return "Enter a 10-digit phone number, or include an international country code starting with +.";
  if (digits.length < 10) return `Phone number is too short (${digits.length} digits). Enter at least 10 digits.`;
  if (digits.length > 15) return "Phone number is too long. Enter no more than 15 digits including the country code.";
  if (/^(\d)\1+$/.test(digits)) return "Please enter a valid phone number.";
  return undefined;
}
