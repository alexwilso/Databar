function deleteItem(id){
    $.ajax({
        url: `/${id}`,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        },
        fail: function(result){
            alert('Fail');
        }
    })
}
