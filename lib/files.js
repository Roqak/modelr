const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
const figlet = require('figlet')
const validator = require('validator');
function splitOptions(val){
  return val.split(':')
}
let attributes = ['type','required','default']
module.exports = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },

  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
  createFile : (modelName,array) => {
    if(!validator.isAlpha(modelName)){
      console.log(chalk.red('Model Name Must be an Alphabet'))
      process.exit();
    }
    // console.log(validator.isAlpha(modelName))
    let arrContent = ''
    for(arr in array){
      arrContent+= splitOptions(array[arr])[0]+`:{\n`
      // for(options in splitOptions(arr)){
        let counter = 1;
      for(options in attributes){
      // arrContent+= splitOptions(array[arr])[options]+`:{\n`
        arrContent += `${attributes[options]}:${splitOptions(array[arr])[counter]},\n`
        counter++
      }
      arrContent+= `},\n`
    }
    let content = `var mongoose = require('mongoose');\n
var Schema = mongoose.Schema;\n
  
var ${modelName}Schema = new Schema({\n
${arrContent}
      
});\n

module.exports = ${modelName} = mongoose.model('${modelName.toLowerCase()}',${modelName}Schema);`
    // fs.writeFile(`${path.basename(process.cwd())}/${modelName}.js`,content,(err)=>{
    fs.writeFile(`model/${modelName}.js`,content,(err)=>{
      if (err){
        console.log(chalk.red(
          figlet.textSync('Error', { horizontalLayout: 'full' })
        ));
      }else{
        // message =`Model, ${modelName} created`;
        console.log(chalk.green(
          figlet.textSync(`created`, { horizontalLayout: 'full' })
        ));
      }
    })
    // return message;
  },

  sample: ()=>{
    return "hey"
  }
};