const express = require('express');
const router = express.Router();
const cloudflare = require('../cloudflare');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// Purge cache
router.post('/:zoneId/purge', async (req, res) => {
  try {
    const result = await cloudflare.purgeCache(req.params.zoneId, req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
