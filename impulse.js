function handleClick(){
    var v0 = (document.getElementById("v0").value)*6000;
    var c1 = (document.getElementById("c1").value)/6000000;
    var c2 = (document.getElementById("c2").value)/1000000;
    var r1 = (document.getElementById("r1").value)*6;
    var r2 = (document.getElementById("r2").value)*6;
    var time = (document.getElementById("time").value)/1000000;
    var to1 = r2*(c2+c1);
    var to2 = r1*((c2*c1)/(c2+c1));

    var t = [];
    for(i=0;i<=time;i=i+0.00000001){
        t.push(i);
    }

    var v = [];
    for(j=0;j<=time;j=j+0.00000001){
        var volt = ((v0 / (r1 * c2)) * ((to1 * to2) / (to1 - to2))) * ((math.exp((-1*j)/to1)) - (math.exp((-1*j)/to2)));
        v.push(volt);
    }

    var vmax = math.max(v);
    var vmaxindex = v.indexOf(vmax);
    var tp = t[vmaxindex];
    var vmax03 = vmax*0.3;
    var vmax05 = vmax*0.5;
    var vmax09 = vmax*0.9;
    var efficiency = math.round(((vmax/v0)*100),2);
    //----------- t03 calculation---------------

    var arr = v;
    var sliced = arr.slice(0,vmaxindex);
    var smallerthanv03 = sliced.filter(myfunction);

    function myfunction(value){
        return value <= vmax03
    }

    var closest03 = math.max(smallerthanv03);
    var closest03index = v.indexOf(closest03);
    var t03 = t[closest03index];

    //----------- t09 calculation ---------------

    var arr2 = v;
    var sliced2 = arr2.slice(0,vmaxindex);
    var smallerthanv09 = sliced2.filter(myfunction2);

    function myfunction2(value){
        return value <= vmax09
    }

    var closest09 = math.max(smallerthanv09);
    var closest09index = v.indexOf(closest09);
    var t09 = t[closest09index];
    var tf = ((t09-t03)*1.67);

    // ------------- t05 time calculation -----------------

    var arr3 = v;
    var sliced3 = arr3.slice(vmaxindex,-1);
    var smallerthanv05 = sliced3.filter(myfunction3);

    function myfunction3(value){
        return value <= vmax05
    }

    var closest05 = math.max(smallerthanv05);
    var closest05index = v.indexOf(closest05);
    var t05 = t[closest05index];

    // ---------- graph -------------

        v = v.map(conversion);
        t = t.map(conversion2);
        function conversion2(value){return value*1000000};
        function conversion(value){return value/1000};

        trace = {
            x: t,
            y: v
        };
        data = [trace];
        layout = {
            showlegend: false,
            title: "V<sub>0</sub> = " + v0/6000 +" kV,   " + "C<b>'</b><sub>1</sub> = " +  math.round((c1*6000000),2) + " µF,   "+ "C<sub>2</sub> = " +  c2*1000000 + " µF,   " + "R<b>'</b><sub>1</sub> = " + r1/6 + " Ω,   " + "R<b>'</b><sub>2</sub> = " + r2/6 + " Ω" + "   η = " + efficiency + " %",
            xaxis:{
                title: "time [µs]"
            },
            yaxis: {
                title: "voltage [kV]"
            }
        };

        config = {
            displaylogo: false,
            scrollZoom: true
        };

        graph_voltage = document.getElementById('graph_voltage');
        Plotly.newPlot("graph_voltage",data,layout,config);

        function displaygraph(){
            var graph = document.getElementById("graph_voltage");
            graph.style.display = "block";
        }
        displaygraph();

        function displaytimecss (){
            var x2 = document.getElementById("vmaxprint");
            var x = document.getElementById("fronttimeprint");
            var x1 = document.getElementById("tailtimeprint");
            var x3 = document.getElementById("timetopeakprint");
            x2.style.display = "inline";
            x.style.display = "inline";
            x1.style.display = "inline";
            x3.style.display = "inline";
        }
        setTimeout(displaytimecss(),300);

        document.getElementById("vmaxprint").innerHTML=("Vmax: " +(math.round((vmax/1000),4)) + " kV");
        document.getElementById("fronttimeprint").innerHTML=("Front time: " +(math.round((tf*1000000),4)) + " µs");
        document.getElementById("tailtimeprint").innerHTML=("Tail time: " +(math.round((t05*1000000),4)) + " µs");
        document.getElementById("timetopeakprint").innerHTML=("Time to peak: " +(math.round((tp*1000000),4)) + " µs");
    }

