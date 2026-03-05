let fs= require("fs");
let http=require("http")
let path=require("path")
let {URL}=require("url")

//-- data folder for storing different data inside this folder--//
const dataFolder = path.join(__dirname, "dataFolder")

if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder)
}

if(!fs.existsSync("login.txt")){
   loginFile = path.join(dataFolder, "login.txt")
}

if(!fs.existsSync("bill.txt")){
    billFile = path.join(dataFolder, "bill.txt")
}

//---- creating server--//
const server=http.createServer((req, res)=>{

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT,PATCH, DELETE");
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
                // ------- DISPLAY STATUS ACCORDING TO DUE DATE-------//
                let currentDate= new Date().setHours("00","00","00")
               let statusData= storedData.map((s)=>{
                    let dueDate= new Date(s.userDate).setHours("00","00","00")
                    let differ=dueDate-currentDate
                    let days= Math.ceil(differ/(1000*60*60*24))

                 if(s.status==="PAID"){
                    return s
                 }

                  if(days>0){
                    return {...s, status:`${days} days left`}
                  }else if(days<=0){
                    return {...s, status:`Over Due`}
                  }
                })


                fs.writeFile(billFile, JSON.stringify(statusData,null,2), (err)=>{
                      if(err){
                res.writeHead(404,{"Content-Type": "application/json"})
                res.end(JSON.stringify([]))
            }else{
                 res.writeHead(200,{"Content-Type": "application/json"})
                res.end(JSON.stringify([]))
            }
                })
            })
        })
        return ;    
    }
    //------- UPDATING DATA-------------------//
    else if(req.method==="PUT"&& pathname==="/updatebill"){
        updateBody=[]
        req.on("data", chunk=> updateBody.push(chunk));
        req.on("end", ()=>{
            const updatedData= JSON.parse(Buffer.concat(updateBody).toString())
          

            fs.readFile(billFile, "utf-8", (err, bills)=>{
               let findIndex
               let parseBill
                if(err || !bills){
                      res.writeHead(404,{"Content-type": "application/json"})

                      res.end(JSON.stringify({message:"Bill not Found!"}))
                }

                    if(!bills || bills.trim===""){
                        parseBill=[]
                    }else{
                         parseBill=JSON.parse(bills)
                     findIndex=parseBill.findIndex((i)=>{
                        return i.id===updatedData.id
                    })
                    }
                      if(findIndex === -1){
                res.writeHead(404, {"Content-Type":"application/json"})
                return res.end(JSON.stringify({message:"Bill not found"}))
            }

                     parseBill[findIndex]=updatedData

                fs.writeFile(billFile, JSON.stringify(parseBill,null, 2) , (err)=>{
                    if(!err){
                         res.writeHead(200,{"Content-type": "application/json"})

                      res.end(JSON.stringify({message:"Data saved!"}))
                    }else{
                           res.writeHead(500,{"Content-type": "application/json"})

                      res.end(JSON.stringify({message:"something forgotten!"}))
                    }
                })
            })
        })
        return;
    }
    //------ sending /userbill to frontend-----//
    else if(req.method==="GET" && pathname==="/userbill"){
        fs.readFile(billFile, "utf-8",(err,data)=>{
            if(!err && data){
                 res.writeHead(200,{"Content-Type": "application/json"})
                res.end(data)
            }else if(!data || err){
                  res.writeHead(404,{"Content-Type": "application/json"})
                res.end(JSON.stringify([]))
            }
        })
        return;
    }
    //--------------DELETE DATA-------//
    else if(req.method==="DELETE" && pathname==="/deleteapi"){
        const id=Number(parseUrl.searchParams.get("id"))

        fs.readFile(billFile, "utf-8",(err, val)=>{
            let delet
            if(err || !val){
                res.writeHead(404,{"Content-Type": "application/json"})
                res.end(JSON.stringify({dltmsg:" sorry, we dont delete your data!"}))
            }
           if(!val || val.trim===""){
            return 
           }else{
           let deletVal=JSON.parse(val)
           delet= deletVal.filter((d)=>{
                return d.id!==id
            })
            }
            fs.writeFile(billFile, JSON.stringify( delet, null, 2), (err)=>{
                if(err){
                      res.writeHead(404,{"Content-Type": "application/json"})
                res.end(JSON.stringify({dltmsg:" sorry, we dont delete your data!"}))
                }else{
                       res.writeHead(200,{"Content-Type": "application/json"})
                res.end(JSON.stringify({dltmsg:"your data is deleted!"}))
                }
            })
        })
        return;
    }
    //-------ADD PAID FEATURE------//
    if( req.method==="PUT" && pathname==="/paidapi"){
        let paidIds=Number(parseUrl.searchParams.get("id"))

        fs.readFile(billFile, "utf-8", (err, paidOne)=>{
            
            let  getPaid=[]
           
            if(err || !paidOne){

                 res.writeHead(404,{"Content-Type": "application/json"})
                res.end(JSON.stringify({dltmsg:" sorry, we dont delete your data!"}))
          }
        if(!paidOne || paidOne===""){
            getPaid=[]
        }else{
             getPaid=JSON.parse(paidOne)
        }

    let findIndx=getPaid.findIndex((i)=>{
        return i.id===paidIds
    })

    let findObj=getPaid.find((o)=>{
        return o.id===paidIds
    })

   
        getPaid[findIndx]={...findObj, status:"PAID"}
    
          fs.writeFile(billFile, JSON.stringify(getPaid, null, 2), (err)=>{
            if(err){
                    res.writeHead(404,{"Content-Type": "application/json"})
                res.end(JSON.stringify({paidStatus:"kuchu bhail ba bhai!"}))
            }else{
                res.writeHead(200,{"Content-Type": "application/json"})
                res.end(JSON.stringify({paidStatus:"Congratulation your one headache is gone!"}))
            }
          })
        })
        return
    }
})
server.listen(3001,()=>{
    console.log("server live at http://localhost:3001")
})
 
