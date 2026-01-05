const express = require('express');
const router = express.Router();
const cloudflare = require('../cloudflare');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// Get analytics for a zone
router.get('/:zoneId', async (req, res) => {
  try {
    const { since, until } = req.query;
    const result = await cloudflare.getAnalytics(req.params.zoneId, since, until);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
