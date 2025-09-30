/*
  # Update blog categories to simplified structure

  1. Changes
    - Update category column to use only 'blog' and 'event' values
    - Update existing data to use new category values
    - Update RLS policies to work with new structure

  2. Security
    - Maintain existing RLS policies
    - Ensure data integrity during migration
*/

-- Update existing categories to new simplified structure
UPDATE blog_posts 
SET category = CASE 
  WHEN category IN ('general', 'announcements', 'government-orders', 'training', 'welfare', 'news') THEN 'blog'
  WHEN category IN ('events', 'elections') THEN 'event'
  ELSE 'blog'
END;

-- Add constraint to ensure only valid categories
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'blog_posts_category_check' 
    AND table_name = 'blog_posts'
  ) THEN
    ALTER TABLE blog_posts 
    ADD CONSTRAINT blog_posts_category_check 
    CHECK (category IN ('blog', 'event'));
  END IF;
END $$;