const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_ALLOWED_CHARS_REGEX = /^[+\d\s-]+$/;

/**
 * Validates a single field of the Contact Agent form.
 * Returns an error string or an empty string if valid.
 */
export function validateContactField(fieldName, value) {
  const trimmed = (value || '').trim();

  switch (fieldName) {
    case 'name': {
      if (!trimmed) {
        return 'Please enter your full name.';
      }
      if (trimmed.length < 2) {
        return 'Name must be at least 2 characters.';
      }
      return '';
    }

    case 'email': {
      if (!trimmed) {
        return 'Please enter your email address.';
      }
      if (!EMAIL_REGEX.test(trimmed)) {
        return 'Please enter a valid email address.';
      }
      return '';
    }

    case 'phone': {
      if (!trimmed) {
        return 'Please enter your phone number.';
      }
      if (!PHONE_ALLOWED_CHARS_REGEX.test(trimmed)) {
        return 'Phone number may only contain digits, +, spaces, and dashes.';
      }
      const digitsOnly = trimmed.replace(/\D/g, '');
      if (digitsOnly.length < 10 || digitsOnly.length > 14) {
        return 'Phone number must contain between 10 and 14 digits.';
      }
      return '';
    }

    case 'message': {
      if (!trimmed) {
        return 'Please include a short message.';
      }
      if (trimmed.length < 10) {
        return 'Message must be at least 10 characters.';
      }
      return '';
    }

    default:
      return '';
  }
}

/**
 * Validates all Contact Agent form fields and returns an errors object.
 */
export function validateContactForm(values) {
  return {
    name: validateContactField('name', values.name),
    email: validateContactField('email', values.email),
    phone: validateContactField('phone', values.phone),
    message: validateContactField('message', values.message),
  };
}

/**
 * Returns true if the errors object contains any non-empty error messages.
 */
export function hasValidationErrors(errors) {
  return Object.values(errors).some((message) => Boolean(message));
}
