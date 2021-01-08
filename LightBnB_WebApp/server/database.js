const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});
/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  let query = `
  SELECT *
  FROM users
  WHERE email = $1
  `;
  return pool.query(query, [email]).then((res) => {
    return res.rows[0];
  });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  let query = `SELECT * FROM users WHERE id = $1`;
  return pool.query(query, [id]).then((res) => res.rows[0]);
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  let query = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  return pool.query(query, [user.name, user.email, user.password]).then((res) => res.rows);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  let query = `
  SELECT * FROM reservations
  WHERE guest_id = $1
  LIMIT $2
  `;
  return pool.query(query, [guest_id, limit])
  .then(res => res.rows);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  let param = [];
  let query = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;
  
  if (options.city){
    param.push(`%${options.city}%`);
    query += `
    WHERE city LIKE $${param.length}
    `;
  }
  if (options.owner_id) {
    param.lenth === 0 ? query += `WHERE` : query += `AND`
    param.push(`${options.owner_id}`);
    query += `
     properties.owner_id = $${param.length}
    `;
  }
  if (options.minimum_price_per_night)  {
    param.length === 0 ? query += `WHERE` : query += `AND`;
    param.push(options.minimum_price_per_night * 100);
    query += ` cost_per_night > $${param.length} 
    `;
  }
  if(options.maximum_price_per_night) {
    param.length === 0 ? query += `WHERE` : query += `AND`;
    param.push(options.maximum_price_per_night * 100);
    query += ` cost_per_night < $${param.length} 
    `;
  }
  
  query += `GROUP BY properties.id`;
  
  if (options.minimum_rating) {
    param.push(options.minimum_rating);
    query += `
    HAVING AVG(property_reviews.rating) >= $${param.length}`
  }

  param.push(limit);
  query += `
  ORDER BY cost_per_night
  LIMIT $${param.length}`;
  return pool.query(query,param)
    .then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  let param = [property.owner_id, property.title, property.discription, property.thumbnail_photo_url, property.cover_photo_url,
    property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms,
    property.number_of_bedrooms];
  let query = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url,
    cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms,
    number_of_bedrooms)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;
  
  return pool.query(query,param)
  .then(res => {
    console.log (res.rows)
    return res.rows})
};
exports.addProperty = addProperty;
