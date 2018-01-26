const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'criticodev.ce8wv7rrgmue.us-west-2.rds.amazonaws.com',
    user : 'criticoAdmin',
    password : 'YzEIvkrVKz6m22DoUUmEbT4QwHtH3wm7RvWEc3hQ',
    database : 'Dev_Playground'
  },
  pool: { min: 1, max: 10 }
});
