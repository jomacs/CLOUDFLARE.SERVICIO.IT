# Quick Start Guide

## 1. Install Dependencies

First, install all required dependencies for both server and client:

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

## 2. Configure Environment

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` and add your Cloudflare credentials:

```env
CLOUDFLARE_API_KEY=your_global_api_key_here
CLOUDFLARE_EMAIL=your_cloudflare_email@example.com
CLOUDFLARE_ACCOUNT_ID=your_account_id

PORT=3001
NODE_ENV=development

JWT_SECRET=your_secure_random_string_here

ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

### Getting Your Cloudflare API Key:

1. Log into Cloudflare Dashboard
2. Click on your profile (top right)
3. Go to "My Profile" → "API Tokens"
4. Scroll down to "API Keys"
5. Click "View" next to "Global API Key"

### Getting Your Account ID:

1. In Cloudflare Dashboard
2. Click on any domain
3. Scroll down in the right sidebar
4. Copy the "Account ID"

## 3. Run the Application

### Development Mode (with hot reload):

```bash
# Option 1: Run both server and client together
npm run dev

# Option 2: Run separately in different terminals
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Production Mode:

```bash
# Build the frontend
cd client
npm run build
cd ..

# Start the server
npm start
```

## 4. Login

Open http://localhost:3000 in your browser and login with:

- Username: `admin` (or what you set in .env)
- Password: `changeme123` (or what you set in .env)

## Features Overview

### Dashboard
- View overview of all your zones
- Quick access to zone management
- Statistics at a glance

### Zones Management
- List all domains in your Cloudflare account
- Filter by status (active, pending)
- Quick access to DNS and analytics

### DNS Records
- View all DNS records for a zone
- Add new records (A, AAAA, CNAME, TXT, MX, etc.)
- Delete records
- Toggle Cloudflare proxy

### Analytics
- View traffic statistics
- Bandwidth usage
- Cached vs uncached requests
- Unique visitors

### Cache Management
- Purge cache for entire zone
- Quick access from zone details

## Troubleshooting

### "Authentication required" error
- Make sure your JWT_SECRET is set in .env
- Check that you're logged in
- Token expires after 24 hours

### "Cloudflare API error"
- Verify your API key and email in .env
- Check that your API key has the necessary permissions
- Ensure your Cloudflare account is active

### Port already in use
- Change PORT in .env to a different port
- Kill the process using the port: `lsof -ti:3001 | xargs kill`

### CORS errors
- Make sure the backend is running on port 3001
- Check that proxy is set correctly in client/package.json

## Security Notes

⚠️ **IMPORTANT for Production:**

1. Change default admin credentials
2. Use a strong JWT_SECRET
3. Enable HTTPS
4. Use environment-specific .env files
5. Never commit .env to git
6. Consider using a proper database for users
7. Add rate limiting for production
8. Set up proper logging

## API Endpoints

All API endpoints (except `/api/auth/login`) require JWT authentication via Bearer token in the Authorization header.

### Authentication
- POST `/api/auth/login` - Login
- POST `/api/auth/logout` - Logout

### Zones
- GET `/api/zones` - List zones
- GET `/api/zones/:id` - Get zone details
- PATCH `/api/zones/:id` - Update zone
- GET `/api/zones/:id/ssl` - Get SSL settings
- PATCH `/api/zones/:id/ssl` - Update SSL

### DNS
- GET `/api/dns/:zoneId/records` - List DNS records
- POST `/api/dns/:zoneId/records` - Create record
- PUT `/api/dns/:zoneId/records/:id` - Update record
- DELETE `/api/dns/:zoneId/records/:id` - Delete record

### Analytics
- GET `/api/analytics/:zoneId` - Get analytics

### Cache
- POST `/api/cache/:zoneId/purge` - Purge cache

## Support

For issues with:
- **This application**: Check the troubleshooting section
- **Cloudflare API**: Visit https://developers.cloudflare.com/
- **Cloudflare account**: Contact Cloudflare support
