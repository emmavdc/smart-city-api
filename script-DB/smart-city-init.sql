-- Admin user
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (1, 'emma.vdc@domain.be', '1234', 'Emma', 'Vandecasteele', 491121265, true, 'Thuin', 6530, 12, 'rue du Nesperiat', 'Belgique', null);
INSERT INTO smartcity."user" (user_id, email, password, firstname, lastname, phone, is_admin, locality, postal_code, street_number, street_name, country, picture) VALUES (2, 'dylan.sht@domain.be', '5678', 'Dylan', 'Sohet', 492131364, true, 'Houyet', 5560, 13, 'rue Saint-Roch', 'Belgique', null);


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