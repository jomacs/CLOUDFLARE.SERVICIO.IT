const axios = require('axios');

class CloudflareAPI {
  constructor() {
    this.apiKey = process.env.CLOUDFLARE_API_KEY;
    this.email = process.env.CLOUDFLARE_EMAIL;
    this.baseURL = 'https://api.cloudflare.com/client/v4';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'X-Auth-Email': this.email,
        'X-Auth-Key': this.apiKey,
        'Content-Type': 'application/json'
      }
    });
  }

  // Zones
  async listZones(page = 1, perPage = 50) {
    try {
      const response = await this.client.get('/zones', {
        params: { page, per_page: perPage }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getZone(zoneId) {
    try {
      const response = await this.client.get(`/zones/${zoneId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateZone(zoneId, settings) {
    try {
      const response = await this.client.patch(`/zones/${zoneId}/settings`, settings);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // DNS Records
  async listDNSRecords(zoneId, params = {}) {
    try {
      const response = await this.client.get(`/zones/${zoneId}/dns_records`, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createDNSRecord(zoneId, record) {
    try {
      const response = await this.client.post(`/zones/${zoneId}/dns_records`, record);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateDNSRecord(zoneId, recordId, record) {
    try {
      const response = await this.client.put(`/zones/${zoneId}/dns_records/${recordId}`, record);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteDNSRecord(zoneId, recordId) {
    try {
      const response = await this.client.delete(`/zones/${zoneId}/dns_records/${recordId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Analytics
  async getAnalytics(zoneId, since = null, until = null) {
    try {
      const params = {};
      if (since) params.since = since;
      if (until) params.until = until;
      
      const response = await this.client.get(`/zones/${zoneId}/analytics/dashboard`, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Cache
  async purgeCache(zoneId, options = {}) {
    try {
      const response = await this.client.post(`/zones/${zoneId}/purge_cache`, options);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // SSL/TLS
  async getSSLSettings(zoneId) {
    try {
      const response = await this.client.get(`/zones/${zoneId}/settings/ssl`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateSSLSettings(zoneId, mode) {
    try {
      const response = await this.client.patch(`/zones/${zoneId}/settings/ssl`, { value: mode });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Firewall Rules
  async listFirewallRules(zoneId) {
    try {
      const response = await this.client.get(`/zones/${zoneId}/firewall/rules`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Workers
  async listWorkers() {
    try {
      const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
      const response = await this.client.get(`/accounts/${accountId}/workers/scripts`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.errors?.[0]?.message || 'Cloudflare API error',
        errors: error.response.data.errors
      };
    }
    return {
      status: 500,
      message: error.message || 'Unknown error'
    };
  }
}

module.exports = new CloudflareAPI();
