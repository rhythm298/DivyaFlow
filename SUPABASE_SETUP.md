# Supabase Setup Guide for DivyaFlow

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Sign up with GitHub (recommended) or email
4. Verify your email if required

## Step 2: Create New Project

1. After logging in, click **"New Project"**
2. Select your organization (or create one)
3. Fill in project details:
   - **Project Name**: `divyaflow`
   - **Database Password**: Generate a strong password (SAVE THIS!)
   - **Region**: Choose closest to your location (e.g., Mumbai for India)
   - **Pricing Plan**: Select **Free** tier (includes 500MB database, 2GB file storage)
4. Click **"Create new project"**
5. Wait 2-3 minutes for project provisioning

## Step 3: Get API Credentials

1. Once project is ready, go to **Settings** (gear icon in sidebar)
2. Click on **API** in the left menu
3. You'll see two important keys:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Long string starting with `eyJhbG...`
   - **service_role key**: Another long string (keep this SECRET!)

4. Copy these values

## Step 4: Update Environment Variables

1. Open `.env.local` file in your DivyaFlow project
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 5: Run Database Schema

1. In Supabase dashboard, click **SQL Editor** (database icon in sidebar)
2. Click **"New query"**
3. Open the file `lib/supabase/schema.sql` from your project
4. Copy the entire contents
5. Paste into the Supabase SQL Editor
6. Click **"Run"** button (or press Ctrl+Enter)
7. Wait for execution to complete (should see "Success" message)

## Step 6: Verify Database Tables

1. Click **"Table Editor"** in Supabase sidebar
2. You should see all tables created:
   - users
   - temples
   - bookings
   - crowd_data
   - alerts
   - emergency_incidents
   - parking_lots
   - vehicle_entries
   - cctv_cameras
   - security_personnel
   - medical_facilities
   - ambulances
   - chat_messages
   - announcements
   - bhakti_profiles
   - notifications

3. Click on **temples** table - you should see 4 sample temples (Somnath, Dwarka, Ambaji, Pavagadh)

## Step 7: Configure Authentication (Optional)

### For Email/Password Auth:
1. Go to **Authentication** > **Providers**
2. **Email** provider is enabled by default
3. Configure email templates if needed

### For Google OAuth:
1. Go to **Authentication** > **Providers**
2. Enable **Google** provider
3. You'll need to create Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Secret to Supabase

## Step 8: Enable Real-time (For Live Updates)

1. Go to **Database** > **Replication**
2. Enable replication for these tables:
   - crowd_data
   - alerts
   - bookings
   - chat_messages
   - emergency_incidents
3. This allows real-time subscriptions in your app

## Step 9: Configure Storage (For Images)

1. Go to **Storage** in sidebar
2. Create new bucket: `temple-images`
3. Set it to **Public** (for temple photos)
4. Create another bucket: `incident-media` (Private)
5. Upload sample temple images or use URLs

## Step 10: Test Connection

1. In your terminal, run:
```bash
npm run dev
```

2. The app should start without database errors
3. Check browser console for any Supabase connection errors

## Troubleshooting

### Error: "Invalid API key"
- Double-check you copied the correct `anon` key (not service_role)
- Make sure there are no extra spaces or line breaks

### Error: "Database connection failed"
- Verify project URL is correct
- Check if Supabase project is still active (free tier pauses after inactivity)

### Error: "Table does not exist"
- Re-run the schema.sql file
- Check SQL Editor for any error messages during execution

### Error: "Row Level Security policy violation"
- For testing, you can temporarily disable RLS on tables
- Go to Table Editor > Select table > Click shield icon > Disable RLS
- Remember to re-enable for production!

## Next Steps

Once Supabase is set up:
1. ✅ Database tables created
2. ✅ Sample data inserted
3. ✅ API keys configured
4. ✅ Real-time enabled

You can now:
- Fetch temples from database
- Create bookings
- Store crowd analytics
- Enable live updates

## Free Tier Limits

- Database: 500 MB
- File Storage: 1 GB
- Bandwidth: 2 GB
- Realtime connections: 200 concurrent

This is more than enough for a hackathon demo!

## Production Deployment Notes

For production on Vercel:
1. Add environment variables in Vercel dashboard
2. Update `NEXTAUTH_URL` to your Vercel domain
3. Update Google OAuth redirect URI
4. Consider upgrading Supabase tier for more resources
5. Enable database backups
6. Set up monitoring and alerts

---

Need help? Check Supabase docs: https://supabase.com/docs
