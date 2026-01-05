const express = require('express');
const router = express.Router();
const cloudflare = require('../cloudflare');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// List DNS records for a zone
router.get('/:zoneId/records', async (req, res) => {
  try {
    const result = await cloudflare.listDNSRecords(req.params.zoneId, req.query);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Create DNS record
router.post('/:zoneId/records', async (req, res) => {
  try {
    const result = await cloudflare.createDNSRecord(req.params.zoneId, req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Update DNS record
router.put('/:zoneId/records/:recordId', async (req, res) => {
  try {
    const result = await cloudflare.updateDNSRecord(
      req.params.zoneId,
      req.params.recordId,
      req.body
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Delete DNS record
router.delete('/:zoneId/records/:recordId', async (req, res) => {
  try {
    const result = await cloudflare.deleteDNSRecord(
      req.params.zoneId,
      req.params.recordId
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
