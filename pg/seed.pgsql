--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, name) FROM stdin;
1	milk
2	orange juice
3	bread
4	eggs
5	rice
\.


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 5, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);

ALTER TABLE items
ADD COLUMN is_done BOOLEAN DEFAULT FALSE,
ADD COLUMN recur_freq CHAR (20),
ADD COLUMN recur_start_date DATE,
ADD COLUMN recur_end_date DATE,
ADD COLUMN due_date DATE,
ADD COLUMN url VARCHAR (1000),
ADD COLUMN quantity INT DEFAULT 1,
ADD COLUMN description VARCHAR (500),
ADD COLUMN user_assigned INT,
ADD COLUMN date_created TIMESTAMPTZ DEFAULT Now(),
ADD COLUMN date_updated TIMESTAMPTZ DEFAULT Now();

CREATE TABLE lists(
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255),
  -- owner INT,
  due_date DATE,
  date_created TIMESTAMPTZ DEFAULT Now()
);

ALTER TABLE items
  ADD COLUMN list_id INT;

ALTER TABLE items
ADD CONSTRAINT fk_list
FOREIGN KEY (list_id)
REFERENCES lists(id);



CREATE TABLE users(
  id SERIAL PRIMARY KEY, 
  first_name VARCHAR(25),
  last_name VARCHAR(25),
  email CHAR(50),
  password CHAR(50),
  date_created TIMESTAMPTZ DEFAULT Now(),
  date_updated TIMESTAMPTZ DEFAULT Now()
);

ALTER TABLE lists
  ADD COLUMN owner_id INT;

ALTER TABLE lists
ADD CONSTRAINT fk_user
FOREIGN KEY (owner_id)
REFERENCES users(id);

-- NEED TO ADD TO SEED FILE AND HEROKU DB

--
-- PostgreSQL database dump complete
--

