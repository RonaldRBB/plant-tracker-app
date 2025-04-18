module.exports = {
  apps: [
    {
      name: 'plant-tracker-app',
      script: 'npm',
      args: 'run dev -- -p 80',
      cwd: '/media/r/data/prog/personal/plant-tracker-app/',
      env: {
        PATH: process.env.PATH
      }
    }
  ]
};
