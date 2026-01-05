const express = require('express');
const router = express.Router();
const cloudflare = require('../cloudflare');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// List all zones
router.get('/', async (req, res) => {
  try {
    const { page = 1, per_page = 50 } = req.query;
    const result = await cloudflare.listZones(page, per_page);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Get zone details
router.get('/:zoneId', async (req, res) => {
  try {
    const result = await cloudflare.getZone(req.params.zoneId);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Update zone settings
router.patch('/:zoneId', async (req, res) => {
  try {
    const result = await cloudflare.updateZone(req.params.zoneId, req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Get SSL settings
router.get('/:zoneId/ssl', async (req, res) => {
  try {
    const result = await cloudflare.getSSLSettings(req.params.zoneId);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Update SSL settings
router.patch('/:zoneId/ssl', async (req, res) => {
  try {
    const { mode } = req.body;
    const result = await cloudflare.updateSSLSettings(req.params.zoneId, mode);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Get firewall rules
router.get('/:zoneId/firewall', async (req, res) => {
  try {
    const result = await cloudflare.listFirewallRules(req.params.zoneId);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
