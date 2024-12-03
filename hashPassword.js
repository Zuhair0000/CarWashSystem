const bcrypt = require("bcrypt");

async function hashPasswords() {
  const saltRounds = 10; // Number of salt rounds for hashing

  // Define the users and their passwords
  const users = [
    { username: "Ahmed", password: "Ahmed123@", role: "Owner" },
    { username: "Alice", password: "Alice1122", role: "Staff" },
    { username: "Bob", password: "Bob212", role: "Staff" },
    { username: "Charlie", password: "Charlie1232", role: "Staff" },
  ];

  for (let user of users) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    console.log(
      `Username: ${user.username}, Hashed Password: ${hashedPassword}`
    );
  }
}

hashPasswords();
