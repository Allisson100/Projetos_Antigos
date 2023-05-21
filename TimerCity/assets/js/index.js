// Utilizando os números do relógio para sincronizar as animações
//Número para sincronizar, tem que ser o valor da hora atual.
const date = new Date()
var hr = date.getHours()
var m = date.getMinutes()

const clock = setInterval(() => {
    const newDate = new Date()
    const hour = newDate.getHours()
    const minutes = newDate.getMinutes()

    hr = hour
    m = minutes

}, 30000)

// Valor padrão para as animações
// Vou sincronizar esse valor com o botão para as animações serem mais rápidas
var animationsDelay = ((60 - m) - 1) * 60


// Main Animation
const main = document.getElementById("main")

const mainAnimations = 24

const mainAnimationTimingFunction = 'linear'
const mainAnimationFillMode = 'forwards'


const listMainAnimation = [
    `VinteQuatroUma ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `UmaDuas ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `DuasTres ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `TresQuatro ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `QuatroCinco ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `CincoSeis ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `SeisSete ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `SeteOito ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `OitoNove ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `NoveDez ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `DezOnze ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `OnzeDoze ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `DozeTreze ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `TrezeQuatorze ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `QuatorzeQuinze ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `QuinzeDezesseis ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `DezesseisDezessete ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `DezesseteDezoito ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`, 

    `DezoitoDezenove ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `DezenoveVinte ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `VinteVinteUma ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `VinteUmaVinteDuas ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `VinteDuasVinteTres ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
    `VinteTresVinteQuatro ${animationsDelay}s ${mainAnimationTimingFunction} ${mainAnimationFillMode}`,
]

// Horários que começam e terminam a animação do sol
const startSunAnimation = 6
const endSunAnimation = 18

// Horários que começam e terminam a animação da lua
const startMoonAnimation = 18
const endMonnAnimation = 6


// Animação do sol e lua
const sun =  document.getElementById("sun")
const moon =  document.getElementById("moon")

const sunMoonAnimationTimingFunction = 'linear'
const sunMoonAnimationFillMode = 'forwards'

const listSunMoonAnimation = [
    `Seis-Sete ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
    `Sete-Oito ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
    `Oito-Nove ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
    `Nove-Dez ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
    `Dez-Onze ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
    `Onze-Doze ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,

    `Doze-Treze ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
    `Treze-Quatorze ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
    `Quatorze-Quinze ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
    `Quinze-Dezesseis ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
    `Dezesseis-Dezessete ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
    `Dezessete-Dezoito ${animationsDelay}s ${sunMoonAnimationTimingFunction} ${sunMoonAnimationFillMode}`,
]

// Animação da Estrela
const firststars = document.getElementById("starOne")  
const secondstars = document.getElementById("starTwo")  
const thirdstars = document.getElementById("starThree") 

const starAnimationStart = `opacityOne ${animationsDelay * 5}s linear forwards`
const starAnimationFinish = `opacityZero ${animationsDelay * 6}s linear forwards`

// Animação da Nuvem
const cloud =  document.getElementById("cloud")

const cloudAnimationStart = `cloud ${animationsDelay * 10}s linear`


//Loop das Animações
async function delay(timeDelay){
    return new Promise(resolve => setTimeout(resolve, timeDelay));
}

const mainAnimatioLoop = async ()=>{
    for (let i = hr; i < mainAnimations; i++) {

        main.style.animation = listMainAnimation[i]

        if (i >= startSunAnimation && i < endSunAnimation) {
            sun.style.animation = listSunMoonAnimation[i - startSunAnimation]
            cloud.style.animation = cloudAnimationStart
        }

        // Começo da Animação da Lua
        if (i >= startMoonAnimation - 1) {
            cloud.style.animation = ''
            moon.style.animation = listSunMoonAnimation[i - (startMoonAnimation - 1)]

            // Animação das estrelas
            firststars.style.animation = starAnimationStart
            secondstars.style.animation = starAnimationStart
            thirdstars.style.animation = starAnimationStart
        }

        // Final da Animação da Lua
        if(i < endMonnAnimation) {
            moon.style.animation = listSunMoonAnimation[endMonnAnimation + i]

            // A Animação de opcaity 0 das estrelas
            firststars.style.animation = starAnimationFinish
            secondstars.style.animation = starAnimationFinish
            thirdstars.style.animation = starAnimationFinish
        }

        await delay(animationsDelay * 1000);

        animationsDelay = ((60 - m) - 1) * 60

        console.log(animationsDelay);
        console.log(hr);
        console.log(m);

        // Para manter as Animações infinitas
        if (i == mainAnimations - 1) {
            i = 0
        }
    }
}

mainAnimatioLoop()
