--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.9
-- Dumped by pg_dump version 9.4.9
-- Started on 2016-10-28 15:32:29 VET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 1 (class 3079 OID 11861)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2075 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 176 (class 1259 OID 18048)
-- Name: correos; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE correos (
    id integer NOT NULL,
    correo character varying,
    fecha_creacion timestamp with time zone,
    id_mensaje integer,
    fecha_envio timestamp with time zone,
    fecha_enviado timestamp with time zone,
    id_usuario integer,
    estatus boolean DEFAULT true
);


ALTER TABLE correos OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 18046)
-- Name: correos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE correos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE correos_id_seq OWNER TO postgres;

--
-- TOC entry 2076 (class 0 OID 0)
-- Dependencies: 175
-- Name: correos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE correos_id_seq OWNED BY correos.id;


--
-- TOC entry 180 (class 1259 OID 18073)
-- Name: mensaje; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE mensaje (
    id integer NOT NULL,
    mensaje character varying,
    fecha time without time zone,
    asunto character varying
);


ALTER TABLE mensaje OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 18094)
-- Name: mensaje_enviados_traza; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE mensaje_enviados_traza (
    id integer NOT NULL,
    mensaje character varying,
    tlf_correo character varying,
    id_usuario integer,
    fecha timestamp with time zone,
    fecha_envio timestamp with time zone,
    tipo_mensaje character(1),
    asunto character varying
);


ALTER TABLE mensaje_enviados_traza OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 18092)
-- Name: mensaje_enviados_traza_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE mensaje_enviados_traza_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE mensaje_enviados_traza_id_seq OWNER TO postgres;

--
-- TOC entry 2077 (class 0 OID 0)
-- Dependencies: 181
-- Name: mensaje_enviados_traza_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE mensaje_enviados_traza_id_seq OWNED BY mensaje_enviados_traza.id;


--
-- TOC entry 179 (class 1259 OID 18071)
-- Name: mensajes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE mensajes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE mensajes_id_seq OWNER TO postgres;

--
-- TOC entry 2078 (class 0 OID 0)
-- Dependencies: 179
-- Name: mensajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE mensajes_id_seq OWNED BY mensaje.id;


--
-- TOC entry 184 (class 1259 OID 18111)
-- Name: perfil; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE perfil (
    id integer NOT NULL,
    descripcion character varying,
    fecha timestamp with time zone
);


ALTER TABLE perfil OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 18109)
-- Name: perfiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE perfiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE perfiles_id_seq OWNER TO postgres;

--
-- TOC entry 2079 (class 0 OID 0)
-- Dependencies: 183
-- Name: perfiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE perfiles_id_seq OWNED BY perfil.id;


--
-- TOC entry 177 (class 1259 OID 18057)
-- Name: sms; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE sms (
    id integer NOT NULL,
    tlf character varying,
    fecha_envio timestamp with time zone,
    fecha_enviado timestamp with time zone,
    id_mensaje integer,
    fecha_creacion timestamp with time zone,
    id_usuario integer,
    estatus boolean DEFAULT true
);


ALTER TABLE sms OWNER TO postgres;

--
-- TOC entry 178 (class 1259 OID 18060)
-- Name: sms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sms_id_seq OWNER TO postgres;

--
-- TOC entry 2080 (class 0 OID 0)
-- Dependencies: 178
-- Name: sms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sms_id_seq OWNED BY sms.id;


--
-- TOC entry 174 (class 1259 OID 18022)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE usuario (
    id integer NOT NULL,
    cedula integer,
    estatus boolean,
    fecha time without time zone,
    id_perfil integer,
    nombre_apellido character varying
);


ALTER TABLE usuario OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 18020)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usuario_id_seq OWNER TO postgres;

--
-- TOC entry 2081 (class 0 OID 0)
-- Dependencies: 173
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE usuario_id_seq OWNED BY usuario.id;


--
-- TOC entry 1922 (class 2604 OID 18051)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY correos ALTER COLUMN id SET DEFAULT nextval('correos_id_seq'::regclass);


--
-- TOC entry 1926 (class 2604 OID 18076)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY mensaje ALTER COLUMN id SET DEFAULT nextval('mensajes_id_seq'::regclass);


--
-- TOC entry 1927 (class 2604 OID 18097)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY mensaje_enviados_traza ALTER COLUMN id SET DEFAULT nextval('mensaje_enviados_traza_id_seq'::regclass);


