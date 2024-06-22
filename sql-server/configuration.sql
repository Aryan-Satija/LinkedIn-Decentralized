create database linkedin;

use linkedin;

Create table Messages (
	id int primary key auto_increment, 
	_from varchar(100) not null,
    _to varchar(100) not null,
    _text varchar(200) not null,
    _createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);