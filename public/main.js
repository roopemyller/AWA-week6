
async function submitOffer(offer){
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: offer.title,
                description: offer.description,
                price: Number(offer.price)
            })

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
        const title = document.getElementById("title").value
        const description = document.getElementById("description").value
        const price = document.getElementById("price").value
        console.log("Collected input:", {title, price, description})
        submitOffer({title, price, description})
        inputForm.reset()
    })
})