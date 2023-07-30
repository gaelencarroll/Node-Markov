/** Command-line tool to generate Markov text. */

const markov = require('./markov')
const fs = require('fs')
const process = require('process')
const axios = require('axios')

function generateText(text){
    let mark = new markov.MarkovMachine(text)
    console.log(mark.makeText())
}

function makeText(path){
    fs.readFile(path, 'utf8', function callback(error, data){
        if (error){
            console.log(`Cannot read file: ${path}, ${error}`)
            process.exit(1)
        }
        else{
            generateText(data)
        }
    })
}

async function makeURL(url){
    let res;
    try{
        res = await axios.get(url)
    }
    catch(error){
        console.log(`Cannot read url: ${url}, ${error}`)
        process.exit(1)
    }
    generateText(res.data)
}

let [method, path] = process.argv.slice(2)

if(method === 'url'){
    makeURL(path)
}
else if(method === 'file'){
    makeText(path)
}
else{
    console.log(`Unknown method: ${method}. Please try again.`)
    process.exit(1)
}

