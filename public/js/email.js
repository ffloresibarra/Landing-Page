'use strict';

const fields = {
    username: '',
    email: '',
    telephone: '',
    message: ''
}

function sendMail() {
    let result = true;
    fields.username = document.forms["contact-form"]["name"].value;
    fields.email = document.forms["contact-form"]["email"].value;
    fields.telephone = document.forms["contact-form"]["telephone"].value;
    fields.message = document.forms["contact-form"]["comment"].value;

    let string = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>                   
                    </div>`;
    let list = `<ul></ul>`    

    Object.keys(fields).forEach(key => {
        if (fields[key] == '' || fields[key] == undefined) {
            result = false;
            list = $(list).append(`<li>Insert a value on field ${ key }</li>`);            
        }
    });    
    string = $(string).append(list);
    if (result === false) {        
        $('#contact-text').append(string);
    } else {
        fetch('send-mail', {
            method: 'post',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(fields)
          })
          .then(json => {
              console.log(json);
              if (json.status == 200) {
                let string = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <p>The email was send it!</p>
                </div>`;

                document.forms["contact-form"]["name"].value = '';
                document.forms["contact-form"]["email"].value = '';
                document.forms["contact-form"]["telephone"].value = '';
                document.forms["contact-form"]["comment"].value = '';

                $('#contact-text').append(string);
              }
          })
          .then(function (data) {
              console.log(data);              
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
    }
}    
