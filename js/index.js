
//import Promise from 'bluebird';


//const p = require(@bluebird/Promise)
const marker = require('@ajar/marker');
const Promise = require('bluebird'); //that module here extende regular promise 

function getCountryPopulation(country){
    return new Promise((resolve,reject)=> {
        const url = `https://countriesnow.space/api/v0.1/countries/population`;
        const options = {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({country})
        };
        fetch(url,options) //returning a promise which is fulfilled once the response is available.
            .then(res => res.json()) //res is response obj
            .then(json => { //onse of them happens its like return on resolve or on rejcet
                if (json?.data?.populationCounts) resolve(json.data.populationCounts.at(-1).value);
                else reject(new Error(`My Error: no data for ${country}`)) //app logic error message
            })
            .catch(err => reject(err)) // network error - server is down for example...
            // .catch(reject)  // same same, only shorter... 
    })
}
getCountryPopulation('United States')
  .then(population => { //population is the resolved value 
    console.log("the population is = " +population);
  })
  .catch(error => { //error is the reject value
    console.error(error);
  });



//--------------------------------------------------------
//  Manual - call one by one...
//--------------------------------------------------------
function manual() {
    getCountryPopulation("France") //this should return first 
        .then( population => { //onse promise returned its inside population ,we get resolved obj here
            console.log(`population of France is ${population}`);
            return getCountryPopulation("Germany") //getting rpomise indside him
        })
        .then( population => console.log(`population of Germany is ${population}`)) //using the rpomise before
        .catch(err=> console.log('Error in manual: ',err.message)); //or using the rpomise before on err
}
//manual()


//------------------------------
//   Sequential processing 
//------------------------------
const countries = ["France","Russia","Germany","United Kingdom","Portugal","Spain","Netherlands","Sweden","Greece","Czechia","Romania","Israel","Picky"];

function sequence() { //promise.foreach

  Promise.each(countries, item => {
    marker.info('Start processing item:', item);
    const randomDelay = Math.random() * 500;
    return Promise.delay(randomDelay)
      .then(() => getCountryPopulation(item))
      .then(population => {
        //console.log(`The population of ${item} is = ${population}`);
        marker.magenta(`The population of ${item} : ` ,population);
      })
      .catch(err => {
        // console.error('Error:', err.message);
        marker.red('Error:', err.message);
      });
  })
    .then( originalArr => {
      marker.green('All tasks are done now...',originalArr);
    });

}
sequence();

//--------------------------------------------------------
//  Parallel processing 
//--------------------------------------------------------
function parallel() {
  Promise.map(countries, country => {
    marker.info('start processing item', country);

    return Promise.delay(Math.random() * 2000)
      .then(() => {
        return getCountryPopulation(country);
      },{concurrency:3})
      .then(population => {
        marker.blue(`the population of ${country} is :`, population);
      })
      .catch(err => {
        marker.red('Error:', err.message);
      });
  });
}
//parallel();