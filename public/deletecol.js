function clicked(i){

    fetch('/collectiondelete', {
        method : 'delete',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify({
            name : i
        })
    })
}