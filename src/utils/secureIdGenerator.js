// Secure UUID and ID generation utilities
class SecureIdGenerator {
  // Generate a cryptographically secure UUID v4
  static generateUUID() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    
    // Fallback for environments without crypto.randomUUID
    return this.generateSecureId();
  }

  // Generate a secure ID using crypto API
  static generateSecureId(prefix = '', length = 16) {
    if (typeof crypto === 'undefined' || typeof crypto.getRandomValues !== 'function') {
      throw new Error('Crypto API not available. This environment is not secure for ID generation.');
    }

    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    const id = Array.from(array, byte => byte.toString(36)).join('').slice(0, length);
    
    return prefix ? `${prefix}_${id}` : id;
  }

  // Generate consultation ID
  static generateConsultationId() {
    return this.generateSecureId('consultation', 12);
  }

  // Generate admin ID
  static generateAdminId() {
    return this.generateSecureId('admin', 10);
  }

  // Generate project ID
  static generateProjectId() {
    return this.generateSecureId('proj', 12);
  }

  // Generate audit log ID
  static generateAuditId() {
    return this.generateSecureId('audit', 10);
  }

  // Generate session ID
  static generateSessionId() {
    return this.generateSecureId('session', 16);
  }
}

export default SecureIdGenerator;