const Clock = (function () {
    let outTime;
    let outDate;
    function init() {
        initTHML()
        getDate()
    }
    function initTHML() {
        outDate = document.querySelector('#date')
        outTime = document.querySelector('#clock-time')
    }
    function getDate() {
        let date = new Date();
        innerDate(date);
        innerTime(date);

    }
    function innerTime(date) {
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        if (hh < 10) hh = '0' + hh;
        if (mm < 10) mm = '0' + mm;
        if (ss < 10) ss = '0' + ss;
        outTime.innerHTML = `${hh} : ${mm} : ${ss}`
        run()
    }
    function innerDate(date) {
        let yy = date.getFullYear()
        let mm = date.getMonth()
        let dd = date.getDate()
        mm += 1
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        outDate.innerHTML = `${yy}.${mm}.${dd}`

    }
    function run() {
        setTimeout(getDate, 1000)
    }
    return {
        init: init
    }
})();

const StopWatch = (function () {
    let stopWatch;
    let time = 0;
    let timer;
    let pausa = 0;
    let pauses = 0

    function initHtml() {
        stopWatch = document.querySelector('#stopwatch-time').children;
        document.querySelector('#stopwatch-start').addEventListener('click', function(){
            this.disabled = true
            document.querySelector('#stopwatch-reset').disabled = true;
            start()
        })
        document.querySelector('#stopwatch-loop').addEventListener('click', loop)
        document.querySelector('#stopwatch-stop').addEventListener('click',()=>{
            document.querySelector('#stopwatch-start').disabled = false
            document.querySelector('#stopwatch-reset').disabled = false;

            stop()
        })
        document.querySelector('#stopwatch-reset').addEventListener('click', reset)
    }
    function loop() {
        document.querySelector('#stopwatch-out').innerHTML += `<p>${document.querySelector('#stopwatch-time').innerHTML}</p>`
        
    }
    function stop() {
        clearInterval(timer)
        pausa = new Date().getTime()
    }
    function reset() {
        document.querySelector('#stopwatch-out').innerHTML = ''
        for(let i = 0 ; i< stopWatch.length ; i++){
            if(i == stopWatch.length-1) stopWatch[i].textContent = '000'
            else stopWatch[i].textContent = '00'
            
        }
        time = 0
        pausa = 0
        pauses = 0
    }
    function run(time) {
        let rizn = new Date().getTime() - (time + pauses)
        let hh = Math.floor((rizn%(1000*60*60*24))/(1000*60*60));
        let mm = Math.floor((rizn%(1000*60*60))/(1000*60));
        let ss = Math.floor((rizn%(1000*60))/1000);
        let ms = Math.floor(rizn%1000)
        
        if(ms < 10) ms = '00' + ms;
        else if(ms < 100) ms = '0' + ms
        if(ss < 10) ss = '0' + ss;
        if(mm < 10) mm = '0' + mm;
        if(hh < 10) hh = '0' + hh;

        stopWatch[0].textContent = hh;
        stopWatch[1].textContent = mm;
        stopWatch[2].textContent = ss;
        stopWatch[3].textContent = ms;
    }
    function start() {
        if(time == 0) time = new Date().getTime();
        if(pausa > 0) pauses = pauses + (new Date().getTime() - pausa)
        timer = setInterval(() => {
            run(time)
        }, 9)
    }
    function init() {
        initHtml()
    }
    return {
        init: init
    }
})();

const Timer = (function(){
    let minutes = 25;
    let minutesHtml;
    let timerOut;
    let time = 0;
    let mm = 0;
    let ss = 59;
    let timer;
    function initHtml(){
        minutesHtml = document.querySelector('#set-timer-minutes');
        timerOut = document.querySelector('#timer-time').children;
        document.querySelector('#plus').addEventListener('click', plus)
        document.querySelector('#minus').addEventListener('click', minus)
        document.querySelector('#timer-start').addEventListener('click', function(){
            this.disabled = true
            start()
        })
        document.querySelector('#timer-stop').addEventListener('click', ()=>{
            document.querySelector('#timer-start').disabled = false
            stop()
        })
        document.querySelector('#timer-reset').addEventListener('click', ()=>{
            document.querySelector('#timer-start').disabled = false
            reset()
        })
        
    }
    function start(){
        if(mm == 0) mm = minutes -1;
        timer = setInterval(run, 1000)
        
    }
    function run(){
        if(mm < 10) timerOut[0].textContent = '0' + mm
        else timerOut[0].textContent = mm
        if(ss < 10) timerOut[1].textContent = '0' + ss
        else timerOut[1].textContent = ss
        
        ss-=1
        if(ss == -1){
            mm -=1
            ss = 59
        }
        if(mm == -1) stop()
        
    }
    function reset(){
        stop()
        ss = 59
        mm = 0;
        for(let elem of timerOut){
            elem.textContent = '00'
        }
    }
    function stop(){
        clearInterval(timer)
    }
    function plus(){
        if(minutes < 100 ){
            minutes += 1
        }
        refresh()
    }
    function minus(){
        if(minutes > 1){
            minutes -= 1
        }
        refresh()
    }
    function refresh(){
        minutesHtml.textContent = minutes
    }
    
    
    function init(){
        initHtml()
        refresh()
    }
    return {
        init:init
    }
})();

Clock.init();
StopWatch.init();
Timer.init();

