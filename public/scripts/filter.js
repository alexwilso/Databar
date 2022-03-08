function filterEmployees(){
    // Filters employees based on job code. Redirects user to filter page.
    // Get id of selected job code
    let job_id = parseInt(document.getElementById('filter_by').value);
    // construct url to redirect
    $.ajax({
        url: `/employees/filter/${job_id}`,
        type: 'GET',
        success: function(result){
            window.location.href = `/employees/filter/${job_id}`;
        },
        fail: function(result){
            alert('Fail');
        }
    });
}