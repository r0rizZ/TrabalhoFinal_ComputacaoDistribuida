/* @Name ombdb-api
*  @Version 0.1.0
*  @author ayhankuru
*/

// required packages..

var Promise = require('bluebird');
var rq      = require('request-promise');
var qp = require('query-parse');
var apiurl ="http://www.omdbapi.com/?";



function omdb(params){ 
	var url =apiurl+qp.toString(params);
	return new Promise(function (resolve, reject) {
	  rq(url)
		.then(function(data){

			if(params.r =="json"){
				 resolve(JSON.parse(data));
			}else{
				 resolve(data);
			}
		
		})
		.catch(function (err) {
			reject(err);
		})
	});
	
}
	


module.exports=exports=omdb;