// Secure password utilities
class PasswordSecurity {
  // Generate a secure random password
  static generateSecurePassword(length = 16) {
    if (typeof crypto === 'undefined' || typeof crypto.getRandomValues !== 'function') {
      throw new Error('Crypto API not available. Cannot generate secure password.');
    }

    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    return Array.from(array, byte => charset[byte % charset.length]).join('');
  }

  // Simple hash function for password comparison (not for production use)
  // In production, use bcrypt or similar server-side hashing
  static async hashPassword(password) {
    if (typeof crypto === 'undefined' || typeof crypto.subtle === 'undefined') {
      // Fallback for environments without crypto.subtle
      return btoa(password + '_softscape_salt');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_softscape_salt_2024');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Validate password strength
  static validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];
    
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!hasLowerCase) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!hasNumbers) {
      errors.push('Password must contain at least one number');
    }
    if (!hasSpecialChar) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
      strength: this.calculatePasswordStrength(password)
    };
  }

  // Calculate password strength score
  static calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    if (password.length >= 16) score += 1;

    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    if (score <= 5) return 'strong';
    return 'very-strong';
  }

  // Check if password is commonly used
  static isCommonPassword(password) {
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123',
      'password123', 'admin', 'root', 'user', 'guest',
      'welcome', 'login', 'pass',
      // Company-specific variations and recent years
      'softscape2024', 'softscape2023', 'softscape2022', 'softscape2021',
      'softscape', 'softscape!', 'softscape@2024', 'softscape#2024', 'softscape2024!',
      'softscape2024@', 'softscape2024#', 'softscape2024$', 'softscape2024%',
      'Softscape2024', 'Softscape2024!', 'Softscape2023', 'Softscape2022',
      'softscapeadmin', 'softscapeuser', 'softscapepassword', 'softscape123',
      'softscape1', 'softscape12', 'softscape1234', 'softscape12345',
      'softscape2024admin', 'softscape2024user', 'softscape2024password'
    ];
    
    return commonPasswords.includes(password.toLowerCase());
  }
}

export default PasswordSecurity;