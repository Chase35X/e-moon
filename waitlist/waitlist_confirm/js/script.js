
document.addEventListener("DOMContentLoaded", (event) => {
    const url = window.location.search
    console.log(url)
    
    const urlParams = new URLSearchParams(url);
    console.log(urlParams)

    var email = urlParams.get('email')

    if(email == null){
        window.location.href="/waitlist/waitlist_entry"
    }

    else{
        if(onWaitlist(email)){
            setContent(email,'✔️','You are already on the waitlist.','Thank you for your support   - e-moon team')
        }

        else{
            setContent(email,'🎉','You are on the waitlist!', 'Thank you for your support   - e-moon team')
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
    console.log(user)
    
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
    var text = document.getElementById('text_new')
    var subtext = document.getElementById('subtext_new')

    icon.value = icon_new
    email_text.value = email
    text.value = text_new
    subtext.value = subtext_new
}

