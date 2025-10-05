// middlewares/validationMiddleware.js

// Validation middleware
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: error.details.map(detail => detail.message) 
      });
    }
    
    next();
  };
};

// User validation schemas
export const userValidation = {
  register: {
    validate: (data) => {
      const requiredFields = ['name', 'email', 'password'];
      const errors = [];

      // Check required fields
      for (const field of requiredFields) {
        if (!data[field]) {
          errors.push(`${field} is required`);
        }
      }

      // Email validation
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.push('Please provide a valid email address');
      }

      // Password validation
      if (data.password && data.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
      }

      return {
        error: errors.length > 0 ? { details: errors.map(e => ({ message: e })) } : null
      };
    }
  },
  login: {
    validate: (data) => {
      const errors = [];
      
      if (!data.email) errors.push('Email is required');
      if (!data.password) errors.push('Password is required');
      
      return {
        error: errors.length > 0 ? { details: errors.map(e => ({ message: e })) } : null
      };
    }
  }
};

// Event validation schemas
export const eventValidation = {
  create: {
    validate: (data) => {
      const requiredFields = ['title', 'date', 'location'];
      const errors = [];

      // Check required fields
      for (const field of requiredFields) {
        if (!data[field]) {
          errors.push(`${field} is required`);
        }
      }

      return {
        error: errors.length > 0 ? { details: errors.map(e => ({ message: e })) } : null
      };
    }
  }
};

// Maharaj validation schemas
export const maharajValidation = {
  create: {
    validate: (data) => {
      const requiredFields = ['name', 'city'];
      const errors = [];

      // Check required fields
      for (const field of requiredFields) {
        if (!data[field]) {
          errors.push(`${field} is required`);
        }
      }

      return {
        error: errors.length > 0 ? { details: errors.map(e => ({ message: e })) } : null
      };
    }
  }
};

// Tithi validation schemas
export const tithiValidation = {
  create: {
    validate: (data) => {
      const requiredFields = ['tithi', 'date'];
      const errors = [];

      // Check required fields
      for (const field of requiredFields) {
        if (!data[field]) {
          errors.push(`${field} is required`);
        }
      }

      return {
        error: errors.length > 0 ? { details: errors.map(e => ({ message: e })) } : null
      };
    }
  }
};