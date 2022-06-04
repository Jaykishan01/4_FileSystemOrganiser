const fs =require('fs')
const path =require('path')




function treeFn(dirpath) {
    if (dirpath == undefined) {
      console.log("Please Enter a Valid Command ");
    } else {
      let doesExist = fs.existsSync(dirpath);
      if (doesExist == true) {
        treeHelper(dirpath, " ");
      }
    }
  }
  
  function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile();
    // here we have checked wheter the targetPath is a file or a folder
  
    if (isFile == true) {
      let fileName = path.basename(targetPath);
      console.log(indent + "├──" + fileName)
    } else {
      let dirName = path.basename(targetPath);
      console.log(indent + "└──" + dirName); 
  
      let children = fs.readdirSync(targetPath)
      // console.log(children)
  
      for (let i = 0; i < children.length; i++) {
  
        let childPath = path.join(targetPath, children[i])
        treeHelper(childPath, indent + '\t')
        //using recursion to repat the process for all files and folders 
        // console.log(childPath)
      }
  
  
    }
  }
  

  module.exports={
      treekey :treeFn
  }