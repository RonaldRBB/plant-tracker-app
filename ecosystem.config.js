require('dotenv').config({ path: '.env' });

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: 'npm',
      args: 'run start',
      cwd: process.env.APP_PATH,
      env: {
        PATH: process.env.PATH,
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.APP_PORT,
        HOST: process.env.APP_HOST
      },
      env_production: {
        PATH: process.env.PATH,
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.APP_PORT,
        HOST: process.env.APP_HOST
      }
    }
  ]
}; 