--
-- TOC entry 1928 (class 2604 OID 18114)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY perfil ALTER COLUMN id SET DEFAULT nextval('perfiles_id_seq'::regclass);


--
-- TOC entry 1924 (class 2604 OID 18062)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sms ALTER COLUMN id SET DEFAULT nextval('sms_id_seq'::regclass);


--
-- TOC entry 1921 (class 2604 OID 18025)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usuario ALTER COLUMN id SET DEFAULT nextval('usuario_id_seq'::regclass);


--
-- TOC entry 2059 (class 0 OID 18048)
-- Dependencies: 176
-- Data for Name: correos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO correos (id, correo, fecha_creacion, id_mensaje, fecha_envio, fecha_enviado, id_usuario, estatus) VALUES (54, 'jsoto@mppeuct.gob.ve', '2016-10-28 10:51:41.327749-04:30', 48, '2016-10-28 00:00:00-04:30', '2016-10-28 10:52:05.458272-04:30', 1, true);
INSERT INTO correos (id, correo, fecha_creacion, id_mensaje, fecha_envio, fecha_enviado, id_usuario, estatus) VALUES (53, 'jsoto@mppeuct.gob.ve', '2016-10-24 17:13:54.958402-04:30', 46, '2016-10-24 00:00:00-04:30', '2016-10-28 10:54:59.658334-04:30', 1, true);


--
-- TOC entry 2082 (class 0 OID 0)
-- Dependencies: 175
-- Name: correos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('correos_id_seq', 54, true);


--
-- TOC entry 2063 (class 0 OID 18073)
-- Dependencies: 180
-- Data for Name: mensaje; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO mensaje (id, mensaje, fecha, asunto) VALUES (46, '<p>awdawdaw</p>', '17:13:54.958402', 'adawdawdaw');
INSERT INTO mensaje (id, mensaje, fecha, asunto) VALUES (47, 'prueba', '14:49:35.943875', NULL);
INSERT INTO mensaje (id, mensaje, fecha, asunto) VALUES (48, '<p>rdgdrgdrg</p>', '10:51:41.327749', 'wadaw');


--
-- TOC entry 2065 (class 0 OID 18094)
-- Dependencies: 182
-- Data for Name: mensaje_enviados_traza; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO mensaje_enviados_traza (id, mensaje, tlf_correo, id_usuario, fecha, fecha_envio, tipo_mensaje, asunto) VALUES (32, '<p>awdawdaw</p>', 'jsoto@mppeuct.gob.ve', 1, '2016-10-24 17:13:54.958402-04:30', '2016-10-24 00:00:00-04:30', 'c', 'adawdawdaw');
INSERT INTO mensaje_enviados_traza (id, mensaje, tlf_correo, id_usuario, fecha, fecha_envio, tipo_mensaje, asunto) VALUES (33, 'prueba', '4162112613', 1, '2016-10-27 14:49:35.943875-04:30', '2016-10-27 00:00:00-04:30', 's', NULL);
INSERT INTO mensaje_enviados_traza (id, mensaje, tlf_correo, id_usuario, fecha, fecha_envio, tipo_mensaje, asunto) VALUES (34, '<p>rdgdrgdrg</p>', 'jsoto@mppeuct.gob.ve', 1, '2016-10-28 10:51:41.327749-04:30', '2016-10-28 00:00:00-04:30', 'c', 'wadaw');


--
-- TOC entry 2083 (class 0 OID 0)
-- Dependencies: 181
-- Name: mensaje_enviados_traza_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('mensaje_enviados_traza_id_seq', 34, true);


--
-- TOC entry 2084 (class 0 OID 0)
-- Dependencies: 179
-- Name: mensajes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('mensajes_id_seq', 48, true);


--
-- TOC entry 2067 (class 0 OID 18111)
-- Dependencies: 184
-- Data for Name: perfil; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO perfil (id, descripcion, fecha) VALUES (4, 'GESTOR MULTILPLE', '2016-10-20 17:35:18.42231-04:30');
INSERT INTO perfil (id, descripcion, fecha) VALUES (1, 'ADMINISTRADOR', '2016-10-20 17:30:46.846218-04:30');
INSERT INTO perfil (id, descripcion, fecha) VALUES (2, 'GESTOR CORREO', '2016-10-20 17:33:34.246209-04:30');
INSERT INTO perfil (id, descripcion, fecha) VALUES (3, 'GESTOR SMS', '2016-10-20 17:34:17.790285-04:30');


