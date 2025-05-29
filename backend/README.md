
# Book Store Backend

## Setup Instructions

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

## Environment Variables

The `.env` file contains:
- `NKWA_API_KEY`: Your Nkwa payment API key
- `PORT`: Server port (default: 5000)

## API Endpoints

- `POST /api/payment/create`: Initiate payment with Nkwa API
- `GET /health`: Health check endpoint
