CREATE SCHEMA smartcity;

create table if not exists smartcity."user"
(
	user_id serial not null
		constraint user_pk
			primary key,
	email varchar not null,
	password varchar not null,
	firstname varchar not null,
	lastname varchar not null,
	phone varchar not null,
	is_admin boolean not null,
	locality varchar not null,
	postal_code integer not null,
	street_number varchar not null,
	street_name varchar not null,
	country varchar not null,
	picture bytea
);

create unique index if not exists user_email_uindex
	on smartcity."user" (email);

create table if not exists smartcity.customer
(
	customer_id serial not null
		constraint customer_pk
			primary key,
	locality varchar,
	search_walker boolean not null,
	search_host boolean not null,
	user_id integer not null
		constraint customer_user_id_fk
			references smartcity."user"
				on delete cascade
);


create table if not exists smartcity.animal_type
(
	animal_type_id serial not null
		constraint animal_type_pk
			primary key,
	label varchar not null
);


create table if not exists smartcity.animal
(
	animal_id serial not null
		constraint animal_pk
			primary key,
	breed varchar not null,
	review varchar,
	weight integer not null,
	name varchar not null,
	picture bytea,
	customer_id integer not null
		constraint customer_id_fk
			references smartcity.customer
				on delete cascade,
	animal_type_id integer not null
		constraint animal_type_id_fk
			references smartcity.animal_type
				on delete cascade
);


create table if not exists smartcity.supplier
(
	supplier_id serial not null
		constraint supplier_pk
			primary key,
	is_host boolean not null,
	is_animal_walker boolean not null,
	slogan varchar,
	locality varchar,
	weight_max integer,
	user_id integer not null
		constraint supplier_user_id_fk
			references smartcity."user"
				on delete cascade
);


create table if not exists smartcity.absence
(
	absence_id serial not null
		constraint absence_pk
			primary key,
	date date not null,
	supplier_id integer not null
		constraint supplier_id_fk
			references smartcity.supplier
				on delete cascade
);


create table if not exists smartcity.supplier_animal_type
(
	supplier_animal_type_id serial not null
		constraint supplier_animal_type_pk
			primary key,
	supplier_id integer not null
		constraint supplier_id_supplier_animal_type_fk
			references smartcity.supplier
				on delete cascade,
	animal_type_id integer not null
		constraint animal_type_id_supplier_animal_type_fk
			references smartcity.animal_type
				on delete cascade
);


create table if not exists smartcity.service_hours
(
	service_hours_id serial not null
		constraint service_hours_pk
			primary key,
	start_date_time timestamp not null,
	end_date_time timestamp not null,
	type varchar not null,
	description_demande varchar,
	description_response varchar,
	status varchar,
	customer_id integer not null
		constraint customer_id_fk
			references smartcity.customer
				on delete cascade,
	supplier_id integer not null
		constraint supplier_id_fk
			references smartcity.supplier
				on delete cascade,
	animal_id integer not null
		constraint animal_id_fk
			references smartcity.animal
				on delete cascade
);


create table if not exists smartcity.ranking
(
	ranking_id serial not null
		constraint ranking_pk
			primary key,
	number_of_stars integer not null,
	review varchar,
	service_hours_id integer not null
		constraint service_hours_id_fk
			references smartcity.service_hours
				on delete cascade,
	customer_id integer not null
		constraint ranking_customer_id_fk
			references smartcity.customer
				on delete cascade,
	supplier_id integer not null
		constraint ranking_supplier_fk
			references smartcity.supplier
				on delete cascade
);

-- Animal type
INSERT INTO smartcity.animal_type (animal_type_id, label) VALUES (1, 'chat');
INSERT INTO smartcity.animal_type (animal_type_id, label) VALUES (2, 'chien');
INSERT INTO smartcity.animal_type (animal_type_id, label) VALUES (3, 'rongeur');
INSERT INTO smartcity.animal_type (animal_type_id, label) VALUES (4, 'tortue');
INSERT INTO smartcity.animal_type (animal_type_id, label) VALUES (5, 'poisson');
INSERT INTO smartcity.animal_type (animal_type_id, label) VALUES (6, 'mouton');
INSERT INTO smartcity.animal_type (animal_type_id, label) VALUES (7, 'cheval');
INSERT INTO smartcity.animal_type (animal_type_id, label) VALUES (8, 'oiseau');
INSERT INTO smartcity.animal_type (animal_type_id, label) VALUES (9, 'serpent');

