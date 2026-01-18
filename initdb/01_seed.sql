use `main`;

insert into `user` (`username`, `name`, `privilege`, `password`) values
  ('admin', 'Administrator', 1, '$2a$10$Q06M/WzHfIKY8F9nEKxF7uaIVMMRdGyopO1ykUiObzoEiFsjQSvBK');

insert into `activity`(`name`, `startdate`, `starttime`, `length`, `capacity`, `approved`, `location`, `lat`, `lon`, `detail`) values
  ('Park paint', '2026-01-18', '19:00', 2, 20, 1, 'Pacific Spirit Park', 49.253270, -123.215703, 'Lorem ipsum.'),
  ('Park paint', '2026-01-25', '19:00', 2, 20, 0, 'Pacific Spirit Park', 49.253270, -123.215703, 'Lorem ipsum.');
