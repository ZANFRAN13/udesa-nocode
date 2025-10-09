# Supabase Setup Instructions

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yksxltdmwpswtrewoibx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database URL (for direct database access if needed)
DATABASE_URL=postgresql://postgres.yksxltdmwpswtrewoibx:[YOUR-PASSWORD]@aws-1-sa-east-1.pooler.supabase.com:5432/postgres
```

## How to get your Supabase keys:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Authentication Setup

The authentication system is already configured with:

- ✅ Login/Signup page at `/login`
- ✅ Protected dashboard routes
- ✅ Automatic redirects for unauthenticated users
- ✅ Session management with middleware
- ✅ Logout functionality

## Database Schema

You may need to enable Row Level Security (RLS) in your Supabase project:

1. Go to Authentication > Settings
2. Enable "Enable email confirmations" if you want email verification
3. Configure any additional auth providers if needed

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/login` to test authentication
3. Create an account or sign in
4. You should be redirected to `/dashboard` after successful login
