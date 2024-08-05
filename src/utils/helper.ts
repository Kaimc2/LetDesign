import toast from "react-hot-toast";

/**
 * Convert phone number string into hidden format.
 * Example: "012345678" -> "+855 xxx xxx x78"
 *
 * @param phoneNumber - The original phone number string.
 * @param countryCode - The country code to prepend (default: "+855").
 * @param hiddenPattern - The pattern for the hidden part (default: "xxx xxx x").
 * @returns The formatted phone number string.
 */
export const hidePhoneNumber = (
  phoneNumber: string,
  countryCode: string = "+855",
  hiddenPattern: string = "xxx xxx x"
): string => {
  // Ensure the phone number is long enough to match the hidden pattern
  if (phoneNumber.length < hiddenPattern.length) {
    throw new Error("Phone number is too short");
  }

  const visiblePart = phoneNumber.slice(-2); // Extract last two digits
  return `${countryCode} ${hiddenPattern}${visiblePart}`;
};

/**
 * Display a notification based on it status
 *
 * @param message - The message you want to display
 * @param status - The status of the notification
 */
export const displayNotification = (message: string, status: string) => {
  switch (status) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "normal":
      toast(message);
      break;
    default:
      break;
  }
};

export const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toDateString();
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^0(1|6|7|8|9)\d{7,8}$/;
  return phoneRegex.test(phoneNumber);
};

export const evaluatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
};
