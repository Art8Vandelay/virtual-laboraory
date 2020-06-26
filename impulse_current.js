function handle_click(){
    var v0_current = (document.getElementById("v0_current").value)*1000;
    var c_current = (document.getElementById("c_current").value)/1000000;
    var rf_current = (document.getElementById("rf_current").value);
    // var r1_current = (document.getElementById("r1_current").value);
    var lf_current = (document.getElementById("lf_current").value)/1000000;
    // var l1_current = (document.getElementById("l1_current").value)/1000000;
    var time_current = (document.getElementById("time_current").value)/1000000;
    var r_total = Number(rf_current);
    var l_total = Number(lf_current);
    var delta = ((r_total)/(2*l_total));
    var l_and_c = 1/(l_total*c_current);
    var wd = math.sqrt(l_and_c - (delta*delta));

    var t =[];
    for(i=0;i<=time_current;i=i+0.00000001){
        t.push(i);
    }
    

    var i =[];
    var i_s=[];
    for(j=0;j<=time_current;j=j+0.00000001){
        var a = math.multiply(wd,l_total);
        var b = math.divide(v0_current,a);  
        var c = math.multiply(-j,delta);
        var d = math.exp(c);                
        var e = math.multiply(wd,j);
        var f = math.sin(e);                
        var amper  = math.multiply(b,d,f);
        i.push(amper);
           
    }
    
     i.forEach(funkk);
     function funkk(value){
         if (typeof(value) !== "object") {
            i_s.push(value);
         }else{ 
             value = value.toPolar();
             value = value.r;
             i_s.push(value);
         }
        
     }

    

    var imax = math.max(i_s);
    var imaxindex = i_s.indexOf(imax);
    var tp = t[imaxindex];
    var imax01 = imax*0.1;
    var imax05 = imax*0.5;
    var imax09 = imax*0.9;

    var arr = i_s;
    var sliced = arr.slice(0,imaxindex);
    var smallerthani01 = sliced.filter(myfunction);

    function myfunction(value){
        return value <= imax01
    }

    var closest01 = math.max(smallerthani01);
    var closest01index = i_s.indexOf(closest01);
    var t01 = t[closest01index];

    
    var arr2 = i_s;
    var sliced2 = arr2.slice(0,imaxindex);
    var smallerthani09 = sliced2.filter(myfunction2);

    function myfunction2(value){
        return value <= imax09
    }

    var closest09 = math.max(smallerthani09);
    var closest09index = i_s.indexOf(closest09);
    var t09 = t[closest09index];
    var tf = ((t09-t01)*1.25);

    var arr3 = i_s;
    var sliced3 = arr3.slice(imaxindex,-1);
    var smallerthani05 = sliced3.filter(myfunction3);

    function myfunction3(value){
        return value <= imax05
    }

    var closest05 = math.max(smallerthani05);
    var closest05index = i_s.indexOf(closest05);
    var t05 = t[closest05index];






    // the graph  //

    t = t.map(conversion_current);
    i_s = i.map(conversion_current2);
    function conversion_current(value){return value*1000000};
    function conversion_current2(value){return value/1000};

    trace = {
        x: t,
        y: i_s
    };
    data = [trace];
    layout = {
        showlegend: false,
        title: "V<sub>0</sub> = " + v0_current/1000 +" kV,   " + "C<sub>total</sub> = " +  math.round((c_current*1000000),2) + " µF,   " + "R<sub>total</sub> = " + rf_current + " Ω,   " + "L<sub>total</sub> = " +  math.round((lf_current*1000000),3) + " µF",
        xaxis:{
            title: "time [µs]"
        },
        yaxis: {
            title: "current [kA]"
        }
    };

    config = {
        displaylogo: false,
        scrollZoom: false
    };

    graph_current = document.getElementById('graph_current');
    Plotly.newPlot("graph_current",data,layout,config);


    function displaygraph(){
        var graph = document.getElementById("graph_current");
        graph.style.display = "block";
    }
    displaygraph();

    //   ----   //

    function displaytimecss (){
        var x = document.getElementById("ifronttimeprint");
        var x1 = document.getElementById("itailtimeprint");
        var x2 = document.getElementById("imaxprint");
        var x3 = document.getElementById("itimetopeakprint");
        x.style.display = "inline";
        x1.style.display= "inline";
        x2.style.display= "inline";
        x3.style.display= "inline";
    }
    setTimeout(displaytimecss(),300);

    document.getElementById("ifronttimeprint").innerHTML=("Front time: " +(math.round((tf*1000000),4)) + " µs");
    document.getElementById("itailtimeprint").innerHTML=("Tail time: " +(math.round((t05*1000000),4)) + " µs");
    document.getElementById("imaxprint").innerHTML=("Imax: " +(math.round((imax/1000),4)) + " kA");
    document.getElementById("itimetopeakprint").innerHTML=("Time to peak: " +(math.round((tp*1000000),4)) + " µs");
}

