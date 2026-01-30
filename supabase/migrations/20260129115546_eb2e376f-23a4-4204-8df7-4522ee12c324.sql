-- Fix overly permissive notifications INSERT policy
-- Drop the existing policy
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

-- Create a more restrictive policy - users can create notifications for themselves
-- or if they are part of a conversation (for enquiry notifications)
CREATE POLICY "Users can create notifications for conversation participants"
ON public.notifications FOR INSERT
WITH CHECK (
    -- User creating notification for themselves
    auth.uid() = user_id OR
    -- User is creating a notification about a conversation they're part of
    (reference_id IS NOT NULL AND reference_id IN (
        SELECT id FROM public.conversations 
        WHERE customer_id = auth.uid() OR 
        business_id IN (SELECT id FROM public.business_profiles WHERE user_id = auth.uid())
    ))
);