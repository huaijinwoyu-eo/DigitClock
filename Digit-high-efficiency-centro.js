/**
 * Created by 18730 on 2016/12/27.
 */
window.onload = function(){
    var radius = 8;
    var Margin_left = 50;
    var Margin_top = 40;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var time_array ;
    time_array = [time().hours,time().minutes,time().seconds].join("");
    fill_arc(time_array[0],radius,Margin_left,Margin_top,digit,"#528ECC",context);
    fill_arc(time_array[1],radius,Margin_left+150,Margin_top,digit,"#528ECC",context);
    fill_arc(time_array[2],radius,Margin_left+400,Margin_top,digit,"#528ECC",context);
    fill_arc(time_array[3],radius,Margin_left+550,Margin_top,digit,"#528ECC",context);
    fill_arc(time_array[4],radius,Margin_left+800,Margin_top,digit,"#528ECC",context);
    fill_arc(time_array[5],radius,Margin_left+950,Margin_top,digit,"#528ECC",context);
    fill_arc(10,radius,Margin_left+310,Margin_top,digit,"#528ECC",context);
    fill_arc(10,radius,Margin_left+710,Margin_top,digit,"#528ECC",context);
    var time_now = [];
    for(var i = 0; i<time_array.length; i++){
        time_now[i] = new now_time(Margin_top);
        time_now[i].value = time_array[i];
    }
    time_now[0].left = Margin_left;
    time_now[1].left = Margin_left+150;
    time_now[2].left = Margin_left+400;
    time_now[3].left = Margin_left+550;
    time_now[4].left = Margin_left+800;
    time_now[5].left = Margin_left+950;

    var balls = [];
    setInterval(function(){
        time_array = time_array = [time().hours,time().minutes,time().seconds].join("");
        context.clearRect(0,0,context.canvas.width,context.canvas.height);
        for(var i = 0 ; i<time_now.length; i++){
            if(time_array[i] == time_now[i].value){
                fill_arc(time_now[i].value,radius,time_now[i].left,time_now[i].top,digit,"#528ECC",context);
                fill_arc(10,radius,Margin_left+310,Margin_top,digit,"#528ECC",context);
                fill_arc(10,radius,Margin_left+710,Margin_top,digit,"#528ECC",context);
            }else {
                time_now[i].value = time_array [i];
                fill_arc(time_now[i].value,radius,time_now[i].left,time_now[i].top,digit,"#528ECC",context);
                for(var m = 0 ; m < digit[time_array[i]].length; m++){
                    for(var j = 0; j < digit[time_array[i]][m].length; j++){
                        if(digit[time_array[i]][m][j] == 1){
                            balls.unshift(new ball(time_now[i].left+(radius+2)*(2*j+1),time_now[i].top+(radius+2)*(2*m+1)));
                            if(balls.length>=500){
                                balls.pop();
                            }
                        }
                    }
                }
            }
        }
        for(var i =0;i<balls.length;i++){
            balls[i].vy += balls[i].g;
            balls[i].left += balls[i].vx;
            balls[i].top += balls[i].vy;
            if( balls[i].top >= 500-radius ){
                balls[i].top = 500-radius;
                balls[i].vy = - balls[i].vy*0.75;
            }
            context.fillStyle = balls[i].color;
            context.beginPath();
            context.arc(balls[i].left,balls[i].top,radius,0,2*Math.PI);
            context.closePath();
            context.fill();
        }
        console.log(balls.length)
    },50);

};
//    添加小球
var ball = function(left,top){
    var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
    this.vx = Math.pow(-1,Math.ceil(Math.random()*1000))*4;
    this.vy = -10;
    this.g = 1.5+Math.random();
    this.color = colors[ Math.floor( Math.random()*colors.length ) ];
    this.left = left;
    this.top = top;
};
//
var now_time = function(top) {
    this.value = "";
    this.top = top;
    this.left = "";
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
function fill_arc(number,radius,left,top,digit,color,context){
    var x = radius+2;
    var y = radius+2;
    for(var i = 0 ; i < digit[number].length; i++){
        for(var j = 0; j < digit[number][i].length; j++){
            if(digit[number][i][j] == 1){
                context.beginPath();
                context.arc(left+x*(2*j+1),top+y*(2*i+1),radius,0,2*Math.PI);
                context.closePath();
                context.fillStyle = color;
                context.fill();
            }
        }
    }
}