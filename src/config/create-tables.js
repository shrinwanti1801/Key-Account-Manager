const {db}=require('./server-config');

const tables = [
    `
      CREATE TABLE IF NOT EXISTS accounts_performance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        total_orders INT DEFAULT 0,
        average_order_value DECIMAL(10, 2) DEFAULT 0.00,
        order_frequency VARCHAR(50),
        status ENUM('High', 'Medium', 'Low') DEFAULT 'Medium',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS follow_up_calls (
        id INT AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        poc_id INT NOT NULL,
        scheduled_date DATE NOT NULL,
        last_call_date DATE,
        call_frequency VARCHAR(50) NOT NULL,
        status ENUM('Pending', 'Completed', 'Missed') DEFAULT 'Pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
        FOREIGN KEY (poc_id) REFERENCES pocs(id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS interactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        interaction_date DATE NOT NULL,
        details TEXT,
        order_placed TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        order_date DATE NOT NULL,
        order_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('Completed', 'Pending', 'Cancelled') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS pocs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(100),
        phone VARCHAR(15),
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS restaurants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        status ENUM('New', 'Active', 'Inactive') DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `,
    `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('Admin', 'Manager', 'KAM') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `
  ];


async function createTables() {
    try {
        // Use for...of loop to wait for each query to complete
        for (const query of tables) {
            await db.query(query);
            console.log("successFull created");
        }
        console.log('All tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error.message);
    }
}

// Call the function to create tables
module.exports = createTables;