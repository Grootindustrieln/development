const bcrypt = require('bcryptjs');

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

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser (req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex(`public.users`)
  .insert({
    username: req.body.emailaddress,
    emailaddress: req.body.emailaddress,
    password_hash: hash
  })
  .returning('*');
}

function createCompany (req) {
  return knex(`public.companies`)
  .insert({
    companyname: req.body.company
  })
  .returning('*');
}

function updateUserCompany (req) {
  return knex(`public.companies`).where()
  .update({
    
  });
}

// // // // // // // // //
//request object updates//
// // // // // // // // //

function refreshCompanyObject (req) {
  
};

function refreshPlanObject (req) {
  
};

function refreshEmailTemplateObject (req) {
  
};


module.exports = {
  comparePass,
  createUser,
  createCompany,
  updateUserCompany,
  refreshCompanyObject,
  refreshPlanObject,
  refreshEmailTemplateObject
};