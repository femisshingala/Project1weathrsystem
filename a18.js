const http=require('http');
const fs=require('fs');
const requests = require("requests");
const { request } = require('express');

const homefile=fs.readFileSync("a18.html","utf-8");

const replaceVal=(tempval,orgval)=>{
    let temprature = tempval.replace("{%tempval%}",orgval.main.temp);
    temprature = temprature.replace("{%tempmin%}",orgval.main.temp_min);
    temprature = temprature.replace("{%tempmax%}",orgval.main.temp_max);
    temprature = temprature.replace("{%country%}",orgval.name);
    temprature = temprature.replace("{%location%}",orgval.sys.country);
    temprature = temprature.replace("{%tempSts%}",orgval.weather[0].main);
    return temprature;
    

}

const server=http.createServer((req,res)=>{

    if(req.url=="/")
    {
        requests("https://api.openweathermap.org/data/2.5/weather?q=surat&appid=7aa92ab2f18d7d322a89421aa84adaa9")

        .on("data",(chunk)=>
        {
            const obj=JSON.parse(chunk); //json connevrt into object
            const arrdata=[obj]; //object connvert into array

            // const realtime= arrdata.map((val)=>{ // data into home page
            //     replaceVal(homefile,val);
            // });
            //second way
           const realtime=arrdata.map((val)=>replaceVal(homefile,val)).join("");
        res.write(realtime);
           // console.log(realtime);


            






           // console.log(arrdata[0].main.temp);
           // console.log(chunk +"data");
          // console.log(obj.name);
        })

        .on("end", (errr)=> {
         res.end();
         });
       
    }
});

server.listen(2020);