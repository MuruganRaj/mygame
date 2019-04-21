
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM product_temp limit 500 ',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
            //console.log(rows);
            //res.render('customers',{page_title:"Customers - Node.js",data:rows});
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
			//console.log(JSON.stringify(rows));
            //res.end(JSON.stringify(rows));  
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customers WHERE CustomerID = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
           // res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));   
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            FirstName    : input.FirstName,
            City : input.City,
            EmailID   : input.EmailID,
            ContactNo   : input.ContactNo 
        
        };
       console.log('save request...', data);

        var query = connection.query("INSERT INTO customers set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          //res.redirect('/customers');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify('success'));
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            FirstName    : input.FirstName,
            City : input.City,
            EmailID   : input.EmailID,
            ContactNo   : input.ContactNo 
        
        };
        
        connection.query("UPDATE customers set ? WHERE CustomerID = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};


exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM customers  WHERE CustomerID = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};


