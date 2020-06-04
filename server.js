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
                        eid = q.e_id;
							
                        pool.query("SELECT e.employee_id, e.name, e.salary, d.dept_name, d.location FROM employee e INNER JOIN department d on d.dept_no = e.dept_no WHERE e.employee_id = '"+eid+"';", function (err, result) {
                        if (err) throw err;
                        res.writeHead(200,{"content-type":"text/html"},result.rows);
                        res.write("<label for='eid'>Employee Id:</label><br><br><input type='text' id='eid' name='e_id' value='"+result.rows[0].employee_id+"'><br><br><label for='eame'>Employee Name:</label><br><br><input type='text' id='ename' name='e_name' value='"+result.rows[0].name+"'><br><br><label for='pid'>Salary:</label><br><br><input type='text' id='pid' name='p_id' value='"+result.rows[0].salary+"'><br><br><label for='oid'>Department:</label><br><br><input type='text' id='oid' name='o_id' value='"+result.rows[0].dept_name+"'><br><br><label for='amt'>Location:</label><br><br><input type='text' id='amt' name='amt' value='"+result.rows[0].location+"'><br><br>");
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