

const marker = require('@ajar/marker'); 




marker.info('hello','marker'); 
console.log('hello node');

marker.verbose('verbose','is explicit');
marker.debug('debug','is common');
marker.info('info','is trivial');  
marker.warn('warn','is important');  
marker.err('err','is critical'); 

//by levels shorthand

marker.v('v','is short for verbose');    
marker.d('d','is short for debug');     
marker.i('i','is short for info');     
marker.w('w','is short for warn');     
marker.e('e','is short for err');  

//by color names

marker.blue('blue','ocean');       
marker.magenta('magenta','is lighter then purple');    
marker.cyan('cyan','is lighter then blue');       
marker.green('green','peace');      
marker.yellow('yellow','mellow');     
marker.red('red','tape');        
   
// .obj()
const complex_object = {
    one:1,
    two:2,
    internal:{
        a:'first',
        b:'second',
        nested:{
            key:'value',
            some:'thing',
            fruits:['apple','orange','banana'],
            types:[{str:'one',int:2,bool:false,empty:null}]
        }
    },
    three:3,
    four:4
}
/**
 * Use .obj() to log complex objects
 * @param { Object } obj - the Object to log 
 * @param { string } label - optional label 
 */
marker.obj(complex_object,'This is a complex_object');

/**
 * use .error() to log errors
 * @param { Error } - an Error object to log
 */
try{
    define('is not defind')
}catch(err){
    marker.error(err)
}