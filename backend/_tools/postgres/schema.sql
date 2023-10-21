/*
 * データベースのスキーマを定義する
 */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/*
 * ユーザー
 */
CREATE TABLE users (
    user_id UUID,
    display_id VARCHAR(100) UNIQUE,
    name VARCHAR(100),
    avatar_url VARCHAR(100),
    bio VARCHAR(1000),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

/*
 * フォロー
 */
CREATE TABLE follows (
    user_id UUID NOT NULL,
    followee_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT follows_pkey PRIMARY KEY (user_id, followee_id),
    CONSTRAINT follows_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT follows_followee_id_fkey FOREIGN KEY (followee_id)
        REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX follows_user_id_followee_id_idx ON follows (user_id, followee_id);
