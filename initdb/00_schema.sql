drop database if exists `main`;
create database `main` character set utf8mb4 collate utf8mb4_0900_ai_ci;
use `main`;

create table `user` (
  `id` int unsigned not null auto_increment,
  `username` varchar(64) not null unique,
  `name` varchar(256),
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

