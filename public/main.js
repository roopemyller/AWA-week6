
async function submitOffer(offer){
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: offer
        })
        if (response.ok){
            alert("Offer submitted successfully")
        }else{
            alert("Error submitting offer.")
        }
    }catch (error){
        console.error(error)
    }
}

document.addEventListener("DOMContentLoaded", function (){
    inputForm = document.getElementById("offerForm")
    
    
    inputForm.addEventListener("submit", function (e){
        e.preventDefault()
        const formData = new FormData(inputForm)
        formData.append("title", document.getElementById("title").value)
        formData.append("description", document.getElementById("description").value)
        formData.append("price", document.getElementById("price").value)
        submitOffer(formData)
        inputForm.reset()
    })
})