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
INSERT INTO `user` (`id`, `email`, `password`, `fullname`, `phone`, `address`, `date`, `role_id`) VALUES (NULL, 'user@gmail.com', '$2a$10$/QPViOFoUAEV3HKPJ3hbOOYyj0i7W0xZcAxPluujW88YTPMQdpEgi', 'Đại Dũng', NULL, NULL, '2023-02-11 14:23:26', '2');


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
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (1, 'Chemi U2', 'ChemiU2.png', 1, 302000, "<p>Thương hiệu:&nbsp;Chemi HQ – Chiết suất: 1.74 – Ván phủ: U2</p>
<p>Xuất xứ: Hàn Quốc.</p>
<p>Đặc tính: Aspheric,&nbsp;mỏng 35% , ngăn UV400, hạn chế&nbsp;chói loá, hạn chế trầy.</p>
<p>Đạt tiêu chuẩn UV400, CE, ISO 9001.</p>" , 3, 1);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (2, 'Rayban Pola', 'RAYBANPOLA.webp', 10, 58000000, '<p>Mã sản phẩm:&nbsp;RAYBAN-POLA-8316</p>
<p>Xuất xứ sản phẩm: Italy</p>
<p>Nơi sản xuất: China</p>
<p>Chất liệu gọng: Kim loại</p>
<p>Giới tính: Unisex</p>
<p>Màu sắc( như hình, có thể thay đổi phụ thuộc vào ánh sáng)</p>
<p>Thông số kỹ thuật: 62</p>
<p>Tính năng Polarized: Có</p>
<p>Tính năng Lọc UV: Có</p>' , 1, 3);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (3, 'RAYBAN-2140F', 'RAYBAN2140F.webp', 3, 4200000, '<p>Mã sản phẩm:&nbsp;RAYBAN-2140F</p>
<p>Xuất xứ sản phẩm: Italy</p>
<p>Nơi sản xuất: Italy</p>
<p>Chất liệu gọng: nhựa</p>
<p>Giới tính: Unisex</p>
<p>Màu sắc: như hình, có thể thay đổi phụ thuộc vào ánh sáng</p>' , 1, 3);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (4, 'RAYBAN-2547VF', 'RAYBAN2547VF.webp', 0, 2000000 ,'<p>Mã sản phẩm:&nbsp;RAYBAN-2547VF</p>
<p>Xuất xứ sản phẩm: Italy</p>
<p>Nơi sản xuất: China</p>
<p>Chất liệu gọng: nhựa, kim loại</p>
<p>Giới tính: Unisex</p>
<p>Màu sắc (như hình, có thể thay đổi phụ thuộc vào ánh sáng)</p>',2, 3);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (5, 'PRADA-0PR', 'PRADA-0PR.webp', 6, 1000000, '<p>Mã sản phẩm:&nbsp;PR-0PR-07XVF</p>
<p>Xuất xứ sản phẩm: Italy</p>
<p>Nơi sản xuất: Italy</p>
<p>Chất liệu gọng: Nhựa</p>
<p>Giới tính: Unisex</p>
<p>Màu sắc (như hình, có thể thay đổi phụ thuộc vào ánh sáng):</p>
<p>Thông số kỹ thuật: 54</p>' , 1, 4);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (6, 'PRADA-0PR 05TVF-2AU1O1(52IT)', 'PRADA0P.webp', 9, 6600000, '<p>Mã sản phẩm:&nbsp;PR-0PR-05TVF</p>
<p>Xuất xứ sản phẩm: Italy</p>
<p>Nơi sản xuất: Italy</p>
<p>Chất liệu gọng: Nhựa</p>
<p>Giới tính: Unisex</p>
<p>Màu sắc (như hình, có thể thay đổi phụ thuộc vào ánh sáng):</p>
<p>Thông số kỹ thuật: 52</p>' , 2, 4);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (7, 'POLAR-ALL-03(IT)', 'POLAR-ALL.webp', 7, 1400000, '<p>Mã sản phẩm:POLAR-ALL</p>
<p class="p1">Xuất xứ sản phẩm: Italy</p>
<p class="p1">Nơi sản xuất: China</p>
<p class="p1">Chất liệu gọng: kim loại</p>
<p class="p1">Giới tính: Unisex</p>
<p class="p1">Màu sắc( như hình, có thể thay đổi phụ thuộc vào ánh sáng)</p>
<p class="p1">Tính năng Polarized: Có</p>
<p class="p1">Tính năng Lọc UV: Có</p>' , 1, 2);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (8, 'Hilux Phoenix Hoya', 'Hilux-Phoenix-Hoya.webp', 30, 700000, '<p><strong>TRÒNG TRIVIEX HOYA NHẬT PHOENIX</strong></p>
<p class="uppercase"><span data-text-color="secondary"><strong>CHUYÊN DÙNG CHO GỌNG BẮT ỐC</strong></span></p>
<p><strong>PHOENIX</strong>&nbsp;1.53 là vật liệu kính lý tưởng cho những người có lối sống năng động, đặc biệt là trẻ em và đối với những người sử dụng kính là một phần không thể thiếu trong cuộc sống. Lý tưởng cho các đơn thuốc phổ biến nhất, các mức trung bình đến trung bình (lên đến -5,00) và các mức tăng trung bình đến trung bình (lên đến +5,00). Tính chất cơ học của nó làm cho nó đặc biệt tốt đối với những gọng kính giá treo không có vành và khung không có vành.</p>
<p><strong>Tròng kính Hoya&nbsp;Hilux Phoenix</strong>&nbsp;là một trong hai sản phẩm được&nbsp;<strong>hiệp hội đo thị lực Hoa Kỳ</strong>&nbsp;khuyến nghị sử dụng cho trẻ em. Ngoài ra,<strong>tròng kính Hoya Phoenix</strong>&nbsp;cung cấp bảo vệ 100% UVA và UVB.</p>' , 3, 5);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (9, 'Blue Uv Elements 1.56', 'Blue-Uv-Elements-1.56.webp', 19, 188000, '<p><strong>ELEMENTS BLUE UV – NGĂN ÁNH SÁNG XANH</strong><br>
    CHIẾT SUẤT:&nbsp;<strong>1.56</strong></p>' , 3, 6);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (10, 'OAKLEY-0OO9208-9208-69(38US)', 'OAKLEY-0OO9208-9208-6938US2-scaled.webp', 5, 5450000, '<p>Mã sản phẩm: OA-0OO9208</p>
<p>Xuất xứ sản phẩm: Italy</p>
<p>Nơi sản xuất: USA</p>
<p>Chất liệu gọng: Nhựa</p>
<p>Giới tính: Nam</p>
<p>Màu sắc (như hình, có thể thay đổi phụ thuộc vào ánh sáng)</p>
<p>Thông số kỹ thuật: 38</p>
<p>Tính năng Polarized: Có</p>
<p>Tính năng Lọc UV: Có</p>' , 1, 7);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (11, 'COACH-8116F-5001-1356CN', 'COACH-8116F-5001-1356CN-scaled.webp', 5, 3000000, '<p>Mã sản phẩm:&nbsp;COACH-8116F</p>
<p>Xuất xứ sản phẩm: Italy</p>
<p>Nơi sản xuất: China</p>
<p>Chất liệu gọng: Nhựa</p>
<p>Giới tính: Nữ</p>
<p>Màu sắc (như hình, có thể thay đổi phụ thuộc vào ánh sáng)</p>
<p>Thông số kỹ thuật: 56</p>
<p>Tính năng Polarized : Không</p>
<p>Tính năng Lọc UV: Có</p>' , 1, 8);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (12, 'COACH-5047-9005(52CN)', 'COACH-5047-900552CN2-scaled.webp', 0, 3000000, '<p>Mã sản phẩm:&nbsp;COACH-5047</p>
<p>Xuất xứ sản phẩm: Italy</p>
<p>Nơi sản xuất: China</p>
<p>Chất liệu gọng: Nhựa</p>
<p>Giới tính: Nữ</p>
<p>Màu sắc (như hình, có thể thay đổi phụ thuộc vào ánh sáng)</p>
<p>Thông số kỹ thuật: 52</p>' , 2, 8);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (13, 'MICHAEL KORS-1003-1001-6G(58CN)', 'MICHAEL-KORS-1003-1001-6G58CN2-scaled.webp', 10, 10000000, '<p>Mã sản phẩm:&nbsp;MICHAEL-KORS-1003</p>
<p>Xuất xứ sản phẩm: Italy</p>
<p>Nơi sản xuất: China</p>
<p>Chất liệu gọng: Kim loại</p>
<p>Giới tính: Nữ</p>
<p>Màu sắc( như hình, có thể thay đổi phụ thuộc vào ánh sáng)</p>
<p>Thông số kỹ thuật: 58</p>
<p>Tính năng Lọc UV: Có</p>' , 1, 9);
INSERT INTO `product` (`id`, `name`, `main_image`, `amount_of_sold`, `price`, detail , `category_id`, `brand_id`) VALUES (14, 'MICHAEL-KORS-3005DT', 'michael-kors-3005dt-102554cn-2.webp', 3, 3640000, '<p>Mã sản phẩm:&nbsp;MICHAEL-KORS-3005DT</p>
<p>Xuất xứ sản phẩm: Italy</p>
<p>Nơi sản xuất: China</p>
<p>Chất liệu gọng: Kim loại</p>
<p>Giới tính: Nữ</p>
<p>Màu sắc (như hình, có thể thay đổi phụ thuộc vào ánh sáng):</p>
<p>Thông số kỹ thuật: 54</p>' , 2, 9);

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

INSERT INTO `persol`.`mail` (`fullname`, `email`, `phone`, `message`) VALUES ('daidung', 'daianhdung99@gmail.com', '09120930213', 'Tôi muốn được hỗ trợ');