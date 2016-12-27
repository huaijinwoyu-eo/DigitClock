/**
 * Created by 18730 on 2016/12/27.
 */
window.onload = function(){
    var canvas = [document.getElementById("canvas-1"),document.getElementById("canvas-2"),document.getElementById("canvas-4"),document.getElementById("canvas-5"),document.getElementById("canvas-7"),document.getElementById("canvas-8")];
    var canvas_item = [document.getElementById("canvas-3"),document.getElementById("canvas-6")];
    for(var i  = 0; i<canvas.length; i++){
        canvas[i].context = canvas[i].getContext("2d");
    }
    var radius = 8;
    var flag = true;
    if(flag){
        flag = false;
        var time_array = [time().hours,time().minutes,time().seconds].join("");
        for(var j  = 0; j<canvas.length; j++){
            canvas[j].value = time_array[j];
            fill_arc(canvas[j].value,radius,digit,"#528ECC",canvas[j].context);
        }
        time_array = null;
    }
    for(var i =0; i<canvas_item.length; i++){
        canvas_item[i].context = canvas_item[i].getContext("2d");
        fill_arc(10,radius,digit,"#528ECC",canvas_item[i].context);
    }
    setInterval(function(){
        var time_array = [time().hours,time().minutes,time().seconds].join("");
        for(var i = 0; i<canvas.length; i++){
            if(canvas[i].value == time_array[i]){

            }else {
                canvas[i].value = time_array[i];
                canvas[i].context.clearRect(0,0,canvas[i].context.canvas.width,canvas[i].context.canvas.height);
                fill_arc(canvas[i].value,radius,digit,"#528ECC",canvas[i].context);
            }
        }
    },50);

};
//    获取当前事件函数
function time(){
    var time = new Date();
    var hours = time.getHours() >= 10 ? time.getHours() : "0"+time.getHours();
    var minutes = time.getMinutes() >= 10 ? time.getMinutes() : "0"+time.getMinutes();
    var seconds = time.getSeconds() >= 10 ? time.getSeconds() : "0"+time.getSeconds();
    var new_times = {};
    new_times.hours = hours;
    new_times.minutes = minutes;
    new_times.seconds = seconds;
    return new_times;
}
//    渲染程序
function fill_arc(number,radius,digit,color,context){
    var x = radius+2;
    var y = radius+2;
    for(var i = 0 ; i < digit[number].length; i++){
        for(var j = 0; j < digit[number][i].length; j++){
            if(digit[number][i][j] == 1){
                context.beginPath();
                context.arc(x*(2*j+1),y*(2*i+1),radius,0,2*Math.PI);
                context.closePath();
                context.fillStyle = color;
                context.fill();
            }
        }
    }
}