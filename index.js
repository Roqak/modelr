commander = require('commander')
const files = require('./lib/files');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer2  = require('./lib/inquierer');
const inquirer  = require('inquirer');
const fs = require('fs')

// clear();
console.log(
  chalk.yellow(
    figlet.textSync('Modelr', { horizontalLayout: 'full' })
  )
);
if (!files.directoryExists('model')) {
    console.log(chalk.red('Model File does not Exist'));
    console.log(chalk.yellow('Creating the model file for you'));
    fs.mkdirSync('./model');
    console.log(chalk.green('Model File Created'));
    process.exit();
  }
commander.
version('0.0.1')
.command('model:create')
.action(options=>{
  const que = [
    {
      name: 'models',
      type: 'input',
      message: 'Enter your model name',
      // choices: ["Folu","Toba"],
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username or e-mail address.';
        }
      }
    }
  ]
  const que2 = [
    {
      name: 'fields',
      type: 'input',
      message: 'Enter your fields SEPARATED BY COMMA in the format name:Type:required:default',
      // choices: ["Folu","Toba"],
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your fields.';
        }
      }
    }
  ]
  inquirer
  .prompt(que)
  .then(models=>{
    // console.log(`OHH!!! ${answers.username} is more stupid`)
    inquirer
  .prompt(que2)
  .then(fields=>{
    // console.log(`OHH!!! ${fields.fields} is more stupid`)
    let arr = fields.fields.split(',');
    // console.log(chalk.yellow(arr))
    files.createFile(models.models,arr)
    // files.sample()
        
    // files.createFile(arr);
    // let content = "kdjdjdjdk"
    // fs.writeFile(`${arr}.js`,content,(err)=>{
    //   if (err){
    //     console.log("error")
    //   }
    //   console.log(`Model,created`);
    // })
  })
  })
})
  // const run = async () => {
  //   const credentials = await inquirer.askGithubCredentials();
  //   console.log(credentials);
  // }
  
  // run();
  commander.parse(process.argv);