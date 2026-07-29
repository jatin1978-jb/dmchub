const bcrypt = require('bcrypt');
async function check() {
  const match = await bcrypt.compare('password123', '$2b$10$EPXG64tYtJp3/OQ2yZ/qZ.V4FvQ9jU/M/E7v8kR/1v8U1x4cZ/1mO');
  console.log(match);
}
check();
