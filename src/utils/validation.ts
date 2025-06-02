
export interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string[] };
}

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    test: (value) => value !== null && value !== undefined && value !== '',
    message
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    test: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || emailRegex.test(value);
    },
    message
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    test: (value) => !value || value.length >= min,
    message: message || `Must be at least ${min} characters long`
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    test: (value) => !value || value.length <= max,
    message: message || `Must be no more than ${max} characters long`
  }),

  password: (message = 'Password must contain at least 8 characters, including uppercase, lowercase, and number'): ValidationRule => ({
    test: (value) => {
      if (!value) return false;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasMinLength = value.length >= 8;
      return hasUpper && hasLower && hasNumber && hasMinLength;
    },
    message
  }),

  match: (otherValue: any, fieldName = 'password', message?: string): ValidationRule => ({
    test: (value) => value === otherValue,
    message: message || `Must match ${fieldName}`
  }),

  numeric: (message = 'Must be a valid number'): ValidationRule => ({
    test: (value) => !value || !isNaN(Number(value)),
    message
  }),

  positiveNumber: (message = 'Must be a positive number'): ValidationRule => ({
    test: (value) => !value || (Number(value) > 0),
    message
  }),

  url: (message = 'Must be a valid URL'): ValidationRule => ({
    test: (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message
  }),

  phone: (message = 'Please enter a valid phone number'): ValidationRule => ({
    test: (value) => {
      if (!value) return true;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(value.replace(/\s/g, ''));
    },
    message
  })
};

// Validate a single field
export const validateField = (value: any, rules: ValidationRule[]): string[] => {
  const errors: string[] = [];
  
  for (const rule of rules) {
    if (!rule.test(value)) {
      errors.push(rule.message);
    }
  }
  
  return errors;
};

// Validate an entire form
export const validateForm = (data: { [key: string]: any }, schema: ValidationSchema): ValidationResult => {
  const errors: { [key: string]: string[] } = {};
  let isValid = true;

  for (const [field, rules] of Object.entries(schema)) {
    const fieldErrors = validateField(data[field], rules);
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
      isValid = false;
    }
  }

  return { isValid, errors };
};

// Real-time validation hook
export const useFormValidation = (schema: ValidationSchema) => {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (fieldName: string, value: any) => {
    const rules = schema[fieldName];
    if (!rules) return [];

    const fieldErrors = rules.reduce<string[]>((acc, rule) => {
      if (!rule.test(value)) {
        acc.push(rule.message);
      }
      return acc;
    }, []);

    setErrors(prev => ({
      ...prev,
      [fieldName]: fieldErrors
    }));

    return fieldErrors;
  };

  const validateAll = (data: { [key: string]: any }) => {
    const result = validateForm(data, schema);
    setErrors(result.errors);
    return result;
  };

  const markTouched = (fieldName: string) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  const resetValidation = () => {
    setErrors({});
    setTouched({});
  };

  const getFieldError = (fieldName: string) => {
    return touched[fieldName] ? errors[fieldName]?.[0] : undefined;
  };

  const hasFieldError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName]?.length > 0;
  };

  return {
    errors,
    touched,
    validateField,
    validateAll,
    markTouched,
    resetValidation,
    getFieldError,
    hasFieldError
  };
};

// Common validation schemas
export const authSchemas = {
  login: {
    email: [validationRules.required(), validationRules.email()],
    password: [validationRules.required()]
  },
  register: {
    name: [validationRules.required(), validationRules.minLength(2)],
    email: [validationRules.required(), validationRules.email()],
    password: [validationRules.required(), validationRules.password()],
    confirmPassword: [] // Will be set dynamically with match rule
  }
};

export const bookSchemas = {
  createListing: {
    title: [validationRules.required(), validationRules.minLength(3)],
    author: [validationRules.required(), validationRules.minLength(2)],
    price: [validationRules.required(), validationRules.positiveNumber()],
    category: [validationRules.required()],
    condition: [validationRules.required()],
    description: [validationRules.required(), validationRules.minLength(10)]
  }
};

export const contactSchema = {
  name: [validationRules.required(), validationRules.minLength(2)],
  email: [validationRules.required(), validationRules.email()],
  subject: [validationRules.required(), validationRules.minLength(5)],
  message: [validationRules.required(), validationRules.minLength(10)]
};
