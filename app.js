'use strict'
const test      = require('tape');
const xml2js    = require('xml2js').parseString;
const fs        = require('fs');
const jsonfile  = require('jsonfile');

let prom_loadFile = new Promise((resovle, reject) => {
    fs.readFile('./customDTD.xml', 'utf8', (error, data) => {
        if(error){
            reject(error);
        }else{
            resovle(data);
        }
    });
});
function getParseXMLPromise(data) {
    return new Promise((resolve, reject) => {
        xml2js(data, (error, result) => {
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        });
    });
}


prom_loadFile.then(
    data => {

        let prom_parseXML = getParseXMLPromise(data);

        prom_parseXML.then(result => {
            let works = result['WORKS']['WORK'];

                test('Count elements', assert => {

                    const actual    = works.length;
                    const expected  = 3;

                    assert.equal(actual, expected, `| Expected: ${expected}, actual: ${actual}`);
                    assert.end();
                });

                test('Check element 1', assert => {

                    const actual    = works[1].NAME[0];
                    const expected  = 'Validate Brackets';

                    assert.equal(actual, expected, `| Expected: ${expected}, actual: ${actual}`);
                    assert.end();
                });

                test('Check element 2', assert => {

                    const actual    = works[0].DIST[0];
                    const expected  = 'https://sergeypavlikhin.github.io/mathJax';

                    assert.equal(actual, expected, `| Expected: ${expected}, actual: ${actual}`);
                    assert.end();
                });
        },
        error => {
            console.err(error);
        });
    },
    error =>{
        console.err(error);
    }
);
