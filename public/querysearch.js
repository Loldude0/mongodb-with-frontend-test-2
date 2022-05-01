var disabled = false;
var fname = false;
var mname = false;
var lname = false;
var age = false;
var gender = false;
var birthdate = false;
var phone = false;

var fnamen = '"firstname"';
var mnamen = '"middlename"';
var lnamen = '"lastname"';
var agen = '"age"';
var gendern = '"gender"'
var bdn = '"birthdate"';
var phn = '"phonenumber"';

var fen = '"female"';
var men = '"male"';

function addradios(){
    if(disabled == false){
        document.getElementById('customqueryfields').innerHTML += '<p><input type=' + 'checkbox' + ' id=' + 'firstnamecheck' + ' name=' + 'firstnamecheck' + ' value=' + 'firstnamecheck' + ' onclick=' + 'firstnamefunc()' + '></input> First name : <div id=' + 'firstnamediv' + '></div></p><p><input type=' + 'checkbox' + ' id=' + 'middlenamecheck' + ' name=' + 'middlenamecheck' + ' value=' + 'middlenamecheck' + ' onclick=' + 'middlenamefunc()' + '></input> Middle name : <div id=' + 'middlenamediv' + '></div></p><p><input type=' + ' checkbox' + ' id=' + 'lastnamecheck' + ' name=' + 'lastnamecheck' + ' value=' + 'lastnamecheck' + ' onclick=' + 'lastnamefunc()' + '></input> Last name : <div id=' + 'lastnamediv' + '></div></p><p><input type=' + 'checkbox' + ' id=' + 'agecheck' + ' name=' + 'agecheck' + ' value=' + 'agecheck' + ' onclick=' + 'agefunc()' + '></input> Age : <div id=' + 'agediv' + '></div></p> <p><input type=' + 'checkbox' + ' id=' + 'gendercheck' + ' name=' + 'gendercheck' + ' value=' + 'gendercheck' + ' onclick=' + 'genderfunc()' + '></input> Gender : <div id=' + 'genderdiv' + '></div></p> <p><input type=' + 'checkbox' + ' id=' + 'birthdatecheck' + ' name=' + 'birthdatecheck' + ' value=' + 'birthdatecheck' + ' onclick=' + 'birthdatefunc()' + '></input> Birth date : <div id=' + 'birthdatediv' + '></div></p><p><input type=' + 'checkbox' + ' id=' + 'phonenumbercheck' + ' name=' + 'phonenumbercheck' + ' value=' + 'phonenumbercheck' + ' onclick=' + 'phonenumberfunc()' + '></input> Phone number : <div id=' + 'phonenumberdiv' + '></div></p>'
        document.getElementById('queryradio').disabled = true;
        disabled = true;
    }
}

function firstnamefunc(){
    document.getElementById('firstnamediv').innerHTML += '<input type=' + 'text' + ' placeholder=' + 'first_name' + ' name=' + fnamen + ' required></input>';
    document.getElementById('firstnamecheck').disabled = true;
}

function middlenamefunc(){
    document.getElementById('middlenamediv').innerHTML += '<input type=' + 'text' + ' placeholder=' + 'middle_name' + ' name=' + mnamen + ' required></input>';
    document.getElementById('middlenamecheck').disabled = true;
}

function lastnamefunc(){
    document.getElementById('lastnamediv').innerHTML += '<input type=' + 'text' + ' placeholder=' + 'last_name' + ' name=' + lnamen + ' required></input>';
    document.getElementById('lastnamecheck').disabled = true;
}

function agefunc(){
    document.getElementById('agediv').innerHTML += '<input type=' + 'number' + ' name=' + agen + ' min=' + '0' + ' max=' + '120' + ' required></input>';
    document.getElementById('agecheck').disabled = true;
}

function genderfunc(){
    document.getElementById('genderdiv').innerHTML += 'male' + ' <input type=' + 'radio' + ' name=' + gendern + ' value=' + men + ' required></input>' + '  female' + ' <input type=' + 'radio' + ' name=' + gendern + ' value=' + fen + ' required></input>';
    document.getElementById('gendercheck').disabled = true;
}

function birthdatefunc(){
    document.getElementById('birthdatediv').innerHTML += '<input type=' + 'date' + ' name=' + bdn + ' required></input>';
    document.getElementById('birthdatecheck').disabled = true;
}

function phonenumberfunc(){
    document.getElementById('phonenumberdiv').innerHTML += '<input type=' + 'text' + ' placeholder=' + 'phone_number' + ' name=' + phn + ' required></input>';
    document.getElementById('phonenumbercheck').disabled = true;
}

function resetpg(){
    location.reload(true);
}