create database "smartcity-db"
	with owner sohetvdc;

create table if not exists smartcity."user"
(
	user_id serial not null
		constraint user_pk
			primary key,
	email varchar not null,
	password varchar not null,
	firstname varchar not null,
	lastname varchar not null,
	phone integer not null,
	is_admin boolean not null,
	locality varchar not null,
	postal_code integer not null,
	street_number integer not null,
	street_name varchar not null,
	country varchar not null,
	picture bytea
);

alter table smartcity."user" owner to sohetvdc;

create unique index if not exists user_email_uindex
	on smartcity."user" (email);

create table if not exists smartcity.customer
(
	customer_id serial not null
		constraint customer_pk
			primary key,
	commune varchar,
	search_walker boolean not null,
	search_host boolean not null,
	user_id integer not null
		constraint customer_user_id_fk
			references smartcity."user"
);

alter table smartcity.customer owner to sohetvdc;

create table if not exists smartcity.animal_type
(
	animal_type_id serial not null
		constraint animal_type_pk
			primary key,
	label varchar not null
);

alter table smartcity.animal_type owner to sohetvdc;

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
			references smartcity.customer,
	animal_type_id integer not null
		constraint animal_type_id_fk
			references smartcity.animal_type
);

alter table smartcity.animal owner to sohetvdc;

create table if not exists smartcity.supplier
(
	supplier_id serial not null
		constraint supplier_pk
			primary key,
	is_host boolean not null,
	is_animal_walker boolean not null,
	slogan varchar,
	commune varchar,
	weight_max integer,
	user_id integer not null
		constraint supplier_user_id_fk
			references smartcity."user"
);

alter table smartcity.supplier owner to sohetvdc;

create table if not exists smartcity.absence
(
	absence_id serial not null
		constraint absence_pk
			primary key,
	date date not null,
	supplier_id integer not null
		constraint supplier_id_fk
			references smartcity.supplier
);

alter table smartcity.absence owner to sohetvdc;

create table if not exists smartcity.supplier_animal_type
(
	supplier_animal_type_id serial not null
		constraint supplier_animal_type_pk
			primary key,
	supplier_id integer not null
		constraint supplier_id_supplier_animal_type_fk
			references smartcity.supplier,
	animal_type_id integer not null
		constraint animal_type_id_supplier_animal_type_fk
			references smartcity.animal_type
);

alter table smartcity.supplier_animal_type owner to sohetvdc;

create table if not exists smartcity.service_hours
(
	service_hours_id serial not null
		constraint service_hours_pk
			primary key,
	start_date_time date not null,
	end_date_time date not null,
	type varchar not null,
	description_demande varchar,
	decsription_reponse varchar,
	status varchar,
	customer_id integer not null
		constraint customer_id_fk
			references smartcity.customer,
	supplier_id integer not null
		constraint supplier_id_fk
			references smartcity.supplier
);

alter table smartcity.service_hours owner to sohetvdc;

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
);

alter table smartcity.ranking owner to sohetvdc;

