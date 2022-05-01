function delquery(i){

    var arr = i.split("-");

    fetch('/deletedata', {
        method : 'delete',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify({
            id2 : arr[0],
            collection : arr[1]
        })
    })

}