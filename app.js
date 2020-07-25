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
      inquirer.prompt([{
          message: "which artist are you looking for?",
          name: "artist",
      }]).then(answer =>{
          connection.query(
              "SELECT position, artist, song, year FROM top5000 WHERE ?",{artist: answer.artist},
          (err,results) =>{
              if (err) throw err
              console.table(results)
              initialPrompts()
            }
          )  
    })
}

function multisearch(){
console.log("multiSearch")
initialPrompts()
}

function rangeSearch(){
inquirer.prompt([
{
    name: "beginning",
    type: "number",
    message: "beginning position",

},{
    name: "end",
    type: "number",
    message:"end position",
}
]).then(answers => {
    connection.query("SELECT position, artist, song, year FROM top5000 WHERE position BETWEEN ? AND ?",[answers.beginning, answers.end], (err, results) => {
        if (err) throw err
        console.table (results)
    }
    )
    initialPrompts()
})

}

function songSearch(){
    console.log("searchingSong")
    initialPrompts()
}