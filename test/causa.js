contract('Causa', function(accounts) {

  it("should create new Causa with all the parameters", function(done) {
  	var causaContract;
    var causa = Causa.new("nombre Test",100000,10,"http://ipfs/")
    .then (function(_causaContract){
    	   causaContract=_causaContract;
    	   if(!causaContract.address) {
    	   	   console.log(causaContract);
    	   	   assert.notOk(causaContract.transactionHash, 'new contract not deployed');
    	   	   done();
	       } else {
    	   		return causaContract.nombre.call();
    	   }
		   
      })
	.then (function(_nombre){
		  var aNombre=web3.toAscii(_nombre).replace(/^\0+/, '').replace(/\0+$/, '');
    	  //console.log("aNombre");
          //console.log(aNombre);
          assert.equal("nombre Test",aNombre,"nombre do not match");
	   	  return causaContract.montoObjetivo.call();
      })
	.then (function(_montoObjetivo){
		  var iMonto=Number(_montoObjetivo);
    	  //console.log("iMonto");
          //console.log(iMonto);
          assert.equal(100000,iMonto,"monto do not match");
	   	  done();
      })
    .catch(function(e) {
      	//console.log("catch!");
          //console.log(e);
          done(e);
    });
  });



  it("should update Beneficiario", function(done) {
 	var causaContract;
    var causa = Causa.new("nombre Test",100000,10,"http://ipfs/")
    .then (function(_causaContract){
    	   causaContract=_causaContract;
    	   if(!causaContract.address) {
    	   	   console.log(causaContract);
    	   	   assert.notOk(causaContract.transactionHash, 'new contract not deployed');
    	   	   done();
	       } else {
    	   		return causaContract.updateBeneficiario("Banco de Chile",123456789,'CC',11,"John Doe",'john@doe.com');
    	   }
		   
      })
	.then (function(_tx){
		  return causaContract.beneficiado.call();
      })
	.then (function(_beneficiado){
		  //console.log("_beneficiado");
          //console.log(_beneficiado);
          assert.equal("Banco de Chile",web3.toAscii(_beneficiado[0]).replace(/^\0+/, '').replace(/\0+$/, ''),"banco do not match");
          assert.equal(123456789,Number(_beneficiado[1]),"cuenta do not match");
          assert.equal("CC",web3.toAscii(_beneficiado[2]).replace(/^\0+/, '').replace(/\0+$/, ''),"tipo do not match");
          assert.equal(11,Number(_beneficiado[3]),"rut do not match");
          assert.equal("John Doe",web3.toAscii(_beneficiado[4]).replace(/^\0+/, '').replace(/\0+$/, ''),"titular do not match");
	   	  assert.equal("john@doe.com",web3.toAscii(_beneficiado[5]).replace(/^\0+/, '').replace(/\0+$/, ''),"email do not match");
	   	  done();
      })
    .catch(function(e) {
      	//console.log("catch!");
          //console.log(e);
          done(e);
    });
  });
  
  it("should donar()", function(done) {
 	var causaContract;
    var causa = Causa.new("nombre Test",100000,10,"http://ipfs/")
    .then (function(_causaContract){
    	   causaContract=_causaContract;
    	   if(!causaContract.address) {
    	   	   console.log(causaContract);
    	   	   assert.notOk(causaContract.transactionHash, 'new contract not deployed');
    	   	   done();
	       } else {
    	   		return causaContract.updateBeneficiario("Banco de Chile",123456789,'CC',11,"John Doe",'john@doe.com');
    	   }
		   
      })
	.then (function(_tx){
		  return causaContract.donar(30000,"Banco del Estado",123456788,'CV',12,"John Doe2",'john2@doe.com');
      })
	.then (function(_tx){
		  //console.log(causaContract);
		  return causaContract.numDonaciones.call();
      })
	.then (function(_num){
		  //console.log(_num);
		  assert.equal(1,Number(_num),"numDonaciones do not match");
		  return causaContract.getDonacionMonto.call(1);
      })
	.then (function(_monto){
		  //console.log("_monto");
          //console.log(_monto);
          assert.equal(30000,Number(_monto),"monto do not match");
       	  return causaContract.getDonacionBanco.call(1);
      })
	.then (function(_banco){
		  //console.log("_banco");
          //console.log(_banco);
          assert.equal("Banco del Estado",web3.toAscii(_banco).replace(/^\0+/, '').replace(/\0+$/, ''),"banco do not match");
       	  return causaContract.getDonacionCuenta.call(1);
      })
	.then (function(_cuenta){
		  //console.log("_cuenta");
          //console.log(_cuenta);
          assert.equal(123456788,Number(_cuenta),"cuenta do not match");
       	  return causaContract.getDonacionTipo.call(1);
      })
    .then (function(_tipo){
		  //console.log("_tipo");
          //console.log(_tipo);
          assert.equal("CV",web3.toAscii(_tipo).replace(/^\0+/, '').replace(/\0+$/, ''),"banco do not match");
       	  return causaContract.getDonacionRut.call(1);
      })
    .then (function(_rut){
		  //console.log("_rut");
          //console.log(_rut);
          assert.equal(12,Number(_rut),"rut do not match");
       	  return causaContract.getDonacionTitular.call(1);
      })
    .then (function(_titular){
		  //console.log("_titular");
          //console.log(_titular);
          assert.equal("John Doe2",web3.toAscii(_titular).replace(/^\0+/, '').replace(/\0+$/, ''),"titular do not match");
	   	  return causaContract.getDonacionEmail.call(1);
      })
    .then (function(_email){
		  //console.log("_email");
          //console.log(_email);
          assert.equal("john2@doe.com",web3.toAscii(_email).replace(/^\0+/, '').replace(/\0+$/, ''),"titular do not match");
	   	  done();
      })
    .catch(function(e) {
      	  //console.log("catch!");
          //console.log(e);
          done(e);
    });
  });


  it("should put deadline in the future", function(done) {
 	var causaContract;
  var start;
  var now;
    var causa = Causa.new("nombre Test",100000,1,"http://ipfs/")
    .then (function(_causaContract){
    	   causaContract=_causaContract;
    	   if(!causaContract.address) {
    	   	   console.log(causaContract);
    	   	   assert.notOk(causaContract.transactionHash, 'new contract not deployed');
    	   	   done();
	       } else {
            start = (new Date).getTime();
    	   		return causaContract.getNow.call();
    	   }
		   
      })
	.then (function(_now){
      //console.log("_now:");
      //console.log(_now);
      now = _now
		  return causaContract.deadline.call();
      })
	.then (function(_deadline){
		  //console.log("_deadline");
      //console.log(_deadline);
      var end = (new Date).getTime();
      var ms=end - start;
      //console.log("ms:"+ms);
      assert.isAbove(_deadline, now, 'deadline is in the future');
	   	return causaContract.plazo.call();
  })
  .then (function(_plazo){
      //console.log("_plazo");
      //console.log(_plazo);
       assert.equal(1,_plazo,'plazo do not match');
       done();
  })
  .catch(function(e) {
      //console.log("catch!");
      //console.log(e);
      done(e);
    });
  });
  
});
