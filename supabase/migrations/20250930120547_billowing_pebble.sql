/*
  # Fix RLS policy for blog posts insertion

  1. Changes
    - Update insert policy to allow public users to insert blog posts
    - This enables the initializeSampleBlogs function to work with anonymous access

  2. Security
    - Allow public users to insert blog posts (needed for sample data)
    - Maintain existing read, update, and delete policies
*/

-- Drop the existing insert policy
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON blog_posts;

-- Create new policy allowing public users to insert
CREATE POLICY "Public users can insert blog posts"
  ON blog_posts
  FOR INSERT
  TO public
  WITH CHECK (true);