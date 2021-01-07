INSERT INTO users (name, email, password)
VALUES ('user1','email1','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('user2','email2','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('user3','email3','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code)
VALUES (1, 'title', 'description', 'url', 'url', 'country', 'street', 'city','province', 'post_code'),
(2, 'title', 'description', 'url', 'url', 'country', 'street', 'city','province', 'post_code'),
(3, 'title', 'description', 'url', 'url', 'country', 'street', 'city','province', 'post_code');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('1111-11-11','2222-12-12', 1, 2),
('1111-11-11','2222-12-12', 2, 3),
('1111-11-11','2222-12-12', 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2,1,1,5,'msg'),
(3,2,2,5,'msg'),
(1,3,3,5,'msg');