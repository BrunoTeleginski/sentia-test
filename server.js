const Express = require("express");
var cors = require('cors');

const app = Express();
app.use(cors());
const port = 3001;

//DATABASE
var mongoose = require('mongoose');  

async function mongoConnectionTest(env = null) {
    // Use connect method to connect to the server
    try{
        
        if(env == 'dev'){
            await mongoose.connect('mongodb://dev-mongo-db');
        }else if(env == 'staging'){
            await mongoose.connect('mongodb://staging-mongo-db');
        }else{
            await mongoose.connect('mongodb://mongo-db');
        }

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

app.get('/mongo-test-dev', async function(req, res){
    res.json({
        status:"success",
        data: await mongoConnectionTest('dev'),
    });
});

app.get('/mongo-test-staging', async function(req, res){
    res.json({
        status:"success",
        data: await mongoConnectionTest('staging'),
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