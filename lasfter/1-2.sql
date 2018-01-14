CREATE TABLE "users"
(
  id serial,
  email character(20)  NOT NULL,
  password character(255) NOT NULL,
  CONSTRAINT pk_user PRIMARY KEY (id),
  CONSTRAINT uk_user UNIQUE (email)
)
WITH (
  OIDS = FALSE
);

CREATE TABLE "events"
(
  name character(128) NOT NULL,
  organizer_id serial REFERENCES users(id),
  PRIMARY KEY(name, organizer_id)
);

CREATE TYPE "role" AS ENUM ('admin', 'worker', 'participant');

CREATE TABLE "users_events"
(
  user_id serial REFERENCES users(id),
  event_name character(128) REFERENCES events(name),
  balance integer,
  user_role role,
  PRIMARY KEY (user_id, event_name)
);

CREATE TABLE "redeemables"
(
  id serial,
  name character(128),
  description text,
  img_url character(255),
  cost integer,
  PRIMARY KEY (id)
);
