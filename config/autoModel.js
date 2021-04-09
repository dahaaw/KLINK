require('dotenv').config()

const child_process = require('child_process');
const { exec } = child_process;
const modelName = process.argv[2];
const database = {
  host      : process.env.DB_HOST,
  database  : process.env.DB_NAME, 
  user      : process.env.DB_USERNAME,
  pass      : process.env.DB_PASSWORD,
  port      : 3306,
  output    : './models',
  dialect   : 'mysql',
  tables    : modelName || '',
  camel     : true,
  'no-write': false,
  schema    : false,
  typescript: false,
};
 
let connectShell = 'sequelize-auto';
for (const i in database) {
  const value = database[i];
  if (value) {
    if (value === true) {
      connectShell += ` --${i}`;
    } else {
      connectShell += ` --${i} ${value}`;
    }
  }
}
exec(connectShell, (err, stdout, stderr) => {
  console.log(`stderr: ${stderr}`);
  console.log(`stdout: ${stdout}`);
  if (err) {
    console.log(`exec error: ${err}`);
  }
});