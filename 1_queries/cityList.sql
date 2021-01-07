SELECT properties.* , AVG(rating) as average_rating
FROM properties
JOIN property_reviews on properties.id = property_id
WHERE city LIKE '%ancouve%'
GROUP BY properties.id
HAVING AVG(RATING) >= 4
ORDER BY cost_per_night
LIMIT 10;