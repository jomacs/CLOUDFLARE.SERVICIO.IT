# Cloudflare Control Panel

A modern web-based control panel for managing your Cloudflare services including domains, DNS records, SSL certificates, and more.

## Features

- 🌐 **Domain Management** - View and manage all your Cloudflare domains
- 📝 **DNS Records** - Create, update, and delete DNS records
- 🔒 **SSL/TLS Management** - Configure SSL settings and certificates
- 📊 **Analytics Dashboard** - View traffic statistics and insights
- ⚡ **Cloudflare Workers** - Manage and deploy workers
- 🔥 **Firewall Rules** - Configure WAF and security rules
- 🚀 **Cache Management** - Purge cache and configure caching rules

## Prerequisites

- Node.js (v24 or higher)
- npm or yarn
- Cloudflare account with API key

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Copy `.env.example` to `.env` and configure your settings:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` with your Cloudflare credentials:
   - `CLOUDFLARE_API_KEY` - Your Cloudflare API key
   - `CLOUDFLARE_EMAIL` - Your Cloudflare account email
   - `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
   - `JWT_SECRET` - A secure random string for JWT tokens
   - `ADMIN_USERNAME` and `ADMIN_PASSWORD` - Admin login credentials

## Getting Your Cloudflare API Key

1. Log in to your Cloudflare dashboard
2. Go to "My Profile" → "API Tokens"
3. Create a token with appropriate permissions or use your Global API Key

## Usage

### Development Mode

Run both the backend server and frontend development server:

```bash
npm run dev
```

- Backend API: http://localhost:3001
- Frontend: http://localhost:3000

### Production Mode

Build the frontend and start the server:

```bash
npm run build
npm start
```

## Default Login

- Username: `admin` (or as configured in .env)
- Password: `changeme123` (or as configured in .env)

**⚠️ IMPORTANT: Change the default credentials in production!**

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/logout` - Logout

### Zones (Domains)
- `GET /api/zones` - List all zones
- `GET /api/zones/:id` - Get zone details
- `PATCH /api/zones/:id` - Update zone settings

### DNS Records
- `GET /api/zones/:zoneId/dns` - List DNS records
- `POST /api/zones/:zoneId/dns` - Create DNS record
- `PUT /api/zones/:zoneId/dns/:id` - Update DNS record
- `DELETE /api/zones/:zoneId/dns/:id` - Delete DNS record

### Analytics
- `GET /api/zones/:zoneId/analytics` - Get zone analytics

### Cache
- `POST /api/zones/:zoneId/purge-cache` - Purge cache

## Security

- All API endpoints (except login) require JWT authentication
- Rate limiting is enabled
- Helmet.js security headers
- CORS protection

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React, Tailwind CSS
- **API**: Cloudflare API v4
- **Authentication**: JWT

## License

MIT
