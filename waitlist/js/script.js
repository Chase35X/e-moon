function emailCheck(email){
    const emailPattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const isValid = emailPattern.test(email); 

    return isValid;
}

async function repeatedEmailCheck(email){
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
        return true;
    }

}

async function submit(){
    var email = document.getElementById("emailInput").value;

    if(!(emailCheck(email))){
        alert("Email is not valid. You have not been entered into the waitlist.");
    }

    else{
        var repeatedEmail = await repeatedEmailCheck(email) 
        
        if(repeatedEmail == false){
            var newSubmissionURL = 'https://us-east-1.aws.data.mongodb-api.com/app/e-moon-vjusocg/endpoint/newSubmission'
            
            newSubmissionURL += '?arg1=' + email

            const options = {
                method: 'POST'
            };

            let response = await fetch(newSubmissionURL, options)
            .then(data => {
                return data;
            })           

            const result = await response.json() 
            console.log(result)
        }

        else{
            alert("This email is already on the waitlist.")
        }
        
    }
}