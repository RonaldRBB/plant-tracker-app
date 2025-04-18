module.exports = {
  apps: [
    {
      name: 'plant-tracker-app',
      script: 'npm',
      args: 'run start',
      cwd: '/media/r/data/prog/personal/plant-tracker-app/',
      env: {
        PATH: process.env.PATH,
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0'
      }
    }
  ]
}; 