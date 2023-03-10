create database persol;
use persol;

-- Mail 
-- username: persol.project123@gmail.com
-- password: persol123

CREATE TABLE `role` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(100)
);

CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE,
  `password` varchar(255),
  `fullname` varchar(100),
  `phone` varchar(100),
  `address` varchar(100),
  `date` datetime DEFAULT (now()),
  `role_id` INT
);

CREATE TABLE `category` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL
);

CREATE TABLE `brand` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  image varchar(50)
);

create table category_brand (
	category_id int,
	brand_id int,
    primary key(category_id, brand_id),
    foreign key(category_id) references category(id),
    foreign key(brand_id) references brand(id)
);

CREATE TABLE `product` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `main_image` varchar(100),
  `amount_of_sold` int DEFAULT 0,
  `price` int,
  detail text,
  `category_id` int,
  `brand_id` int
);



CREATE TABLE `image_product` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `product_id` int
);

CREATE TABLE `bookmark_product` (
  `user_id` int,
  `product_id` int,
  PRIMARY KEY (`user_id`, `product_id`)
);

CREATE TABLE `coupon` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50) UNIQUE NOT NULL,
  `rate` float NOT NULL
);

CREATE TABLE `status` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50)
);

CREATE TABLE `order` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `fee_ship` int,
  `coupon` float,
  `temp_total` int,
  `total` float,
  `user_id` int,
  `delivery_address` varchar(255),
  `status_id` int
);

CREATE TABLE `product_order` (
  `order_id` int,
  `product_id` int,
  `amount` int,
  `price` int,
  PRIMARY KEY (`order_id`, `product_id`)
);

CREATE TABLE mail (
  id int auto_increment,
  fullname varchar(50),
  email varchar(50),
  phone varchar(20),
  message text,
  createdate datetime default now(),
  PRIMARY KEY (id)
);

CREATE TABLE visitor (
	id int auto_increment primary key,
    ip_address varchar(20),
  count int,
  start_time datetime default now(),
  end_time datetime

);

