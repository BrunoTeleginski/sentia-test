const Express = require("express");
var cors = require('cors');

const app = Express();
app.use(cors());
const port = 3001;

//DATABASE
var mongoose = require('mongoose');  

async function mongoConnectionTest() {
    // Use connect method to connect to the server
    try{
        
        await mongoose.connect('mongodb://mongo-db');

        return 'done.';
    }catch(e){
        return 'Error '+e
    }
}

app.get('/mongo-test', async function(req, res){
    
    res.json({
        status:"success",
        data: await mongoConnectionTest(),
    });

});

app.get('/test', async function(req, res){
    
    res.json({
        status:"success",
        data:"Working well",
    });

});

app.get('/', async function(req, res){
    
    res.json({
        status:"success",
        data:"MAIN PAGE"
    });

});

app.listen(port, async () => {
    console.log('Running on '+port+' port');
});