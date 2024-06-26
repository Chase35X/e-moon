
document.addEventListener("DOMContentLoaded", (event) => {
    const url = window.location.search
    
    const urlParams = new URLSearchParams(url);

    var email = urlParams.get('email')

    if(email == null){
        window.location.href="/waitlist/waitlist_entry"
    }

    else{
        if(onWaitlist(email)){
            setContent(email,'🎉','You are on the waitlist','Thank you for your support from the e-moon team')
        }

        else{
            window.location.href="/waitlist/waitlist_entry"
        }
    }

});

async function onWaitlist(email){

    var getSubmissionURL = 'https://us-east-1.aws.data.mongodb-api.com/app/e-moon-vjusocg/endpoint/getSubmission'

    getSubmissionURL += '?arg1=' + email

    let response = await fetch(getSubmissionURL)
    .then(data => {
        return data;
    })           

    const user = await response.json() 
    
    if(user==null){
        return false;
    }

    else{

        var repeatedWaitlistURL = 'https://us-east-1.aws.data.mongodb-api.com/app/e-moon-vjusocg/endpoint/repeatedWaitlistEntry'

        repeatedWaitlistURL += '?arg1=' + email

        const options = {
            method: 'PUT'
        };

        let response = await fetch(repeatedWaitlistURL, options)
        .then(data => {
            return data;
        })    

        const result = await response.json() 

        return true;
    }
}

function setContent(email, icon_new, text_new, subtext_new){
    var icon = document.getElementById('icon')
    var email_text = document.getElementById('email')
    var text = document.getElementById('text')
    var subtext = document.getElementById('subtext')

    icon.innerHTML = icon_new
    email_text.innerHTML = 'For the email: ' + email
    text.innerHTML = text_new
    subtext.innerHTML = subtext_new
}

