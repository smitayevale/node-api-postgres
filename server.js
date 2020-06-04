var url = require('url');
var fs = require('fs')
var conn = require('./connection.js')
var pool = conn.getPool();


module.exports = {
    handleRequest: function(req,res){
        res.writeHead(200,{'Content-Type': 'text/html'});
        var path = url.parse(req.url).pathname;
        switch(path){
            case '/':
                fs.readFile("./index.html","utf8",function(err,data){
                        if (err) throw err;
                        res.write(data);
                        res.end();
                  });
                break;
            case '/emp_data':
                userurl = req.url
                urlinfo = url.parse(userurl,true)
                fs.readFile("./details.html","utf8",function(err,data){
                        if(err) throw err;
                        q = urlinfo.query
                        eid = q.id;
							
                        pool.query("SELECT e.employee_id, e.name, e.salary, d.dept_name, d.location FROM employee e INNER JOIN department d on d.dept_no = e.dept_no WHERE e.employee_id = '"+eid+"';", function (err, result) {
                        if (err) throw err;
                        res.writeHead(200,{"content-type":"text/html"},result.rows);
                        res.write("<label for='employee_id'>Employee Id:</label><br><br><input type='text' id='employee_id' name='employee_id' value='"+result.rows[0].employee_id+"'><br><br><label for='name'>Employee Name:</label><br><br><input type='text' id='name' name='name' value='"+result.rows[0].name+"'><br><br><label for='salary'>Salary:</label><br><br><input type='text' id='salary' name='salary' value='"+result.rows[0].salary+"'><br><br><label for='dept_name'>Department:</label><br><br><input type='text' id='dept_name' name='dept_name' value='"+result.rows[0].dept_name+"'><br><br><label for='location'>Location:</label><br><br><input type='text' id='location' name='location' value='"+result.rows[0].location+"'><br><br>");
                        console.log(result.rows[0].name);
                        res.end();
                        });
                    });
                break;
            default :
                res.writeHead(404)
                res.write('no record found');
                res.end();
        }
    }
}