-- User
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (107, 'laila.khz@domain.be', '$2b$10$JlwtCxe1EHg6JDCaOTQuSuNSvjgKGUNHcV.TWZZmVkBGYggetLp72', 'Laïla', 'Khrouz', '0498234342', false, 'Thuin', 6530, '120', 'Crombouly', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (173, 'benjamin.georges@domain.be', '$2b$10$pNcblBFEXVyfUBofJZXJX.VIsp3sCvJ5DtmCT/5Bmgm4RqDqQdwoq', 'Benjamin', 'Georges', '0493121232', false, 'Anderlues', 6150, '19', 'Place Albert 1er', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (216, 'jade.ipersiel@domain.be', '$2b$10$BFnr8ZAxSLSClAtQLXLineM.jrPOeDoVh/OLRIcWD72MlzpyFYQpS', 'Jade', 'Ipersiel', '0498111196', false, 'Thuin', 6530, '120', 'Crombouly', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (217, 'zoe.henry@domain.be', '$2b$10$A0Idb7zmQpyNWOdkxRTKh.sYY9X068vxm0Lw3T7PQRlRy4DEJXc/i', 'Zoé', 'Henry', '0498111196', false, 'Lobbes', 6540, '111', 'Rue du Seigneur', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (218, 'sophie.dwt@domain.be', '$2b$10$hB0qNdqjw0urLitTr4BioeBecbyMba2PBtbBEpzKFag6ZBJB4oBDi', 'Sophie', 'Dewitte', '0498111196', false, 'Lobbes', 6540, '96', 'Rue du Seigneur', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (189, 'nico.allegro@domain.be', '$2b$10$qrVMwOF7quHo8nRPYx0EKeWOr1aXgv/1.ifkRt5Ifo4ZrMKcib7Jm', 'Nicolas', 'Allegro', '0498111196', false, 'Thuin', 6530, '120', 'Crombouly', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (97, 'admin@domain.be', '$2b$10$McO.T4C0j9ylq1caGAE8G.arHFIHqPtMG8.n6hJQ3Y2FZYIzL3G/W', 'Admin', 'Admin', '493111265', true, 'Lobbes', 6540, '13', 'rue de l''Ecluse', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (174, 'mauricette.elt@domain.be', '$2b$10$3bsyzHf1S7vBq4a/Ks8lROIDzEvtfaWPz1a8PclMhYnwMkAy.fIMy', 'Mauricette', 'Elaut', '0496333399', false, 'Mont-sur-Marchienne', 6032, '17', 'Rue Saint-Jacques', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (93, 'emma.vdc@domain.be', '$2b$10$Mro450MIj6Nd66jTWlnak.pumUUuo.Df0YjCVa6/qMsLOkUYcRju6', 'Emma', 'Vandecasteele', '493111232', true, 'Thuin', 6530, '120', 'Crombouly', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (94, 'dylan.sht@domain.be', '$2b$10$C0nXon30gwLk1ot7KcWek.xK3p.pRss44ns6SykQv0hY/yDZx6fS2', 'Dylan', 'Sohet', '493111265', true, 'Houyet', 5560, '13', 'rue Saint-Roch', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (99, 'samy@domain.be', '$2b$10$lYLS1BAwY4jUSUDnH0GLSOwDvYUtHUbU471nSXJRp6bNFkWAUf8JG', 'Samy', 'Demarthe', '0497898965', false, 'Lobbes', 6540, '12', 'Rue de l Ecluse', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (172, 'laurence.kzsk@domain.be', '$2b$10$8jvhIIySFf0LRlkpu4rzY..fctpNe.BDxF5DF2QpQ3/64ZUgO66l.', 'Laurence', 'Kazusek', '0497898965', false, 'Thuin', 6530, '110', 'rue Crombouly', 'Belgique', null);

-- customer
INSERT INTO smartcity.customer (customer_id, locality, search_walker, search_host, user_id) VALUES (57, null, false, true, 107);
INSERT INTO smartcity.customer (customer_id, locality, search_walker, search_host, user_id) VALUES (40, null, false, true, 173);
INSERT INTO smartcity.customer (customer_id, locality, search_walker, search_host, user_id) VALUES (63, null, true, false, 174);
INSERT INTO smartcity.customer (customer_id, locality, search_walker, search_host, user_id) VALUES (64, null, false, true, 99);
INSERT INTO smartcity.customer (customer_id, locality, search_walker, search_host, user_id) VALUES (65, null, true, true, 172);
INSERT INTO smartcity.customer (customer_id, locality, search_walker, search_host, user_id) VALUES (66, null, true, true, 216);
INSERT INTO smartcity.customer (customer_id, locality, search_walker, search_host, user_id) VALUES (67, null, false, false, 217);
INSERT INTO smartcity.customer (customer_id, locality, search_walker, search_host, user_id) VALUES (68, null, false, false, 218);
INSERT INTO smartcity.customer (customer_id, locality, search_walker, search_host, user_id) VALUES (49, 'Lobbes', true, true, 189);

--supplier
INSERT INTO smartcity.supplier (supplier_id, is_host, is_animal_walker, slogan, locality, weight_max, user_id) VALUES (63, false, false, null, null, null, 216);
INSERT INTO smartcity.supplier (supplier_id, is_host, is_animal_walker, slogan, locality, weight_max, user_id) VALUES (37, false, true, null, null, null, 174);
INSERT INTO smartcity.supplier (supplier_id, is_host, is_animal_walker, slogan, locality, weight_max, user_id) VALUES (64, true, true, null, null, null, 217);
INSERT INTO smartcity.supplier (supplier_id, is_host, is_animal_walker, slogan, locality, weight_max, user_id) VALUES (65, true, true, null, null, null, 218);
INSERT INTO smartcity.supplier (supplier_id, is_host, is_animal_walker, slogan, locality, weight_max, user_id) VALUES (44, false, false, null, null, null, 189);
INSERT INTO smartcity.supplier (supplier_id, is_host, is_animal_walker, slogan, locality, weight_max, user_id) VALUES (36, true, false, null, null, null, 172);
INSERT INTO smartcity.supplier (supplier_id, is_host, is_animal_walker, slogan, locality, weight_max, user_id) VALUES (24, true, true, null, null, null, 107);
INSERT INTO smartcity.supplier (supplier_id, is_host, is_animal_walker, slogan, locality, weight_max, user_id) VALUES (60, false, false, null, null, null, 173);
INSERT INTO smartcity.supplier (supplier_id, is_host, is_animal_walker, slogan, locality, weight_max, user_id) VALUES (61, false, false, null, null, null, 99);

--absence
INSERT INTO smartcity.absence (absence_id, date, supplier_id) VALUES (20, '2020-12-10', 24);
INSERT INTO smartcity.absence (absence_id, date, supplier_id) VALUES (22, '2022-11-12', 24);
INSERT INTO smartcity.absence (absence_id, date, supplier_id) VALUES (23, '2022-11-13', 24);
INSERT INTO smartcity.absence (absence_id, date, supplier_id) VALUES (24, '2022-05-12', 24);

--animal
INSERT INTO smartcity.animal (animal_id, breed, review, weight, name, picture, customer_id, animal_type_id) VALUES (5, 'golden retriever', 'Toutou est très amitieux !', 40, 'Toutou', null, 49, 2);
INSERT INTO smartcity.animal (animal_id, breed, review, weight, name, picture, customer_id, animal_type_id) VALUES (4, 'golden retriever', 'Sam est très amitieux, il a 10 ans !', 42, 'Sam', null, 49, 2);
INSERT INTO smartcity.animal (animal_id, breed, review, weight, name, picture, customer_id, animal_type_id) VALUES (6, 'dalmatien', 'Toto est amitieux', 30, 'Toto', null, 63, 2);

--supplier animal
INSERT INTO smartcity.supplier_animal_type (supplier_animal_type_id, supplier_id, animal_type_id) VALUES (2, 24, 2);
INSERT INTO smartcity.supplier_animal_type (supplier_animal_type_id, supplier_id, animal_type_id) VALUES (3, 24, 1);

--service hours
INSERT INTO smartcity.service_hours (service_hours_id, start_date_time, end_date_time, type, description_demande, description_response, status, customer_id, supplier_id, animal_id) VALUES (7, '2021-03-12 00:00:00.000000', '2021-03-16 00:00:00.000000', 'accueillir', 'Bonjour je voudrais faire garder mon chien', null, 'en attente', 49, 24, 4);
INSERT INTO smartcity.service_hours (service_hours_id, start_date_time, end_date_time, type, description_demande, description_response, status, customer_id, supplier_id, animal_id) VALUES (15, '2020-12-15 00:00:00.000000', '2020-12-16 00:00:00.000000', 'accueillir', 'Bonjour, je viens faire vous pour faire garder Sam !', 'Bonjour Nicolas, j''accepte votre demande', 'accepté', 49, 24, 4);
INSERT INTO smartcity.service_hours (service_hours_id, start_date_time, end_date_time, type, description_demande, description_response, status, customer_id, supplier_id, animal_id) VALUES (14, '2021-05-12 00:00:00.000000', '2021-05-16 00:00:00.000000', 'accueillir', 'Bonjour je voudrais faire garder mon chien', 'Ok j''accepte votre demande, à bientôt !', 'accepté', 49, 24, 4);
INSERT INTO smartcity.service_hours (service_hours_id, start_date_time, end_date_time, type, description_demande, description_response, status, customer_id, supplier_id, animal_id) VALUES (17, '2020-05-12 00:00:00.000000', '2020-05-16 00:00:00.000000', 'accueillir', 'Bonjour je voudrais faire garder mon chien', 'Ok j''accepte votre demande, à bientôt !', 'accepté', 49, 24, 4);
INSERT INTO smartcity.service_hours (service_hours_id, start_date_time, end_date_time, type, description_demande, description_response, status, customer_id, supplier_id, animal_id) VALUES (18, '2021-05-12 13:00:00.000000', '2021-05-12 15:00:00.000000', 'promener', 'Hello, je voudrais faire garder Toto', null, 'en attente', 63, 24, 6);

-- ranking
INSERT INTO smartcity.ranking (ranking_id, number_of_stars, review, service_hours_id, customer_id, supplier_id) VALUES (1, 5, 'Super, merci laila !', 15, 49, 24);
INSERT INTO smartcity.ranking (ranking_id, number_of_stars, review, service_hours_id, customer_id, supplier_id) VALUES (3, 4, 'Super !', 17, 49, 24);




