// Importing packages
import http from "node:http";
import pkg from "pg";

//postgresql part comes here

const Client = pkg.Client;
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

// Remove the following block
/*
client.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});
*/
async function insertData() {
  try {
    // Connect to the PostgreSQL server
    await client.connect();

    // Example data to insert
    const dataToInsert = {
      name: "Hari",
      age: 2,
      email: "harishportfolio.com",
    };

    // SQL query to insert data into the 'user' table
    const query = `
  INSERT INTO "userdb" ("name", "age", "email")
  VALUES ($1, $2, $3)
  RETURNING *;
`;

    // Execute the query with parameters
    const result = await client.query(query, [
      dataToInsert.name,
      dataToInsert.age,
      dataToInsert.email,
    ]);

    // Print the inserted data
    console.log("Inserted data:", result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Close the PostgreSQL client
    await client.end();
  }
}

// Call the function to insert data
insertData();
const server = http.createServer(function (req, res) {});

server.listen(process.env.PORT || 8080);
console.log("Server is running");
