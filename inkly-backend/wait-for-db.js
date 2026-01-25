// Wait for PostgreSQL to be ready
const { exec } = require('child_process');

function waitForDB() {
  return new Promise((resolve, reject) => {
    const maxAttempts = 30;
    let attempts = 0;

    const checkDB = () => {
      attempts++;
      console.log(`Waiting for database... (attempt ${attempts}/${maxAttempts})`);
      
      // Try to connect using psql or just check if port is open
      exec('nc -z postgres 5432', (error) => {
        if (!error) {
          console.log('Database is ready!');
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error('Database not ready after 30 attempts'));
        } else {
          setTimeout(checkDB, 2000);
        }
      });
    };

    checkDB();
  });
}

waitForDB()
  .then(() => {
    console.log('Database connection ready');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });
