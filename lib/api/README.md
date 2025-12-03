# API Integration Documentation

This directory contains all API integration code for connecting the frontend to the backend.

## Structure

- **`client.ts`** - Core API client with token management and fetch wrapper
- **`types.ts`** - TypeScript types and interfaces for all API responses
- **`auth.ts`** - Authentication API services (login, register, logout, etc.)
- **`courses.ts`** - Courses and videos API services
- **`requests.ts`** - Course request API services
- **`progress.ts`** - Video progress and unlocking API services
- **`admin.ts`** - Admin panel API services
- **`index.ts`** - Central export file

## Setup

1. Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

2. The API client automatically:
   - Manages JWT tokens in localStorage
   - Adds Authorization headers to requests
   - Handles token expiration
   - Provides typed responses

## Usage Examples

### Authentication

```typescript
import { useAuth } from '@/contexts/AuthContext';

function LoginComponent() {
  const { login, user, isAuth } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
      console.log('Logged in!', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <button onClick={handleLogin} disabled={isAuth}>
      Login
    </button>
  );
}
```

### Fetching Courses

```typescript
'use client';

import { useState, useEffect } from 'react';
import { coursesApi } from '@/lib/api';
import type { Course } from '@/lib/api/types';

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await coursesApi.getAll();
        if (response.success && response.data) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>{course.name}</div>
      ))}
    </div>
  );
}
```

### Creating Course Request

```typescript
import { requestsApi } from '@/lib/api';

async function requestCourseAccess(courseId: string) {
  try {
    const response = await requestsApi.create({
      course_id: courseId,
      request_message: 'I would like access to this course',
    });

    if (response.success) {
      console.log('Request created:', response.data);
    }
  } catch (error) {
    console.error('Failed to create request:', error);
  }
}
```

### Marking Video as Watched

```typescript
import { progressApi } from '@/lib/api';

async function watchVideo(videoId: string) {
  try {
    // Mark video as watched
    const watchResponse = await progressApi.markVideoWatched(videoId);
    
    if (watchResponse.success) {
      // Unlock next video
      await progressApi.unlockNextVideo(videoId);
    }
  } catch (error) {
    console.error('Failed to update progress:', error);
  }
}
```

## API Client Features

### Automatic Token Management
- Tokens are stored in localStorage
- Automatically added to request headers
- Cleared on logout or token expiration

### Error Handling
- Automatic 401 handling (redirects to login)
- Standardized error messages
- Type-safe error responses

### Type Safety
- Full TypeScript support
- Typed request/response interfaces
- IDE autocomplete for all API calls

## Available API Services

### Auth API (`authApi`)
- `register(data)` - Register new user
- `login(data)` - Login user
- `logout()` - Logout user
- `getProfile()` - Get current user profile
- `updateProfile(data)` - Update user profile
- `forgotPassword(email)` - Request password reset
- `resetPassword(token, password)` - Reset password

### Courses API (`coursesApi`)
- `getAll()` - Get all courses
- `getBySlug(slug)` - Get course by slug
- `getById(id)` - Get course by ID
- `create(data)` - Create course (Admin)
- `update(id, data)` - Update course (Admin)
- `delete(id)` - Delete course (Admin)
- `getVideos(courseId)` - Get course videos
- `getVideo(courseId, videoId)` - Get video details

### Requests API (`requestsApi`)
- `create(data)` - Create course request
- `getMyRequests()` - Get user's requests
- `getById(id)` - Get request details
- `getAll()` - Get all requests (Admin)
- `approve(id, data)` - Approve request (Admin)
- `reject(id)` - Reject request (Admin)

### Progress API (`progressApi`)
- `markVideoWatched(videoId)` - Mark video as watched
- `unlockNextVideo(videoId)` - Unlock next video
- `getCourseProgress(courseId)` - Get course progress
- `getMyCourses()` - Get user's enrolled courses

### Admin API (`adminApi`)
- `getDashboardStats()` - Get dashboard statistics
- `getAllUsers()` - Get all users
- `getAllRequests()` - Get all requests
- `updateUser(id, data)` - Update user (Admin)

## Authentication Context

The `AuthProvider` wraps your app and provides:
- `user` - Current user object
- `loading` - Loading state
- `isAuth` - Boolean indicating if user is authenticated
- `login(data)` - Login function
- `register(data)` - Register function
- `logout()` - Logout function
- `updateUser(data)` - Update profile function
- `refreshProfile()` - Refresh user data from server

## Environment Variables

Required environment variable:
- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: `http://localhost:3000/api`)

Make sure this matches your backend server URL and port.

