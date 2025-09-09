// src/utils/descopeAuth.js
import { createClient } from '@descope/web-js-sdk';

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
      this.descope = createClient({
        projectId: this.projectId,
        baseUrl: this.baseUrl,
      });
      this.initialized = true;
      console.log('✅ Descope SDK initialized');
      return this.descope;
    } catch (error) {
      console.error('❌ Failed to initialize Descope SDK:', error);
      throw error;
    }
  }

  // Email + Password login
  async loginWithEmail(email, password) {
    await this.initialize();
    try {
      const result = await this.descope.password.signIn({
        loginId: email,
        password,
      });

      return {
        success: true,
        sessionToken: result.sessionJwt,
        refreshToken: result.refreshJwt,
        user: result.user,
      };
    } catch (error) {
      console.error('❌ Email login failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Email + Password signup
  async signUpWithEmail(email, password) {
    await this.initialize();
    try {
      const result = await this.descope.password.signUp({
        loginId: email,
        password,
      });

      return {
        success: true,
        sessionToken: result.sessionJwt,
        refreshToken: result.refreshJwt,
        user: result.user,
      };
    } catch (error) {
      console.error('❌ Signup failed:', error);
      return { success: false, error: error.message };
    }
  }

  // GitHub OAuth login
  async loginWithGithub() {
    await this.initialize();
    try {
      await this.descope.oauth.start({
        provider: 'github',
        redirectUrl: `${window.location.origin}/auth/callback`,
      });
    } catch (error) {
      console.error('❌ GitHub OAuth login failed:', error);
      return { success: false, error: error.message };
    }
  }

  async validateSession() {
    await this.initialize();
    try {
      const sessionToken = localStorage.getItem('descopeSessionToken');
      if (!sessionToken) return { valid: false };

      const result = await this.descope.session.validate(sessionToken);
      return { valid: result.valid, sessionToken };
    } catch (error) {
      console.error('❌ Session validation failed:', error);
      return { valid: false };
    }
  }

  logout() {
    localStorage.removeItem('descopeSessionToken');
    localStorage.removeItem('descopeRefreshToken');
    console.log('👋 Logged out');
  }
}

export default new DescopeAuthManager();
