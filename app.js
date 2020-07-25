const mysql = require("mysql")
const inquirer =  require("inquirer")
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Code1289!",
    database: "top_songsDB",
})

connection.connect(err =>{
    if(err) throw err
    console.log(`connect on thread ${connection.threadId}`)
    initialPrompts()
})


function initialPrompts(){
    inquirer.prompt([
       {
           name: "action",
           message: "what do you want to do?",
           type: "list",
           choices: ["ARTIST SEARCH", "MULTI SEARCH", "RANGE SEARCH", "SONG SEARCH", "EXIT"]
       } 
    ]).then(answer =>{
        switch(answer.action){
            case "ARTIST SEARCH":
             artistsearch()
            break
            case "MULTI SEARCH":
                multisearch()
                 break
                case "RANGE SEARCH":
                  rangeSearch()
                  break
                    case "SONG SEARCH":
                    songSearch()
                    case "Exit":
                    exit()

            default:
            connection.end()
            process.exit()






        }
    })
}
    function artistsearch(){
        console.log("searching artist ...")
        initialPrompts()
       
    }

function multisearch(){
console.log("multiSearch")
initialPrompts()
}

function rangeSearch(){
console.log("range search..")
initialPrompts()
}

function songSearch(){
    console.log("searchingSong")
    initialPrompts()
}