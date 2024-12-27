const CrudRepository = require('./crud_repo');

// creating resturant class extending all the properties of CrudRepository
class Restaurants extends CrudRepository {
    constructor() {
        // Call the parent class constructor with the table name
        super('restaurants');
    }
}

module.exports = Restaurants;