ALTER TABLE `user` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`);

ALTER TABLE `image_product` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

ALTER TABLE `bookmark_product` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `bookmark_product` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `product_order` ADD FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

ALTER TABLE `product_order` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);


INSERT INTO role(id, name, description ) VALUES (1, "ROLE_ADMIN", "Admin");
INSERT INTO role(id, name, description ) VALUES (2, "ROLE_USER", "Customer");

INSERT INTO `user` (`id`, `email`, `password`, `fullname`, `phone`, `address`, `date`, `role_id`) VALUES (NULL, 'admin@gmail.com', '$2a$10$kAvJY6I3l.VEa9vCEeFV6un18QzgX9pW3B3AfsIhUFdukqXOe5uiK', 'ADMIN', 091234567, 'test', '2023-02-11 14:23:26', '1');
INSERT INTO `user` (`id`, `email`, `password`, `fullname`, `phone`, `address`, `date`, `role_id`) VALUES (NULL, 'user@gmail.com', '$2a$10$/QPViOFoUAEV3HKPJ3hbOOYyj0i7W0xZcAxPluujW88YTPMQdpEgi', '?????i D??ng', NULL, NULL, '2023-02-11 14:23:26', '2');


/*brand*/
INSERT INTO `brand` (`id`, `name`, image) VALUES (NULL, 'Chemi','Chemi.webp');
INSERT INTO `brand` (`id`, `name`, image) VALUES (NULL, 'Polar','Polar.webp');
INSERT INTO `brand` (`id`, `name`, image ) VALUES (NULL, 'Rayban' , 'rayban.webp');
INSERT INTO `brand` (`id`, `name`, image) VALUES (NULL, 'Prada','Prada.webp');
INSERT INTO `brand` (`id`, `name`, image) VALUES (NULL, 'Hoya','Hoya.webp');
INSERT INTO `brand` (`id`, `name`, image) VALUES (NULL, 'Element', 'Elements.webp' );
INSERT INTO `brand` (`id`, `name`, image ) VALUES (NULL, 'Oakley', 'Oakley.webp' );
INSERT INTO `brand` (`id`, `name`, image) VALUES (NULL, 'Coach','Coach.webp');
INSERT INTO `brand` (`id`, `name`, image) VALUES (NULL, 'Micheals Kors','MK.webp');




/*category*/
INSERT INTO category(name) VALUES ("Sunglasses");
INSERT INTO category(name)  VALUES ("Glasses");
INSERT INTO category(name) VALUES ("Lenses");


insert into category_brand(category_id,brand_id) values (1,3);
insert into category_brand(category_id,brand_id) values (1,4);
insert into category_brand(category_id,brand_id) values (1,8);

insert into category_brand(category_id,brand_id) values (2,5);
insert into category_brand(category_id,brand_id) values (2,6);
insert into category_brand(category_id,brand_id) values (2,1);

insert into category_brand(category_id,brand_id) values (3,3);
insert into category_brand(category_id,brand_id) values (3,8);
insert into category_brand(category_id,brand_id) values (3,4);
insert into category_brand(category_id,brand_id) values (3,2);
insert into category_brand(category_id,brand_id) values (3,9);

/*Product*/
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (1, 'Chemi U2', 'ChemiU2.png', 1, 302000, "<p>Th????ng hi???u:&nbsp;Chemi HQ ??? Chi???t su???t: 1.74 ??? V??n ph???: U2</p>
<p>Xu???t x???: H??n Qu???c.</p>
<p>?????c t??nh: Aspheric,&nbsp;m???ng 35% , ng??n UV400, h???n ch???&nbsp;ch??i lo??, ha??n ch???? tr???y.</p>
<p>?????t ti??u chu???n UV400, CE, ISO 9001.</p>" , 3, 1);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (2, 'Rayban Pola', 'RAYBANPOLA.webp', 10, 58000000, '<p>M?? s???n ph???m:&nbsp;RAYBAN-POLA-8316</p>
<p>Xu???t x??? s???n ph???m: Italy</p>
<p>N??i s???n xu???t: China</p>
<p>Ch???t li???u g???ng: Kim lo???i</p>
<p>Gi???i t??nh: Unisex</p>
<p>M??u s???c( nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng)</p>
<p>Th??ng s??? k??? thu???t: 62</p>
<p>T??nh n??ng Polarized: C??</p>
<p>T??nh n??ng L???c UV: C??</p>' , 1, 3);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (3, 'RAYBAN-2140F', 'RAYBAN2140F.webp', 3, 4200000, '<p>M?? s???n ph???m:&nbsp;RAYBAN-2140F</p>
<p>Xu???t x??? s???n ph???m: Italy</p>
<p>N??i s???n xu???t: Italy</p>
<p>Ch???t li???u g???ng: nh???a</p>
<p>Gi???i t??nh: Unisex</p>
<p>M??u s???c: nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng</p>' , 1, 3);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (4, 'RAYBAN-2547VF', 'RAYBAN2547VF.webp', 0, 2000000 ,'<p>M?? s???n ph???m:&nbsp;RAYBAN-2547VF</p>
<p>Xu???t x??? s???n ph???m: Italy</p>
<p>N??i s???n xu???t: China</p>
<p>Ch???t li???u g???ng: nh???a, kim lo???i</p>
<p>Gi???i t??nh: Unisex</p>
<p>M??u s???c (nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng)</p>',2, 3);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (5, 'PRADA-0PR', 'PRADA-0PR.webp', 6, 1000000, '<p>M?? s???n ph???m:&nbsp;PR-0PR-07XVF</p>
<p>Xu???t x??? s???n ph???m: Italy</p>
<p>N??i s???n xu???t: Italy</p>
<p>Ch???t li???u g???ng: Nh???a</p>
<p>Gi???i t??nh: Unisex</p>
<p>M??u s???c (nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng):</p>
<p>Th??ng s??? k??? thu???t: 54</p>' , 1, 4);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (6, 'PRADA-0PR 05TVF-2AU1O1(52IT)', 'PRADA0P.webp', 9, 6600000, '<p>M?? s???n ph???m:&nbsp;PR-0PR-05TVF</p>
<p>Xu???t x??? s???n ph???m: Italy</p>
<p>N??i s???n xu???t: Italy</p>
<p>Ch???t li???u g???ng: Nh???a</p>
<p>Gi???i t??nh: Unisex</p>
<p>M??u s???c (nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng):</p>
<p>Th??ng s??? k??? thu???t: 52</p>' , 2, 4);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (7, 'POLAR-ALL-03(IT)', 'POLAR-ALL.webp', 7, 1400000, '<p>M?? s???n ph???m:POLAR-ALL</p>
<p class="p1">Xu???t x??? s???n ph???m: Italy</p>
<p class="p1">N??i s???n xu???t: China</p>
<p class="p1">Ch???t li???u g???ng: kim lo???i</p>
<p class="p1">Gi???i t??nh: Unisex</p>
<p class="p1">M??u s???c( nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng)</p>
<p class="p1">T??nh n??ng Polarized: C??</p>
<p class="p1">T??nh n??ng L???c UV: C??</p>' , 1, 2);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (8, 'Hilux Phoenix Hoya', 'Hilux-Phoenix-Hoya.webp', 30, 700000, '<p><strong>TR??NG TRIVIEX HOYA NH???T PHOENIX</strong></p>
<p class="uppercase"><span data-text-color="secondary"><strong>CHUY??N D??NG CHO G???NG B???T ???C</strong></span></p>
<p><strong>PHOENIX</strong>&nbsp;1.53 l?? v???t li???u k??nh l?? t?????ng cho nh???ng ng?????i c?? l???i s???ng n??ng ?????ng, ?????c bi???t l?? tr??? em v?? ?????i v???i nh???ng ng?????i s??? d???ng k??nh l?? m???t ph???n kh??ng th??? thi???u trong cu???c s???ng. L?? t?????ng cho c??c ????n thu???c ph??? bi???n nh???t, c??c m???c trung b??nh ?????n trung b??nh (l??n ?????n -5,00) v?? c??c m???c t??ng trung b??nh ?????n trung b??nh (l??n ?????n +5,00). T??nh ch???t c?? h???c c???a n?? l??m cho n?? ?????c bi???t t???t ?????i v???i nh???ng g???ng k??nh gi?? treo kh??ng c?? v??nh v?? khung kh??ng c?? v??nh.</p>
<p><strong>Tr??ng k??nh Hoya&nbsp;Hilux Phoenix</strong>&nbsp;l?? m???t trong hai s???n ph???m ???????c&nbsp;<strong>hi???p h???i ??o th??? l???c Hoa K???</strong>&nbsp;khuy???n ngh??? s??? d???ng cho tr??? em. Ngo??i ra,<strong>tr??ng k??nh Hoya Phoenix</strong>&nbsp;cung c???p b???o v??? 100% UVA v?? UVB.</p>' , 3, 5);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (9, 'Blue Uv Elements 1.56', 'Blue-Uv-Elements-1.56.webp', 19, 188000, '<p><strong>ELEMENTS BLUE UV ??? NG??N ??NH S??NG XANH</strong><br>
    CHI???T SU???T:&nbsp;<strong>1.56</strong></p>' , 3, 6);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (10, 'OAKLEY-0OO9208-9208-69(38US)', 'OAKLEY-0OO9208-9208-6938US2-scaled.webp', 5, 5450000, '<p>M?? s???n ph???m: OA-0OO9208</p>
<p>Xu???t x??? s???n ph???m: Italy</p>
<p>N??i s???n xu???t: USA</p>
<p>Ch???t li???u g???ng: Nh???a</p>
<p>Gi???i t??nh: Nam</p>
<p>M??u s???c (nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng)</p>
<p>Th??ng s??? k??? thu???t: 38</p>
<p>T??nh n??ng Polarized: C??</p>
<p>T??nh n??ng L???c UV: C??</p>' , 1, 7);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (11, 'COACH-8116F-5001-1356CN', 'COACH-8116F-5001-1356CN-scaled.webp', 5, 3000000, '<p>M?? s???n ph???m:&nbsp;COACH-8116F</p>
<p>Xu???t x??? s???n ph???m: Italy</p>
<p>N??i s???n xu???t: China</p>
<p>Ch???t li???u g???ng: Nh???a</p>
<p>Gi???i t??nh: N???</p>
<p>M??u s???c (nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng)</p>
<p>Th??ng s??? k??? thu???t: 56</p>
<p>T??nh n??ng Polarized : Kh??ng</p>
<p>T??nh n??ng L???c UV: C??</p>' , 1, 8);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (12, 'COACH-5047-9005(52CN)', 'COACH-5047-900552CN2-scaled.webp', 0, 3000000, '<p>M?? s???n ph???m:&nbsp;COACH-5047</p>
<p>Xu???t x??? s???n ph???m: Italy</p>
<p>N??i s???n xu???t: China</p>
<p>Ch???t li???u g???ng: Nh???a</p>
<p>Gi???i t??nh: N???</p>
<p>M??u s???c (nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng)</p>
<p>Th??ng s??? k??? thu???t: 52</p>' , 2, 8);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (13, 'MICHAEL KORS-1003-1001-6G(58CN)', 'MICHAEL-KORS-1003-1001-6G58CN2-scaled.webp', 10, 10000000, '<p>M?? s???n ph???m:&nbsp;MICHAEL-KORS-1003</p>
<p>Xu???t x??? s???n ph???m: Italy</p>
<p>N??i s???n xu???t: China</p>
<p>Ch???t li???u g???ng: Kim lo???i</p>
<p>Gi???i t??nh: N???</p>
<p>M??u s???c( nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng)</p>
<p>Th??ng s??? k??? thu???t: 58</p>
<p>T??nh n??ng L???c UV: C??</p>' , 1, 9);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (14, 'MICHAEL-KORS-3005DT', 'michael-kors-3005dt-102554cn-2.webp', 3, 3640000, '<p>M?? s???n ph???m:&nbsp;MICHAEL-KORS-3005DT</p>
<p>Xu???t x??? s???n ph???m: Italy</p>
<p>N??i s???n xu???t: China</p>
<p>Ch???t li???u g???ng: Kim lo???i</p>
<p>Gi???i t??nh: N???</p>
<p>M??u s???c (nh?? h??nh, c?? th??? thay ?????i ph??? thu???c v??o ??nh s??ng):</p>
<p>Th??ng s??? k??? thu???t: 54</p>' , 2, 9);

/*image_product*/
insert into image_product (id, name , product_id) values ( 1,  'RAYBAN-POLA-8316-029-N862CN3-scaled.webp'  ,2);
insert into image_product (id, name , product_id) values ( 2,  'RAYBAN-POLA-8316-029-N862CN-scaled.webp'  ,2);
insert into image_product (id, name , product_id) values ( 3,  'RAYBAN-2140F-1164-4M52IT3-scaled.webp'  ,3);
insert into image_product (id, name , product_id) values ( 4,  'RAYBAN-2140F-1164-4M52IT-scaled.webp'  ,3);
insert into image_product (id, name , product_id) values ( 5,  'RAYBAN-2547VF-200053CN3-scaled.webp'  ,4);
insert into image_product (id, name , product_id) values ( 6,  'RAYBAN-2547VF-200053CN-scaled.webp'  ,4);
insert into image_product (id, name , product_id) values ( 7,  'PRADA-0PR-09XS-1AB5S053IT3-scaled.webp'  ,5);
insert into image_product (id, name , product_id) values ( 8,  'PRADA-0PR-09XS-1AB5S053IT-scaled.webp'  ,5);
insert into image_product (id, name , product_id) values ( 9,  'PRADA-0PR-05TVF-2AU1O152IT3.webp'  ,6);
insert into image_product (id, name , product_id) values ( 10,  'PRADA-0PR-05TVF-2AU1O152IT.webp'  ,6);
insert into image_product (id, name , product_id) values ( 11,  'POLAR-ALL-03IT3-scaled.webp'  ,7);
insert into image_product (id, name , product_id) values ( 12,  'POLAR-ALL-03IT-scaled.webp'  ,7);
insert into image_product (id, name , product_id) values ( 13,  'OAKLEY-0OO9208-9208-6938US3-scaled.webp'  ,10);
insert into image_product (id, name , product_id) values ( 14,  'OAKLEY-0OO9208-9208-6938US-scaled.webp'  ,10);
insert into image_product (id, name , product_id) values ( 15,  'COACH-8116F-5001-1356CN3-scaled.webp'  ,11);
insert into image_product (id, name , product_id) values ( 16,  'COACH-8116F-5001-1356CN-scaled.webp'  ,11);
insert into image_product (id, name , product_id) values ( 17,  'COACH-5047-900552CN3-scaled.webp'  ,12);
insert into image_product (id, name , product_id) values ( 18,  'COACH-5047-900552CN-scaled.webp'  ,12);
insert into image_product (id, name , product_id) values ( 19,  'MICHAEL-KORS-1003-1001-6G58CN3-scaled.webp'  ,13);
insert into image_product (id, name , product_id) values ( 20,  'MICHAEL-KORS-1003-1001-6G58CN-scaled.webp'  ,13);
insert into image_product (id, name , product_id) values ( 21,  'michael-kors-3005dt-102554cn-3.webp'  ,14);
insert into image_product (id, name , product_id) values ( 22,  'michael-kors-3005dt-102554cn.webp'  ,14);

INSERT INTO `persol`.`mail` (`fullname`, `email`, `phone`, `message`) VALUES ('daidung', 'daianhdung99@gmail.com', '09120930213', 'T??i mu???n ???????c h??? tr???');