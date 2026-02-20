let fs= require("fs");
let http=require("http")
let path=require("path")
let {URL}=require("url")

//-- data folder for storing different data inside this folder--//
let loginFile
if(!fs.existsSync("loginFolder")){
loginFile=path.join("dataFolder", "loginFolder.txt")
}

//---- creating server--//
const server=http.createServer((req, res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");


  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

    let parseUrl= new URL(req.url, `http://${req.headers.host}`)
    let pathname=parseUrl.pathname

    if(req.method==="POST"&& pathname==="/api"){
        let body=[]
        req.on("data", chunk=>body.push(chunk));
        req.on("end",()=>{
            const parsed=Buffer.concat(body).toString()
            let data=JSON.parse(parsed)
        fs.readFile(loginFile, "utf-8", (err, loginData)=>{
            let storedData

            if(!err && loginData){
                storedData=JSON.parse(loginData)
            }
            storedData=data

            //--------- store user login data----//
                
         fs.writeFile(loginFile, JSON.stringify(storedData), (err)=>{
            if(err){
                res.writeHead(404,{"Content-Type": "application/json"})
                res.end(JSON.stringify({status:"Something is went wrong!"}))
            }else{
                 res.writeHead(200,{"Content-Type": "application/json"})
                res.end(JSON.stringify({status:"Your account is successfully created!"}))
            }
          })
        })
        })
        return
    }
})
server.listen(3001,()=>{
    console.log("server live at http://localhost:3001")
})
 