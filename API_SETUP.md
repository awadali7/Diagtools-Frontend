# API Setup Guide

## Port Configuration

**Important**: By default, both Next.js frontend and the backend try to use port 3000, which causes conflicts.

### Solution 1: Use Different Ports (Recommended)

1. **Backend runs on port 5000** (or any port you prefer)
2. **Frontend runs on port 3000**

#### Backend Configuration:

Create or update `backend/.env`:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration:

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Solution 2: Use Same Port (Not Recommended)

If you really want both on 3000, you need to:
1. Run backend on a different port anyway (they can't share)
2. Or proxy API calls through Next.js

### Starting the Servers

1. **Start Backend** (in `backend/` directory):
```bash
npm start
# or for development
npm run dev
```

The backend should show:
```
🚀 Server is running on port 5000
🌐 API: http://localhost:5000/api
```

2. **Start Frontend** (in `frontend/` directory):
```bash
npm run dev
```

The frontend should show:
```
- Local: http://localhost:3000
```

### Testing the Connection

1. Make sure backend is running - visit `http://localhost:5000/api` (should show 404 or API docs)
2. Visit `http://localhost:5000/api-docs` for Swagger documentation
3. Try registering a user from the frontend

### Common Issues

#### "Failed to fetch" Error
- **Backend not running**: Start the backend server
- **Wrong port**: Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- **CORS issue**: Make sure `FRONTEND_URL` in backend `.env` matches frontend URL

#### Port Already in Use
- Find what's using the port: `lsof -i :3000` (Mac/Linux) or `netstat -ano | findstr :3000` (Windows)
- Kill the process or use a different port

### Environment Variables Checklist

**Backend (`backend/.env`):**
- ✅ `PORT=5000` (or your preferred port)
- ✅ `FRONTEND_URL=http://localhost:3000`
- ✅ `DATABASE_URL=...` (PostgreSQL connection)
- ✅ `JWT_SECRET=...`

**Frontend (`frontend/.env.local`):**
- ✅ `NEXT_PUBLIC_API_URL=http://localhost:5000/api` (match backend port!)

