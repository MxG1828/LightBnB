SELECT reservations.*, properties.*, AVG(rating) as average_rating
FROM property_reviews
JOIN properties ON property_reviews.property_id = properties.id
JOIN reservations ON property_reviews.reservation_id = reservations.id
WHERE reservations.guest_id = 1
GROUP BY reservations.id,properties.id
HAVING now()::date > end_date
ORDER BY start_date
LIMIT 10;