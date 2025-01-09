var omdb =require('./index.js');
var expect = require('expect.js');



describe('Test!!!...', function () {
	

	it(' Test 1 : ', function () {

		var omdbp = omdb({s:"Fight Club",r:"json"});

		return omdbp.then(function(data){
			expect(data).to.be.an('object');
			expect(data.Search).to.have.length(10);
		})

	});

	it(' Test 2 : ', function () {

		var omdbp = omdb({i:"tt0137523",type:"movie",r:"json"});

		return omdbp.then(function(data){
			expect(data).to.be.an('object');
			expect(data.Title).to.eql("Fight Club");	
			expect(data.Year).to.eql("1999");	
			expect(data.Director).to.eql("David Fincher");	
		})

	});

});