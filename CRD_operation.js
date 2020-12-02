var { create,read,deleteRecord} = require('./index');
var creating_Record_1 = create("MathiazhaganS",10,2000000);
var creating_Record_2=create("NivethithaAR",20,30000);
var reading_Record_Present_In_File=read("MathiazhaganS")
var deleting_Record_1=deleteRecord("MathiazhaganS")
var reading_Record_Not_Present_In_File=read("Magesh");


const { Worker } = require('worker_threads') 
  
function runService(workerData) { 
    return new Promise((resolve, reject) => { 
        const worker = new Worker( 
                './index.js', { workerData }); 
        worker.on('message', resolve); 
        worker.on('error', reject); 
        worker.on('exit', (code) => { 
            if (code !== 0) 
                reject(new Error( 
`Stopped the Worker Thread with the exit code: ${code}`)); 
        }) 
    }) 
} 
  
async function run() { 
    const result = await runService(create("MageshwaranR",10,20000)) 
    console.log(result); 
} 
  
run().catch(err => console.error(err))