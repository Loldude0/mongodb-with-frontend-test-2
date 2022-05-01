var totalfields = 0;
var fields = 0;

function clicked2(){
    document.getElementById('addfield').innerHTML += '<p><input type="text" placeholder="field" name="'+totalfields+'"> : ' + '<input type="text" placeholder="value" name="'+(totalfields+1)+'"></p>';
    totalfields = totalfields + 2;
    fields++;
}
