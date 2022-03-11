//adapted from Week 8 video lecture: Updating Data using NodeJS, https://canvas.oregonstate.edu/courses/1849617/pages/week-8-learn-using-javascript-and-nodejs?module_item_id=21756110  
function getEmp(res, mysql, context, id, complete) {
    var sql = 'SELECT first_name, last_name, telephone, job_code, start_date FROM Employee WHERE id = ?';
    var inserts = [id];
    mysql.pool.query(sql, inserts, function(error, results, fields) {
        if(error) {
            res.write(JSON.stringify(error));
            res.end();
        }
        context.employee = results[0];
        complete();
    });
}