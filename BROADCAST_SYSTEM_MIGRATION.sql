-- Migration to create broadcast system tables
-- This creates the necessary tables for the broadcast message system

-- Create broadcasts table
CREATE TABLE IF NOT EXISTS public.broadcasts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT CHECK (priority IN ('low', 'normal', 'high', 'urgent')) DEFAULT 'normal',
    target_audience TEXT CHECK (target_audience IN ('all', 'users', 'admin')) DEFAULT 'all',
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create broadcast_views table to track who has seen which broadcasts
CREATE TABLE IF NOT EXISTS public.broadcast_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    broadcast_id UUID REFERENCES public.broadcasts(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    dismissed BOOLEAN DEFAULT false,
    UNIQUE(user_id, broadcast_id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_broadcasts_active ON public.broadcasts(is_active, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_broadcasts_expires ON public.broadcasts(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_broadcast_views_user ON public.broadcast_views(user_id);
CREATE INDEX IF NOT EXISTS idx_broadcast_views_broadcast ON public.broadcast_views(broadcast_id);

-- Enable RLS (Row Level Security)
ALTER TABLE public.broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcast_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies for broadcasts table
-- Everyone can read active broadcasts
CREATE POLICY "Anyone can view active broadcasts" ON public.broadcasts
    FOR SELECT USING (is_active = true);

-- Only admins can create/update/delete broadcasts
CREATE POLICY "Only admins can manage broadcasts" ON public.broadcasts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND (profiles.is_admin = true OR profiles.email = 'AdminSimnLi@gmail.com')
        )
    );

-- RLS Policies for broadcast_views table
-- Users can only see their own broadcast views
CREATE POLICY "Users can view their own broadcast views" ON public.broadcast_views
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert/update their own broadcast views
CREATE POLICY "Users can manage their own broadcast views" ON public.broadcast_views
    FOR ALL USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON public.broadcasts TO authenticated;
GRANT ALL ON public.broadcast_views TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Add comment for documentation
COMMENT ON TABLE public.broadcasts IS 'System-wide broadcast messages shown to users';
COMMENT ON TABLE public.broadcast_views IS 'Tracks which users have viewed which broadcasts';

-- Insert a sample broadcast (optional)
INSERT INTO public.broadcasts (title, message, priority, target_audience, created_by)
SELECT 
    'Welcome to ReBooked Solutions!',
    'Thank you for joining our textbook marketplace. Start browsing or list your first book today!',
    'normal',
    'all',
    id
FROM public.profiles 
WHERE email = 'AdminSimnLi@gmail.com'
LIMIT 1
ON CONFLICT DO NOTHING;
