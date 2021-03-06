let carouselImgsSrc = [
    {src: 'img/LC-tshirt-broccolo.jpg'},
    {src: 'img/LC-tm-Logo.jpg'}, /* Sempre in posizione 0 */
    {src: 'img/LC-tshirt-maccherone_2.jpg'},
    {src: 'img/LC-tshirt-biscotto_1.jpg'},
    {src: 'img/LC-felpa-broccolo.jpg'},
    {src: 'img/LC-felpa-maccherone.jpg'},
    {src: 'img/LC-tshirt-maccherone_1.jpg'},
    {src: 'img/LC-tshirt-biscotto.jpg'},
    {src: 'img/LC-etichettaInterna.jpg'},
    {src: 'img/LC-tshirt-biscotto_2.jpg'},
    {src: 'img/LC-tshirt-biscotto_3.jpg'},
    {src: 'img/LC-tshirt-maccherone.jpg'},
    {src: 'img/LC-felpa-biscotto.jpg'},
    {src: 'img/LC-tshirt-broccolo_1.jpg'},
    {src: 'img/LC-coming-soon.jpg'}
]

carouselImgsSrc.forEach(el => {
    // Creazione immagine nello slideshow
    let imgCont = document.createElement('div')
    imgCont.classList.add('slideshow-img-cont')

    let img = document.createElement('img')
    img.classList.add('left-shadow')
    img.src = el.src

    imgCont.appendChild(img)
    document.getElementById('slideshow-translate').appendChild(imgCont)
})
// Creazione puntini
if(screen.width > 600){
    for(let i=0; i < carouselImgsSrc.length - 1; i++){
        let dot = document.createElement('div')
        dot.classList.add('dot')
        document.getElementById('dots').appendChild(dot)
    }
} else {
    for(let i=0; i < carouselImgsSrc.length; i++){
        let dot = document.createElement('div')
        dot.classList.add('dot')
        document.getElementById('dots').appendChild(dot)
    }
}

let prevImg = document.getElementById('prev-img')
let selectedImg = document.getElementById('selected-img')
let nextImg = document.getElementById('next-img')

// Inizializzo la visualizzazione iniziale --> logo, ultima img, seconda img
// selectedImg.src = carouselImgsSrc[0].src
// prevImg.src = carouselImgsSrc[carouselImgsSrc.length-1].src
// nextImg.src = carouselImgsSrc[1].src

let selectedIndex = 0
let prevIndex = carouselImgsSrc.length-1
let nextIndex = selectedIndex + 1

// MOVIMENTO NELLO SLIDESHOW TRAMITE INDEX
const prev = () => {
    if(selectedIndex >= 1){
        selectedIndex--
        if(prevIndex === 0){
            prevIndex = carouselImgsSrc.length-1
        } else {
            prevIndex--
        }
        if(nextIndex === 0){
            nextIndex = carouselImgsSrc.length-1
        } else {
            nextIndex--
        }
    } else if(selectedIndex === 0){
        selectedIndex = carouselImgsSrc.length-1
        prevIndex = carouselImgsSrc.length-2
        nextIndex = 0
    }
    selectedImg.src = carouselImgsSrc[selectedIndex].src
    prevImg.src = carouselImgsSrc[prevIndex].src
    nextImg.src = carouselImgsSrc[nextIndex].src
}
const next = () => {
    if(selectedIndex >= carouselImgsSrc.length-1){
        selectedIndex = 0
        prevIndex = carouselImgsSrc.length-1
        nextIndex = selectedIndex + 1
    } else {
        selectedIndex++
        // prev
        if(prevIndex === carouselImgsSrc.length-1){
            prevIndex = 0
        } else {
            prevIndex++
        }
        // next
        if(nextIndex === carouselImgsSrc.length-1){
            nextIndex = 0
        } else {
            nextIndex++
        }
    }
    selectedImg.src = carouselImgsSrc[selectedIndex].src
    prevImg.src = carouselImgsSrc[prevIndex].src
    nextImg.src = carouselImgsSrc[nextIndex].src
}

// MOVIMENTO NELLO SLIDESHOW TRAMITE CSS
const slideshowTranslate = document.getElementById('slideshow-translate')
let nextBtn = document.getElementById('next')
let prevBtn = document.getElementById('prev')
// let imgWidth = slideshowTranslate.offsetWidth / carouselImgsSrc.length
let imgWidth = document.getElementsByClassName('slideshow-img-cont')[0].offsetWidth
let imgMargin = 2 * document.getElementsByClassName('slideshow-img-cont')[0].offsetLeft
let nextClicked = 0

let selectedDotIndex = 1
document.querySelector(`.dot:nth-child(${selectedDotIndex})`).classList.add('dot-selected')

const overflowNext = () => {
    if(screen.width > 600){
        if(nextClicked < carouselImgsSrc.length - 2){
            nextClicked++
            slideshowTranslate.style.transform = `translateX(-${imgWidth*nextClicked + imgMargin}px)`
            // verifica dello stato dopo il click
            if(nextClicked === carouselImgsSrc.length-2){
                nextBtn.classList.add('hidden')
                nextBtn.classList.remove('visible')
            }
        } else {
            nextBtn.classList.add('hidden')
            nextBtn.classList.remove('visible')
        }
    } else {
        if(nextClicked < carouselImgsSrc.length-1){
            nextClicked++
            slideshowTranslate.style.transform = `translateX(-${imgWidth*nextClicked + imgMargin}px)`
            // verifica dello stato dopo il click
            if(nextClicked === carouselImgsSrc.length-1){
                nextBtn.classList.add('hidden')
                nextBtn.classList.remove('visible')
            }
        } else {
            nextBtn.classList.add('hidden')
            nextBtn.classList.remove('visible')
        }
    }
    // Abilitazione del tasto opposto (disabilitato)
    if(nextClicked < carouselImgsSrc.length){
        prevBtn.classList.add('visible')
        prevBtn.classList.remove('hidden')
    }
    // Dot
    if(selectedDotIndex < carouselImgsSrc.length){
        selectedDotIndex++
        document.querySelector(`.dot:nth-child(${selectedDotIndex-1})`).classList.remove('dot-selected')
        document.querySelector(`.dot:nth-child(${selectedDotIndex})`).classList.add('dot-selected')

    }
}

const overflowPrev = () => {
    if(nextClicked >= 0){
        nextClicked--
        slideshowTranslate.style.transform = `translateX(-${imgWidth*nextClicked + imgMargin}px)`
        // verifica dello stato dopo il click
        if(nextClicked === 0){
            prevBtn.classList.add('hidden')
            prevBtn.classList.remove('visible')
        }
    } else {
        prevBtn.classList.add('hidden')
        prevBtn.classList.remove('visible')
    }
    // Abilitazione del tasto opposto (disabilitato)
    if(nextClicked < carouselImgsSrc.length){
        nextBtn.classList.add('visible')
        nextBtn.classList.remove('hidden')
    }
    // Dots
    if(selectedDotIndex > 1){
        selectedDotIndex--
        document.querySelector(`.dot:nth-child(${selectedDotIndex+1})`).classList.remove('dot-selected')
        document.querySelector(`.dot:nth-child(${selectedDotIndex})`).classList.add('dot-selected')

    }
}