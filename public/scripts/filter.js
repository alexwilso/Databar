function filterEmployees(){
    // Get id of selected job code
    let job_id = parseInt(document.getElementById('filter_by_value').value);
    alert(job_id);
    // construct url to redirect
    window.location = `employees/filter/${job_id}`;
}