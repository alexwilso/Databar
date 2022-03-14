//adapted from Week 8 video lecture: Updating Data using NodeJS, https://canvas.oregonstate.edu/courses/1849617/pages/week-8-learn-using-javascript-and-nodejs?module_item_id=21756110  
function updateEmployee(id) {
    $ajax({
        url: '/employees/update/' + id,
        type: 'PUT',
        data: $('#editEmployees').serialize(),
        success: function(result) {
            window.location.replace("./");
        }
    })
};