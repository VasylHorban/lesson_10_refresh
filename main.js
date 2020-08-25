const Clock = (function(){
    let outTime;
    let outDate;
    function init(){
        initTHML()
        getDate()
    }
    function initTHML(){
        outDate = document.querySelector('#date')
        outTime = document.querySelector('#clock-time')
    }
    function getDate(){
        let date = new Date();
        innerDate(date);
        innerTime(date);
        
    }
    function innerTime(date){
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        if(hh < 10) hh = '0' + hh;
        if(mm < 10) mm = '0' + mm;
        if(ss < 10) ss = '0' + ss;
        outTime.innerHTML = `${hh} : ${mm} : ${ss}`
        run()
    }
    function innerDate(date){
        let yy = date.getFullYear()
        let mm = date.getMonth()
        let dd = date.getDate()
        mm+=1
        if(mm < 10) mm = '0' + mm;
        if(dd < 10) dd = '0' + dd;
        outDate.innerHTML = `${yy}.${mm}.${dd}`
        
    }
    function run(){
        setTimeout(getDate, 1000)
    }
    return {
        init: init
    }
})();

Clock.init()


const StopWatch = (function(){
    let stopWatch;
    let time = 0;
    let timer;
    let hh = 0;
    let mm = 0;
    let ss = 0;
    let ms = 0;
    function initHtml(){
        stopWatch = document.querySelector('#stopwatch-time');
        document.querySelector('#stopwatch-start').addEventListener('click', start)
        document.querySelector('#stopwatch-loop').addEventListener('click', loop)
        document.querySelector('#stopwatch-stop').addEventListener('click', stop)
        document.querySelector('#stopwatch-reset').addEventListener('click', reset)
    }
    function loop(){
        document.querySelector('#stopwatch-out').innerHTML += `<p>${stopWatch.textContent}</p>`
    }
    function stop(){
        clearInterval(timer)
    }
    function reset(){}
    function run(){
        let out = ''
        time += 1
        if(time == 999) {
            time = 0;
            ss += 1
        }
        if(ss == 59) {
            ss = 0;
            mm += 1
        }
        if(mm == 59) {
            mm = 0;
            hh += 1
        }
        ms = time;
        if(hh < 10) {
            out += '0'+ hh + ' : '
        }else{
            out += hh + ' : '
        }
        if(mm < 10)  {
            out+= '0'+ mm + ' : '
        }else{
            out+=  mm + ' : '
        }
        if(ss < 10)  {
            out+= '0'+ ss + ' : '
        }else{
            out+= ss + ' : '
        }
        if(ms < 10){ 
            out+= '00'+ ms
        }else if(ms < 100) {
            out+= '0'+ ms
        }else {
            out += ms
        }
        document.querySelector('#stopwatch-time').textContent = out;
    }
    function start(){
        timer = setInterval(run, 1)
    }
    function init(){
        initHtml()
    }
    return {
        init:init
    }
})()

StopWatch.init();

