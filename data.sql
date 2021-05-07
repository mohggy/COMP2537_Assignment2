CREATE TABLE profile (
    ID int NOT NULL AUTO_INCREMENT,
    firstName varchar(30) NOT NULL,
    lastName varchar(30) NOT NULL,
    email varchar(30) NOT NULL,
    age int NOT NULL,
    job varchar(50) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO profile VALUES (1, 'Ramona', 'Brown', 'rbrown@hotmail.ca', 30, 'Nurse');
INSERT INTO profile VALUES (2, 'Mary', 'Green', 'mgreen@hotmail.ca', 25, 'Manager');
INSERT INTO profile VALUES (3, 'Donald', 'Turner', 'tdonald@hotmail.ca', 45, 'Hotel Manager');
INSERT INTO profile VALUES (4, 'Brian', 'Hope', 'bhope@hotmail.ca', 35, 'Police Officer');
INSERT INTO profile VALUES (5, 'Jennica', 'Nguyen', 'jenni@hotmail.ca', 25, 'Server');
INSERT INTO profile VALUES (6, 'Mahmood', 'Hussain', 'mhussain@hotmail.ca', 65, 'Retired');
INSERT INTO profile VALUES (7, 'Nabil', 'Kirkland', 'nkirk@gmail.ca', 34, 'Truck driver');
INSERT INTO profile VALUES (8, 'Joaquin', 'Fernandez', 'JoanquinF@hotmail.ca', 37, 'Actor');
INSERT INTO profile VALUES (9, 'Sakura', 'Ito', 'SakuraIto@hotmail.com', 24, 'Designer');
INSERT INTO profile VALUES (10, 'Mufasa', 'Mustafar', 'mmustafar@hotmail.ca', 38, 'Engineer');