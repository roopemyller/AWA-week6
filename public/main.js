
async function fetchOffers(){
    try {
        const response = await fetch('/offers')
        if (response.ok){
            const offers = await response.json()
            renderOffers(offers)
        }else{
            alert("Error fetching offers.")
        }
    }catch (error){
        console.error(error)
    }
}

function renderOffers(offers){
    const offersContainer = document.getElementById('offersContainer')
    offersContainer.innerHTML = ''
    offers.forEach(offer => {
        const offerDiv = document.createElement('div')
        offerDiv.className = 'col s12 m6 l4 offerDiv'

        const cardDiv = document.createElement('div')
        cardDiv.className = 'card hoverable'

        if(offer.imagePath){
            
            const cardImageDiv = document.createElement('div')
            cardImageDiv.className = 'card-image'

            const img = document.createElement('img')
            const path = offer.imagePath.replace("public", "")
            img.src = `http://localhost:3000/${path}`
            img.alt = offer.title
            img.className = 'responsive-img'

            const spanTitle = document.createElement('span')
            spanTitle.className = 'card-title'
            spanTitle.textContent = offer.title

            cardImageDiv.appendChild(img)
            cardImageDiv.appendChild(spanTitle)

            cardDiv.appendChild(cardImageDiv)
        }

        const cardContentDiv = document.createElement('div')
        cardContentDiv.className = 'card-content'

        const description = document.createElement('p')
        description.textContent = `Description: ${offer.description}`

        const price = document.createElement('p')
        price.textContent = `Price: ${offer.price} €`


        cardContentDiv.appendChild(description);
        cardContentDiv.appendChild(price)

        cardDiv.appendChild(cardContentDiv)
        offerDiv.appendChild(cardDiv)
        offersContainer.appendChild(offerDiv)
    })
}

async function submitOffer(offer){
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: offer
        })
        if (response.ok){
            alert("Offer submitted successfully")
            fetchOffers()
        }else{
            alert("Error submitting offer.")
        }
    }catch (error){
        console.error(error)
    }
}

document.addEventListener("DOMContentLoaded", function (){
    fetchOffers()
    inputForm = document.getElementById("offerForm")
    inputForm.addEventListener("submit", function (e){
        e.preventDefault()
        const formData = new FormData(e.target)
        submitOffer(formData)
        inputForm.reset()
    })
})