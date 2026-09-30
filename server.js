const { rejects } = require('assert');
const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 3000;

const pathToFile = path.join(__dirname, "db.json");

async function readFile() {
    let data = await fs.readFile(pathToFile, 'utf8');
    return JSON.parse(data);
}

app.get('/products', async (req, res) => {
    try{
        let products = await readFileWithDelay();
        let {id} = req.params;
        id = Number(id);
        let product = products.find((item)=>{return item.id === id});
        res.json(products);
    }
    catch(err){
        console.log(err)
    }
});
async function readFileWithDelay(){
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,1500)
    })

    let products = await readFile();
    return products
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});