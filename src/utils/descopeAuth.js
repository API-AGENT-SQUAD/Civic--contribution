// ❌ Wrong
// import { Descope } from '@descope/web-js-sdk';
// or
// import { DescopeWc } from '@descope/web-js-sdk';

// ✅ Correct
import DescopeClient from '@descope/web-js-sdk';
const Descope = DescopeClient.Descope || DescopeClient.DescopeWc;

class DescopeAuthManager {
  constructor() {
    this.projectId = import.meta.env?.VITE_DESCOPE_PROJECT_ID;
    this.baseUrl = import.meta.env?.VITE_DESCOPE_BASE_URL;
    this.descope = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return this.descope;

    try {
      this.descope = Descope({
        projectId: this.projectId,
        baseUrl: this.baseUrl
      });

      this.initialized = true;
      console.log('Descope SDK initialized successfully');
      return this.descope;
    } catch (error) {
      console.error('Failed to initialize Descope SDK:', error);
      throw error;
    }
  }
  // ... keep the rest of your methods the same
}

export default new DescopeAuthManager();
