let fs= require("fs");
let http=require("http")
let path=require("path");
let {URL}=require("url")

//-- data folder for storing different data inside this folder--//
let loginFile
let billFile
if(!fs.existsSync("loginFolder")){
loginFile=path.join("dataFolder", "loginFolder.txt")
}

if(!fs.existsSync("billFolder")){
    billFile=path.join("dataFolder", "billFolder.txt")
}
//---- creating server--//
const server=http.createServer((req, res)=>{

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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
                res.end(JSON.stringify({message:"Something is went wrong!"}))
            }else{
                 res.writeHead(200,{"Content-Type": "application/json"})
                res.end(JSON.stringify({message:"Your account is created successfull!"}))
            }
          })
        })
        })
        return
    }
    //----- sending login data to frontend---//
    else if(req.method==="GET" && pathname==="/logindata"){
        fs.readFile(loginFile, "utf-8",(err, sendData)=>{
            if(err){
                 res.writeHead(404,{"Content-Type": "application/json"})
                res.end()
            }else if(!err && sendData){
                 res.writeHead(200,{"Content-Type": "application/json"})
                res.end(sendData)
            }
        })
        return;
    }
    ///-------------- parsing bill data from frontend--------///
    else if(req.method==="POST" && pathname==="/userbill"){
        let body=[]
        req.on("data", chunk=>body.push(chunk));
        req.on("end", ()=>{
            let parse=Buffer.concat(body).toString()
            let parseData=JSON.parse(parse)

            fs.readFile(billFile, "utf-8", (err, data)=>{
                let storedData=[]

                if(!err && data){
                    storedData=JSON.parse(data)
                }
                storedData.push(parseData)

                fs.writeFile(billFile, JSON.stringify(storedData, 2, null), (err)=>{
                      if(err){
                res.writeHead(404,{"Content-Type": "application/json"})
                res.end(JSON.stringify({message:"Bill is not added"}))
            }else{
                 res.writeHead(200,{"Content-Type": "application/json"})
                res.end(JSON.stringify({message:" Bill Added!"}))
            }
                })
            })
        })
        return ;    
    }
    //------ sending /userbill to frontend-----//
    else if(req.method==="GET" && pathname==="/userbill"){
        fs.readFile(billFile, "utf-8",(err,data)=>{
            if(!err && data){
                 res.writeHead(200,{"Content-Type": "application/json"})
                res.end(data)
            }else{
                  res.writeHead(404,{"Content-Type": "application/json"})
                res.end(JSON.stringify({message:"Something went wrong!"}))
            }
        })
        return;
    }
})
server.listen(3001,()=>{
    console.log("server live at http://localhost:3001")
})
 

