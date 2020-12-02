var date = new Date();
var time = date.getTime();
var fs = require('fs'); 
var validator =require("validator");
var jsonsize=require("json-size")
let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata);


//Create function is used to create student name as key and RollNO as value with following Constraints
// If Create is invoked for an existing key, an appropriate error must be returned.
const create = function(key,RollNO,timestamp=0) { 
    
    var check=false;
    if(data.hasOwnProperty(key)){
         check=true;
    }

   if(check==true)
   {
       console.log("Key already exist");
       return "Key already exist"
   }
   else{
       if(validator.isAlpha(key))
       {
            if (jsonsize(data) < (1024*1020*1024) && RollNO <= (16*1024*1024) ){
                if(timestamp==0)
                {
                    l={RollNO,timestamp};
                }
                else
                {
                    var timestamp=time+timestamp
                    l={RollNO,timestamp};
                }
            
            }
            else{
                     return "error: Memory limit exceeded";
            }
            if(key.length<=32){
                data[key]=l;
                let name = JSON.stringify(data);
                fs.writeFileSync('data.json', name);
                return data;

            }
       
        }
        else
        {
            console.log("error: Invalind key_name!! key_name must contain only alphabets and no special characters or numbers");
            return "error: Invalind key_name!! key_name must contain only alphabets and no special characters or numbers"
        }
    }
 }

//Read operation on a key can be performed by providing the key, and receiving the value in response, as a JSON object.
const read = function(key) { 
    var check=false;
    if(data.hasOwnProperty(key)){
         var check=true;
    }
    if(check==false)
    {
        console.log("key not found");
        return "key not found";
    }
    else{
        b=data[key];
        if(b.value!=0){
            if(time<b.timestamp){
                var stri=key.toString()+":"+b.timestamp.toString() 
                console.log(stri);
                return stri 
            }
            else{
                console.log("error: time-to-live of "+key+" has expired");
                return "error: time-to-live of "+key+" has expired";
            }
        }
        else{
            var stri=key.toString()+":"+b.timestamp.toString()
            console.log(stri);
             return stri
        }
    }
}
/* 5. A Delete operation can be performed by providing the key.
 6. Every key supports setting a Time-To-Live property when it is created. This property is
 optional. If provided, it will be evaluated as an integer defining the number of seconds
 the key must be retained in the data store. Once the Time-To-Live for a key has expired,
 the key will no longer be available for Read or Delete operations. */
 const deleteRecord = function(key) { 
    var check=false;

    if(data.hasOwnProperty(key)){
            check=true;
    }
    if(check==false)
    {
        return "key not found";
    }
    else{
        b=data[key];
        if(b.value!=0){
            if(time<b.timestamp)
            {
                delete data[key]
                let name = JSON.stringify(data);
                fs.writeFileSync('data.json', name);
                console.log("key is successfully deleted");
                return "key is successfully deleted"
            }
            else{
                console.log("error: time-to-live of "+key+" has expired");
                return "error: time-to-live of "+key+" has expired"
            }
        }
        else{
            delete data[key];
            let name = JSON.stringify(data);
            fs.writeFileSync('data.json', name);
            console.log("key is successfully deleted");
            return "key is successfully deleted";
        }
    }
} 
module.exports = {
    create,
    read,
    deleteRecord
}