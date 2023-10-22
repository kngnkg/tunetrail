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
