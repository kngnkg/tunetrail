DELETE FROM reviews;
DELETE FROM users;

INSERT INTO users (user_id, display_id, name, avatar_url, bio, created_at, updated_at)
		VALUES(gen_random_uuid (), '@tunetrail', 'TuneTrail', 'https://source.unsplash.com/random', 'Hello!', NOW(), NOW())
