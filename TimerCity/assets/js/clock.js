const clock = document.getElementById("clock")

const timer = setInterval(() => {

    let dateToday = new Date()
    let hr = dateToday.getHours()
    let min = dateToday.getMinutes()
    let sec = dateToday.getSeconds() 

    if (hr < 10) {
        hr = `0${hr}`
    }
    if (min < 10) {
        min = `0${min}`
    }
    if (sec < 10) {
        sec = `0${sec}`
    }

    clock.innerHTML = `
        ${hr}:${min}:${sec}
    `
})
