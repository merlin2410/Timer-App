hourField = document.getElementById('hour-input');
minuteField = document.getElementById('minute-input');
secondField = document.getElementById('second-input');
let count = 1;
let timerList = [];



document.getElementById('set-button').addEventListener('click',(event)=>{
    hour = hourField.value;
    minute = minuteField.value;
    second = secondField.value;
    if(minute<=60 && second<=60){
        minuteField.style.borderColor = '#35f8b7';
        secondField.style.borderColor = '#35f8b7';
        console.log('test')
        createTimer(hour,minute,second);
    }
    else if(minute>60){
        minuteField.style.borderColor = 'red';
        alert("Enter valid value for minutes");
    }
    else if(second>60){
        secondField.style.borderColor = 'red';
        alert("Enter valid value for seconds");
    }
})

function createTimer(hour,minute,second){
    activeTimers = document.getElementById('active-timers');
    if(timerList.length===0){
        activeTimers.innerText = '';
    }
    timer = document.createElement('div');
    timer.innerHTML =  `<p>Time Left:</p>
                        <div class="time">
                            <input type="number" class="hour" id="hour" value = "${hour}">
                            <p>:</p>
                            <input type="number" class="minute" id="minute" value = "${minute}">
                            <p>:</p>
                            <input type="number" class="second" id="second" value = "${second}">
                        </div>
                        <button class="set-button" id="deletetimer${count}">Delete</button>`;
    timer.className = 'set-timer';
    timer.id = 'timer'+count;
    count++;
    activeTimers.appendChild(timer);
    const myInterval = setInterval(startTimer,1000,timer);
    let obj = {};
    obj[timer.id] = myInterval;
    timerList.push(obj);
    
}

function startTimer(timer){
    
    hourQuery = '#'+timer.id+' '+'#hour';
    hourElement = document.querySelector(hourQuery);
    minuteQuery = '#'+timer.id+' '+'#minute';
    minuteElement = document.querySelector(minuteQuery);
    secondQuery = '#'+timer.id+' '+'#second';
    secondElement = document.querySelector(secondQuery);
    hour = parseInt(hourElement.value);
    minute = parseInt(minuteElement.value);
    second = parseInt(secondElement.value)

    
    

    if(minute===0 && hour===0 && second===0){
        stopTimer(timer.id);
    }
    else{
        if(hour>0 && minute===0){
            minute = 59;
            hour--;
        }
        
    
        if(second===0){
            second = 59;
            minute--;
        }
        else{
            second--;
        }
    
        if(hour<10){
            hourElement.value = '0'+hour;
        }
        else{
            hourElement.value = hour;
        }
    
        if(minute<10){
            minuteElement.value = '0'+minute;
        }
        else{
            minuteElement.value = minute;
        }
    
        if(second<10){
            secondElement.value = '0'+second;
        }
        else{
            secondElement.value = second;
        }       
    }
    console.log('delete'+timer.id)
    document.getElementById('delete'+timer.id).addEventListener('click',(event)=>{
        let obj;
        
        for(let i of timerList){
            if(i[timer.id]!==undefined){
                obj = i;
            }
        }
        console.log(timer.id);
        myInterval = obj[timer.id];
        clearInterval(myInterval);
        
        timer.remove();
        timerList.splice(timerList.indexOf(obj),1);
        if(timerList.length===0){
            document.getElementById('active-timers').innerText = 'No Active Timers';
        }
        
    })
}

function stopTimer(timerId){
    let obj;
    for(let i of timerList){
        if(i[timerId]!==undefined){
            obj = i;
        }
    }
    myInterval = obj[timerId];
    clearInterval(myInterval);
    

    var audio = new Audio('assets/alarm.mp3');
    audio.play();
    timer = document.getElementById(timerId);
    console.log("to comare",timerId)
    timer.innerHTML = `<p></p>
                        <div class="time" style="font-size: 45px;">
                            Time us Up!
                        </div>
                        <button class="set-button" id="stop${timerId}">Stop</button>`;
    document.getElementById('stop'+timerId).addEventListener('click',(event)=>{
        console.log("this is", timerId)
        timer.remove();
        audio.pause();
        timerList.splice(timerList.indexOf(obj),1);
        if(timerList.length===0){
            document.getElementById('active-timers').innerText = 'No Active Timers';
        }
    })
}







