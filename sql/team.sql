CREATE TABLE IF NOT EXISTS team (
  id SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  title       TEXT NOT NULL,
  photo_url   TEXT,
  sort_order  INT DEFAULT 0,
  hired_at    DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ
);

INSERT INTO team (name, title, sort_order, hired_at)
VALUES
  ('Sample One','Tech',1,'2023-01-01'),
  ('Sample Two','Painter',2,'2022-06-15')
ON CONFLICT DO NOTHING;