function filterEmployees(){
    // Get id of selected job code
    let job_id = parseInt(document.getElementById('filter_by_value').value);
    window.location.href = '/employees'
    // // construct url to redirect
    $.ajax({
        url: `/employees/filter/${job_id}`,
        type: 'GET',
        success: function(result){
            window.location.href = `/employees/filter/${job_id}`;
        },
        fail: function(result){
            alert('Fail');
        }
    })
}