hourField = document.getElementById('hour-input');
minuteField = document.getElementById('minute-input');
secondField = document.getElementById('second-input');
let count = 1;


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
    timer = document.createElement('div');
    timer.innerHTML =  `<p>Time Left:</p>
                        <div class="time">
                            <input type="number" class="hour" id="hour" value = "${hour}">
                            <p>:</p>
                            <input type="number" class="minute" id="minute" value = "${minute}">
                            <p>:</p>
                            <input type="number" class="second" id="second" value = "${second}">
                        </div>
                        <button class="set-button">Delete</button>`;
    timer.className = 'set-timer';
    timer.id = 'timer'+count;
    count++;
    activeTimers.appendChild(timer);
    startTimer.call(timer);
}

function startTimer(){
    console.log(this);
    hourQuery = '#'+this.id+' '+'#hour';
    hourElement = document.querySelector(hourQuery);
    minuteQuery = '#'+this.id+' '+'#minute';
    minuteElement = document.querySelector(minuteQuery);
    secondQuery = '#'+this.id+' '+'#second';
    secondElement = document.querySelector(secondQuery);
    hour = parseInt(hourElement.value);
    minute = parseInt(minuteElement.value);
    second = parseInt(secondElement.value)

    setInterval(()=>{
        console.log(typeof secondElement.value)

        if(minute===0){
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
        
        
    },1000);

    console.log(hourElement)
}

