// importing fs module here 
const fs =require('fs')

// path module require kiya 

const path = require('path')


let inputArr =process.argv.slice(2);

// extension
let types = {media: ["mp4", "mkv", "mp3","jpg"],
archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
app: ["exe", "dmg", "pkg", "deb"],};
let command =inputArr[0]


switch(command){


    case 'tree':
        console.log('Tree Implemented')
        break;
    case 'organize':
        organizefn(inputArr[1])
        break;
    case "help":
        helpfn()
        break;
    default:
        console.log("Enter valid command mr jay ")
}


function helpfn(){
    console.log(`list of all commands
           1 )tree commans  node FO.js tree <dirname>
           2 )Organise commands -Node FO.js organise <dirname.
           3 )Help commans- node fo.js`)
}


// organise karrega
function organizefn(dirpath){
// input of directory path
    let destpath
if(dirpath==undefined){
    console.log("Please Enter a valid Directory Path")
    // check weather dirpath is passed or not 
    return;
}else{
    let doesExist= fs.existsSync(dirpath)
    // this tell weather the dir path exist or not 
    console.log(doesExist)


    if(doesExist==true){
        destpath= path.join(dirpath,'organized_files')
        //D:\Fjp3dev\3_FileSystemOrganiser\test\organized_files I want to create folder in this path 
      if(fs.existsSync(destpath)==false){
          // kya pehle se exixst karta hai  we only create  agr wo pehle se udahr naa ho 
          fs.mkdirSync(destpath)
      }else{
          console.log('this folder Alredy Exists')
      }

    }else{
        console.log('Please Enter a valid path ')
    }
}
organizeHelper(dirpath,destpath)

}
// we are writing this function to categorize our files
function organizeHelper(src,dest){

let childNames= fs.readdirSync(src)//get all the file and folder inside your source  count
// console.log(childNames)



for(let i=0;i<childNames.length;i++){
    let childAddress =path.join(src,childNames[i]) //path is identified for the file 
    // console.log(childAddress)
    let isFile= fs.lstatSync(childAddress).isFile() // we check here identity only the files 
     //ye statistics nikal deta hai kya hai file hia ya directory hai 
    // console.log(childAddress + " "+ isFile)


    if(isFile==true){
        let fileCateogry= getCategory(childNames[i])
        console.log(childNames[i]+"belongs to " +fileCateogry)

        sendFiles(childAddress,dest ,fileCateogry)
    }
}



}

function getCategory(name){
    let ext= path.extname(name)// we wii take out the extension names of the files 

    ext =ext.slice(1)
    // console.log(ext)
    for(let type in types){
        let cTypeArr = types[type]
        console.log(cTypeArr)

     for (let i=0;i<cTypeArr.length;i++){
         if(ext=cTypeArr[i])
// we matched the extenison with the values present in ctypeArr
         return type
     }




    }

return 'others'
}


function sendFiles(srcFilePath,dest,fileCateogry){
    let catPath =path.join(dest,fileCateogry)

    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath)
    }

    let fileName =path.basename(srcFilePath)
    let destFilepath =path.join(catPath,fileName)

    fs.copyFileSync(srcFilePath,destFilepath)
    fs.unlinkSync(srcFilePath)

    console.log(fileName + "is copied to " +fileCateogry )
}