drop table if exists categories, users, contact_methods, contact_info, courses, ratings, user_courses;

create table categories(
    name varchar(128) primary key not null
    );

create table contact_methods(
    name varchar(128) primary key
);

create table users(
    id serial primary key,
    email varchar(256) not null unique,
    password varchar(64) not null,
    first_name varchar(32) not null,
    last_name varchar(32) not null,
    description varchar(1024),
    is_instructor boolean default false
    );

create table courses(
    id serial primary key,
    name varchar(64) not null,
    description varchar(1024) not null,
    instructor_id integer references users(id) not null,
    category varchar(128) references categories(name) not null,
    rate real not null
);

create table contact_info(
    id serial primary key,
    user_id integer references users(id) not null,
    contact_method varchar(128) references contact_methods(name) not null,
    contact_info varchar(256) not null
);

create table ratings(
    id serial primary key,
    user_id integer references users(id) not null,
    course_id integer references courses(id) not null,
    rating smallint not null,
    comment varchar(512)
);

create table user_courses(
    id serial primary key,
    user_id integer references courses(id) not null,
    course_id integer references courses(id) not null,
    course_date date not null,
    course_time time not null,
    course_length smallint not null  
);