const bcrypt = require('bcryptjs');

(async () => {
  const hashedPassword = await bcrypt.hash("password123", 10);
  console.log("Hashed password:", hashedPassword);
})();