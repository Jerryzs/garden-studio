drop database if exists `main`;
create database `main` character set utf8mb4 collate utf8mb4_0900_ai_ci;
use `main`;

create table `user` (
  `id` int unsigned not null auto_increment,
  `username` varchar(64) not null unique,
  `name` varchar(256) not null,
  `privilege` tinyint unsigned not null default 0,
  `password` binary(60) not null,
  primary key (`id`)
);

create table `session` (
  `id` varchar(36) not null,
  `expiry` bigint unsigned not null,
  `user` int unsigned not null references `user`(`id`) on delete cascade,
  primary key (`id`)
);

create table `friend` (
  `user_a` int unsigned not null references `user`(`id`) on delete cascade,
  `user_b` int unsigned not null references `user`(`id`) on delete cascade,
  `timestamp` bigint unsigned not null,
  primary key (`user_a`, `user_b`)
);

create table `activity` (
  `id` int unsigned not null auto_increment,
  `name` varchar(256) not null,
  `startdate` date not null,
  `starttime` time not null,
  `length` time not null,
  `capacity` int unsigned,
  `image` varchar(512),
  `approved` bit(1) not null default 0,
  `location` varchar(256) not null,
  `lat` decimal(8, 6),
  `lon` decimal(9, 6),
  `detail` text not null,
  primary key (`id`)
);

create table `activity_item` (
  `activity` int unsigned not null references `activity`(`id`) on delete cascade,
  `name` varchar(64) not null,
  `image` varchar(512) not null,
  `count` int unsigned not null default 1,
  `cost` decimal(12, 2) not null default 0.00,
  primary key (`activity`, `name`)
);

create table `user_activity` (
  `user` int unsigned not null references `user`(`id`) on delete cascade,
  `activity` int unsigned not null references `activity`(`id`) on delete cascade,
  primary key (`user`, `activity`)
);
