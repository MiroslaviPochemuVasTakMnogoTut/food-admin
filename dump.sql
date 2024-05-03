--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

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

--
-- Name: FoodBase; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE "FoodBase" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';


ALTER DATABASE "FoodBase" OWNER TO admin;

\connect "FoodBase"

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

--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: brand; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.brand (
    id integer NOT NULL,
    name character varying NOT NULL,
    "companyId" integer NOT NULL
);


ALTER TABLE public.brand OWNER TO admin;

--
-- Name: brand_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brand_id_seq OWNER TO admin;

--
-- Name: brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.brand_id_seq OWNED BY public.brand.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.category (
    id integer NOT NULL,
    title character varying NOT NULL,
    "restId" integer NOT NULL
);


ALTER TABLE public.category OWNER TO admin;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO admin;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: company; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.company (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.company OWNER TO admin;

--
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.company_id_seq OWNER TO admin;

--
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;


--
-- Name: item; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.item (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    weight integer NOT NULL,
    volume integer NOT NULL,
    price integer NOT NULL,
    image character varying NOT NULL
);


ALTER TABLE public.item OWNER TO admin;

--
-- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_id_seq OWNER TO admin;

--
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;


--
-- Name: item_order; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.item_order (
    id integer NOT NULL,
    "itemId" integer NOT NULL,
    "orderId" integer NOT NULL,
    amount integer NOT NULL,
    note character varying DEFAULT ''::character varying NOT NULL,
    "isComplete" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.item_order OWNER TO admin;

--
-- Name: item_order_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.item_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_order_id_seq OWNER TO admin;

--
-- Name: item_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.item_order_id_seq OWNED BY public.item_order.id;


--
-- Name: menu_item; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.menu_item (
    id integer NOT NULL,
    "restId" integer NOT NULL,
    "itemId" integer NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public.menu_item OWNER TO admin;

--
-- Name: menu_item_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.menu_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_item_id_seq OWNER TO admin;

--
-- Name: menu_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.menu_item_id_seq OWNED BY public.menu_item.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    status character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    completed_at timestamp without time zone,
    "userId" integer,
    "restId" integer,
    note character varying DEFAULT ''::character varying NOT NULL,
    "table" character varying DEFAULT ''::character varying NOT NULL,
    "isOutside" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."order" OWNER TO admin;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO admin;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: randomNameForSaltTable; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."randomNameForSaltTable" (
    id integer NOT NULL,
    "someNumbers" character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public."randomNameForSaltTable" OWNER TO admin;

--
-- Name: randomNameForSaltTable_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."randomNameForSaltTable_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."randomNameForSaltTable_id_seq" OWNER TO admin;

--
-- Name: randomNameForSaltTable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."randomNameForSaltTable_id_seq" OWNED BY public."randomNameForSaltTable".id;


--
-- Name: restaurant; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.restaurant (
    id integer NOT NULL,
    address character varying,
    "brandId" integer,
    geometry public.geometry(Point,4326),
    costs integer,
    description character varying,
    img character varying,
    phone character varying,
    "time" character varying
);


ALTER TABLE public.restaurant OWNER TO admin;

--
-- Name: restaurant_employee; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.restaurant_employee (
    id integer NOT NULL,
    "employeeId" integer NOT NULL,
    "restaurantId" integer NOT NULL,
    role integer NOT NULL
);


ALTER TABLE public.restaurant_employee OWNER TO admin;

--
-- Name: restaurant_employee_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.restaurant_employee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurant_employee_id_seq OWNER TO admin;

--
-- Name: restaurant_employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.restaurant_employee_id_seq OWNED BY public.restaurant_employee.id;


--
-- Name: restaurant_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.restaurant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurant_id_seq OWNER TO admin;

--
-- Name: restaurant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.restaurant_id_seq OWNED BY public.restaurant.id;


--
-- Name: token; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.token (
    id integer NOT NULL,
    token character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.token OWNER TO admin;

--
-- Name: token_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_id_seq OWNER TO admin;

--
-- Name: token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.token_id_seq OWNED BY public.token.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    email_verified boolean DEFAULT false NOT NULL,
    passwd character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    udated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: brand id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.brand ALTER COLUMN id SET DEFAULT nextval('public.brand_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: company id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);


--
-- Name: item id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);


--
-- Name: item_order id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.item_order ALTER COLUMN id SET DEFAULT nextval('public.item_order_id_seq'::regclass);


--
-- Name: menu_item id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.menu_item ALTER COLUMN id SET DEFAULT nextval('public.menu_item_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: randomNameForSaltTable id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."randomNameForSaltTable" ALTER COLUMN id SET DEFAULT nextval('public."randomNameForSaltTable_id_seq"'::regclass);


--
-- Name: restaurant id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.restaurant ALTER COLUMN id SET DEFAULT nextval('public.restaurant_id_seq'::regclass);


--
-- Name: restaurant_employee id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.restaurant_employee ALTER COLUMN id SET DEFAULT nextval('public.restaurant_employee_id_seq'::regclass);


--
-- Name: token id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.token ALTER COLUMN id SET DEFAULT nextval('public.token_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: brand; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.brand (id, name, "companyId") FROM stdin;
1	strin000g	1
8	string	1
9	string	3
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.category (id, title, "restId") FROM stdin;
1	string2	1
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.company (id, name) FROM stdin;
1	string
2	string
3	string
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.item (id, title, description, weight, volume, price, image) FROM stdin;
8	string	string	0	0	0	string
9	string2	string	0	0	0	string
10	string22	string	0	0	0	string
\.


--
-- Data for Name: item_order; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.item_order (id, "itemId", "orderId", amount, note, "isComplete") FROM stdin;
\.


--
-- Data for Name: menu_item; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.menu_item (id, "restId", "itemId", "categoryId") FROM stdin;
11	1	8	1
12	1	9	1
13	1	10	1
15	1	8	1
16	1	9	1
17	1	9	1
18	1	10	1
19	2	9	1
20	3	9	1
21	4	10	1
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."order" (id, status, created_at, completed_at, "userId", "restId", note, "table", "isOutside") FROM stdin;
3	string	2023-12-10 11:39:11.294207	\N	1	1			f
4	string	2023-12-30 14:33:16.524852	\N	2	2			f
2	s\n	2024-02-20 12:41:52.690366	\N	2	2			f
5	string	2024-02-20 15:20:34.347785	\N	1	1			f
\.


--
-- Data for Name: randomNameForSaltTable; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."randomNameForSaltTable" (id, "someNumbers", "userId") FROM stdin;
\.


--
-- Data for Name: restaurant; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.restaurant (id, address, "brandId", geometry, costs, description, img, phone, "time") FROM stdin;
1	Мира 10	1	0101000020E610000040473554E1385740BCAF1D4AB1014C40	\N	\N	\N	\N	\N
2	string	1	0101000020E61000000000000000804B400000000000804B40	\N	\N	\N	\N	string
3	string	1	0101000020E61000000000000000804B400000000000804B40	\N	\N	\N	\N	string
4	string	1	\N	\N	\N	\N	\N	string
5	string	1	0101000020E610000000000000000000000000000000000000	\N	\N	\N	\N	string
6	string	1	0101000020E61000005C7410AD5F35574000BEA77C3D004C40	\N	\N	\N	\N	string
7	string	1	0101000020E610000000000000000057400000000000804940	3	string	string	string	string
9	string	8	0101000020E610000000000000000000000000000000000000	0	string	string	string	string
\.


--
-- Data for Name: restaurant_employee; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.restaurant_employee (id, "employeeId", "restaurantId", role) FROM stdin;
1	1	1	1
2	1	1	1
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: token; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.token (id, token, "userId") FROM stdin;
1	92043558-eb6c-42e8-9dac-ffd613db7cee	1
2	75f339b7-6d63-49ea-85ad-ecada8d6b0ea	1
3	6a9d0205-e940-49b3-aeb7-c64066cfcd98	1
4	3036d281-37d9-42e4-aab4-d248f8965c47	1
5	246f8740-6363-4f31-b254-ba867aa6ea51	1
6	efdc36ce-fbcd-4e09-81a8-5b40beb62d4d	1
7	bcd06b3d-fb09-437e-af8e-1f8568480f1c	1
8	7feb8eff-efd6-4457-ac86-4debd62a0df8	1
9	bcc5d32a-9008-473e-8eb2-131602e29dae	1
10	1ce1347e-ea80-41b9-b4e0-b48d916602ae	1
11	c5e672cb-320b-4e85-b132-0bd1fb53147f	1
12	d5be2e3c-1a0c-4281-8ad4-d6552346d207	1
13	f6312156-aae1-4f26-a9ab-a9d036046a48	1
14	00678fe7-4b0b-453c-b533-3874f94ac336	1
15	5d1f52da-fe83-4a30-9778-0af2fde1d7bc	1
18	3946c481-dae0-4626-aa20-b0cefd197e5f	1
19	1fc7e0ca-c799-4a16-b458-c82a9911246e	1
20	457f9e14-9a4f-4f5f-ad2e-6b506492266d	1
22	27cb42b9-1fd1-4c76-8713-e03b5e56840b	1
23	a179adf1-f257-4c2c-8036-3005c0608837	1
24	ebc01b2f-e55f-4ce3-90f3-dd673d570b10	1
25	62aac371-08e4-4324-8ab0-849041fd83d3	1
26	b934a66d-96ad-45e1-8d88-98dc0ae16fab	1
27	67f33ad7-e3f3-480e-bb4f-000f87176eeb	1
28	e1e3cbf8-50c4-4708-be95-3ccb8f573ed0	1
29	40b82d60-0970-44a7-bc8b-0ac99f881d4c	2
30	05bc107e-2860-43c9-881c-6a97b861e824	2
31	4f400f85-a71e-42b1-9dab-229fb71aa140	2
32	dd34822e-147b-4089-8ca7-b356b2d82bd1	2
33	d53af84e-05a0-476b-8d80-5fbbd25f8718	2
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (id, name, email, email_verified, passwd, created_at, udated_at) FROM stdin;
1	string	string@mail.ru	f	string	2023-11-04 16:33:45.138729	2023-11-04 16:33:45.138729
2	string	string	f	string	2024-02-20 11:52:05.571263	2024-02-20 11:52:05.571263
4	string	string111@mail.ru	f	string	2024-04-11 20:32:07.823208	2024-04-11 20:32:07.823208
5	string	string11111@mail.ru	f	string	2024-04-11 20:35:47.687121	2024-04-11 20:35:47.687121
\.


--
-- Name: brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.brand_id_seq', 9, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.category_id_seq', 1, true);


--
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.company_id_seq', 3, true);


--
-- Name: item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.item_id_seq', 10, true);


--
-- Name: item_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.item_order_id_seq', 1, false);


--
-- Name: menu_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.menu_item_id_seq', 21, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.order_id_seq', 5, true);


--
-- Name: randomNameForSaltTable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."randomNameForSaltTable_id_seq"', 1, false);


--
-- Name: restaurant_employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.restaurant_employee_id_seq', 2, true);


--
-- Name: restaurant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.restaurant_id_seq', 9, true);


--
-- Name: token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.token_id_seq', 33, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: company PK_056f7854a7afdba7cbd6d45fc20; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY (id);


--
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- Name: item_order PK_30515b56911c5e27392a0c82f2e; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.item_order
    ADD CONSTRAINT "PK_30515b56911c5e27392a0c82f2e" PRIMARY KEY (id);


--
-- Name: restaurant PK_649e250d8b8165cb406d99aa30f; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY (id);


--
-- Name: restaurant_employee PK_6f18dcb4f3c45d56268a70346af; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.restaurant_employee
    ADD CONSTRAINT "PK_6f18dcb4f3c45d56268a70346af" PRIMARY KEY (id);


--
-- Name: menu_item PK_722c4de0accbbfafc77947a8556; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.menu_item
    ADD CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY (id);


--
-- Name: token PK_82fae97f905930df5d62a702fc9; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: randomNameForSaltTable PK_9f611a0c8a87f7e79cfa1926b48; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."randomNameForSaltTable"
    ADD CONSTRAINT "PK_9f611a0c8a87f7e79cfa1926b48" PRIMARY KEY (id);


--
-- Name: brand PK_a5d20765ddd942eb5de4eee2d7f; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.brand
    ADD CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: item PK_d3c0c71f23e7adcf952a1d13423; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY (id);


--
-- Name: randomNameForSaltTable REL_489bd529a29bdd511ac0a381e7; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."randomNameForSaltTable"
    ADD CONSTRAINT "REL_489bd529a29bdd511ac0a381e7" UNIQUE ("userId");


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_e12875dfb3b1d92d7d7c5377e2; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON public."user" USING btree (email);


--
-- Name: restaurant_employee FK_2907e47557f51af7b2766eb16a7; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.restaurant_employee
    ADD CONSTRAINT "FK_2907e47557f51af7b2766eb16a7" FOREIGN KEY ("restaurantId") REFERENCES public.restaurant(id);


--
-- Name: randomNameForSaltTable FK_489bd529a29bdd511ac0a381e7b; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."randomNameForSaltTable"
    ADD CONSTRAINT "FK_489bd529a29bdd511ac0a381e7b" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: item_order FK_48e9cb6c02f6c4b370f650ec039; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.item_order
    ADD CONSTRAINT "FK_48e9cb6c02f6c4b370f650ec039" FOREIGN KEY ("orderId") REFERENCES public."order"(id);


--
-- Name: menu_item FK_4af7d3076242d526641d4443d79; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.menu_item
    ADD CONSTRAINT "FK_4af7d3076242d526641d4443d79" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- Name: restaurant FK_54aa6c489e67a91328c2e18cd12; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT "FK_54aa6c489e67a91328c2e18cd12" FOREIGN KEY ("brandId") REFERENCES public.brand(id);


--
-- Name: menu_item FK_5c20beee2c676d987943b6f578b; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.menu_item
    ADD CONSTRAINT "FK_5c20beee2c676d987943b6f578b" FOREIGN KEY ("itemId") REFERENCES public.item(id);


--
-- Name: order FK_763b725b98fb9d46531153d50ed; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_763b725b98fb9d46531153d50ed" FOREIGN KEY ("restId") REFERENCES public.restaurant(id) ON DELETE SET NULL;


--
-- Name: item_order FK_869bb54e9626367d7cbe62ac02c; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.item_order
    ADD CONSTRAINT "FK_869bb54e9626367d7cbe62ac02c" FOREIGN KEY ("itemId") REFERENCES public.item(id);


--
-- Name: token FK_94f168faad896c0786646fa3d4a; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: brand FK_a18397b7959f71c6899bfd1f0a4; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.brand
    ADD CONSTRAINT "FK_a18397b7959f71c6899bfd1f0a4" FOREIGN KEY ("companyId") REFERENCES public.company(id);


--
-- Name: restaurant_employee FK_bfc1c197d07b38da14cd292ea3c; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.restaurant_employee
    ADD CONSTRAINT "FK_bfc1c197d07b38da14cd292ea3c" FOREIGN KEY ("employeeId") REFERENCES public."user"(id);


--
-- Name: order FK_caabe91507b3379c7ba73637b84; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE SET NULL;


--
-- Name: category FK_d215b3af3f312f4b8bb9c424752; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "FK_d215b3af3f312f4b8bb9c424752" FOREIGN KEY ("restId") REFERENCES public.restaurant(id);


--
-- PostgreSQL database dump complete
--

