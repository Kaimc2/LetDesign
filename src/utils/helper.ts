/**
 * Convert phone number string into hidden format.
 * Example: "012345678" -> "+855 xxx xxx x78"
 *
 * @param phoneNumber - The original phone number string.
 * @param countryCode - The country code to prepend (default: "+855").
 * @param hiddenPattern - The pattern for the hidden part (default: "xxx xxx x").
 * @returns The formatted phone number string.
 */
export function hidePhoneNumber(
  phoneNumber: string,
  countryCode: string = "+855",
  hiddenPattern: string = "xxx xxx x"
): string {
  // Ensure the phone number is long enough to match the hidden pattern
  if (phoneNumber.length < hiddenPattern.length) {
    throw new Error("Phone number is too short");
  }

  const visiblePart = phoneNumber.slice(-2); // Extract last two digits
  return `${countryCode} ${hiddenPattern}${visiblePart}`;
}