--
-- TOC entry 2085 (class 0 OID 0)
-- Dependencies: 183
-- Name: perfiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('perfiles_id_seq', 4, true);


--
-- TOC entry 2060 (class 0 OID 18057)
-- Dependencies: 177
-- Data for Name: sms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO sms (id, tlf, fecha_envio, fecha_enviado, id_mensaje, fecha_creacion, id_usuario, estatus) VALUES (42, '4162112613', '2016-10-27 00:00:00-04:30', '2016-10-27 16:10:50.685278-04:30', 47, '2016-10-27 14:49:35.943875-04:30', 1, true);


--
-- TOC entry 2086 (class 0 OID 0)
-- Dependencies: 178
-- Name: sms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sms_id_seq', 42, true);


--
-- TOC entry 2057 (class 0 OID 18022)
-- Dependencies: 174
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO usuario (id, cedula, estatus, fecha, id_perfil, nombre_apellido) VALUES (9, 13156604, true, '17:14:53.645229', 1, 'Nairobi Josefina Manrique Rojas');
INSERT INTO usuario (id, cedula, estatus, fecha, id_perfil, nombre_apellido) VALUES (10, 14304979, true, '17:15:08.006609', 1, 'Julio Villasmil');
INSERT INTO usuario (id, cedula, estatus, fecha, id_perfil, nombre_apellido) VALUES (8, 13887905, true, '17:14:37.214451', 1, 'ALAIN JOSE BONILLA CORRAL');
INSERT INTO usuario (id, cedula, estatus, fecha, id_perfil, nombre_apellido) VALUES (1, 19163767, true, '13:53:20.518438', 1, 'jsoto');


--
-- TOC entry 2087 (class 0 OID 0)
-- Dependencies: 173
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('usuario_id_seq', 10, true);


--
-- TOC entry 1932 (class 2606 OID 18056)
-- Name: correos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY correos
    ADD CONSTRAINT correos_pkey PRIMARY KEY (id);


--
-- TOC entry 1938 (class 2606 OID 18102)
-- Name: mensaje_enviados_traza_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY mensaje_enviados_traza
    ADD CONSTRAINT mensaje_enviados_traza_pkey PRIMARY KEY (id);


--
-- TOC entry 1936 (class 2606 OID 18081)
-- Name: mensaje_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY mensaje
    ADD CONSTRAINT mensaje_pkey PRIMARY KEY (id);


--
-- TOC entry 1940 (class 2606 OID 18119)
-- Name: perfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY perfil
    ADD CONSTRAINT perfiles_pkey PRIMARY KEY (id);


--
-- TOC entry 1934 (class 2606 OID 18070)
-- Name: sms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY sms
    ADD CONSTRAINT sms_pkey PRIMARY KEY (id);


--
-- TOC entry 1930 (class 2606 OID 18040)
-- Name: usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 1942 (class 2606 OID 18082)
-- Name: correos_id_mensaje_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY correos
    ADD CONSTRAINT correos_id_mensaje_fkey FOREIGN KEY (id_mensaje) REFERENCES mensaje(id);


--
-- TOC entry 1943 (class 2606 OID 18130)
-- Name: correos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY correos
    ADD CONSTRAINT correos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES usuario(id);


--
-- TOC entry 1946 (class 2606 OID 18103)
-- Name: mensaje_enviados_traza_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY mensaje_enviados_traza
    ADD CONSTRAINT mensaje_enviados_traza_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES usuario(id);


--
-- TOC entry 1944 (class 2606 OID 18087)
-- Name: sms_id_mensaje_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sms
    ADD CONSTRAINT sms_id_mensaje_fkey FOREIGN KEY (id_mensaje) REFERENCES mensaje(id);


--
-- TOC entry 1945 (class 2606 OID 18135)
-- Name: sms_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sms
    ADD CONSTRAINT sms_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES usuario(id);


--
-- TOC entry 1941 (class 2606 OID 18125)
-- Name: usuario_id_perfil_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usuario
    ADD CONSTRAINT usuario_id_perfil_fkey FOREIGN KEY (id_perfil) REFERENCES perfil(id);


--
-- TOC entry 2074 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-10-28 15:32:29 VET

--
-- PostgreSQL database dump complete
--

