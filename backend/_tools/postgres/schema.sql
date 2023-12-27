/*
 * データベースのスキーマを定義する
 */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/*
 * ユーザー
 */
CREATE TABLE users (
    user_id UUID,
    username VARCHAR(100) UNIQUE,
    display_name VARCHAR(100),
    avatar_url VARCHAR(100),
    bio VARCHAR(1000),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

/*
 * フォロー
 */
CREATE TABLE follows(
    user_id UUID NOT NULL,
    follow_user_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT follows_pkey PRIMARY KEY (user_id, follow_user_id),
    CONSTRAINT follows_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT follows_follow_user_id_fkey FOREIGN KEY (follow_user_id)
        REFERENCES users(user_id) ON DELETE CASCADE
);

/*
 * レビュー
 */
CREATE TABLE reviews (
    review_id UUID DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    album_id VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content JSONB NOT NULL,
    published_status VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT reviews_pkey PRIMARY KEY (review_id),
    CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX reviews_user_id_idx ON reviews (review_id);

/*
 * いいね
 */
CREATE TABLE likes (
    user_id UUID NOT NULL,
    review_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT likes_pkey PRIMARY KEY (user_id, review_id),
    CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT likes_review_id_fkey FOREIGN KEY (review_id)
        REFERENCES reviews(review_id) ON DELETE CASCADE
);
