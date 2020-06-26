function handleclick(){
    var f = (document.getElementById("f").value);
    var r = (document.getElementById("textboxr").value);
    var l = (document.getElementById("textboxl").value);
    var cConductor = (document.getElementById("c").value)/1000000;
    var pr = (document.getElementById("pr").value)*1000000;
    var vr = (document.getElementById("vr").value)*1000;
    var cosfi = (document.getElementById("cosfi").value);
    var length = (document.getElementById("length").value);
    var rTotal = r*length;
    var lTotal = (2*(math.pi)*f*l*(1/1000)*length);
    var z = math.complex(rTotal,lTotal);
    var y = (2*(math.pi)*f*cConductor*length);
    
    // ------Short Line Model------- 

    var vrln = vr/(math.sqrt(3));
    var vrlnAngle = 0;
    var vrrect = math.complex(vrln,0);
    var IrMag = pr /(3 * vrln * cosfi);
    var IrAngle = -((math.acos(cosfi)/(math.pi)) * 180);


    var IrRect = math.Complex.fromPolar(IrMag,(-(math.acos(cosfi))));
    var zı = math.multiply(z,IrRect);
    var vsln = math.add(vrln,zı);
    var vslnpolar = vsln.toPolar();
    var vslnpolarMag = vslnpolar.r;
    var vslnAngle = (((vslnpolar.phi)/(math.pi))*180);
    var vsll = ((math.sqrt(3)) * vslnpolarMag);

    var VR_short = ((vslnpolarMag-vrln)/vrln)*100;

    var SsMag = 3 * vslnpolarMag * IrMag;
    var SsAngle = vslnAngle + (-IrAngle);
    var SsRect = math.Complex.fromPolar(SsMag,(((math.pi)*SsAngle)/180));
    var Ps = (SsRect.re);
    var Qs = (SsRect.im);

    var eff_short = (pr/Ps)*100;

    // ------ Medium Line Model ------

    var yrect = math.complex(0,y);
    var yz = math.multiply(z,yrect);
    var yzdiv2 = math.divide(yz,2);

    var a = math.add(yzdiv2,1)
    var a_polar = a.toPolar();
    var a_polar_amp = a_polar.r;

    var b = z;

    var yzdiv4 = math.divide(yzdiv2,2);
    var yzdiv4added1 = math.add(yzdiv4,1);

    var c = math.multiply(yzdiv4added1,yrect);

    var d = a;

    var avrrect = math.multiply(a,vrrect);
    var bIrRect = math.multiply(b,IrRect);
    var vslnmedium = math.add(avrrect,bIrRect);
    var vslnmediumpolar = vslnmedium.toPolar();
    var vslnmediumamp = vslnmediumpolar.r;
    var vslnmediumangle = (((vslnmediumpolar.phi)/(math.pi))*180);
    var vsllmedium = ((math.sqrt(3)) * vslnmediumamp);

    var Vr_noload_medium = (vslnmediumamp/a_polar_amp);
    var VR_medium = ((Vr_noload_medium - vrln)/vrln)*100;

    var cvrrect = math.multiply(c,vrrect);
    var dIrRect = math.multiply(d,IrRect);
    var ismedium = math.add(cvrrect,dIrRect);
    var ismediumpolar = ismedium.toPolar();
    var ismediumpolaramp = ismediumpolar.r;
    var ismediumpolarangle = (((ismediumpolar.phi)/(math.pi))*180);

    var SsmediumMag = (3 * vslnmediumamp * ismediumpolaramp);
    var SsmediumAngle = (vslnmediumangle - ismediumpolarangle);
    var SsmediumRect = math.Complex.fromPolar(SsmediumMag,(((math.pi)*SsmediumAngle)/180));
    var Psmedium = SsmediumRect.re;
    var Qsmedium = SsmediumRect.im;

    var eff_medium = (pr/Psmedium)*100;

    // ------ Long Line Model --------

    var yzdiv6 = math.divide(yz,6);
    var yzdiv6added1 = math.add(yzdiv6,1);
    var blong = math.multiply(z,yzdiv6added1);
    var clong = math.multiply(yzdiv6added1,yrect);

    var blongIrRect = math.multiply(blong,IrRect);

    var vslnlong = math.add(avrrect,blongIrRect);

    var vslnlongpolar = vslnlong.toPolar();
    var vslnlongamp = vslnlongpolar.r;
    var vslnlongangle = (((vslnlongpolar.phi)/(math.pi))*180);
    var vslllong = ((math.sqrt(3)) * vslnlongamp);

    var Vr_noload_long = (vslnlongamp/a_polar_amp);
    var VR_long = ((Vr_noload_long - vrln)/vrln)*100;

    var clongvrrect = math.multiply(clong,vrrect);
    var dIrRect = math.multiply(d,IrRect);
    var islong = math.add(clongvrrect,dIrRect);
    var islongpolar = islong.toPolar();
    var islongpolaramp = islongpolar.r;
    var islongpolarangle = (((islongpolar.phi)/(math.pi))*180);

    var SslongMag = (3 * vslnlongamp * islongpolaramp);
    var SslongAngle = (vslnlongangle - islongpolarangle);
    var SslongRect = math.Complex.fromPolar(SslongMag,(((math.pi)*SslongAngle)/180));
    var Pslong = SslongRect.re;
    var Qslong = SslongRect.im;

    var eff_long = (pr/Pslong)*100;

    document.getElementById("h4_1").innerHTML =String(math.round(IrMag,2)) + "∟"+ String(math.round(IrAngle,2))+"°" + " A";
    document.getElementById("h4_2").innerHTML =String(math.round(IrMag,2)) + "∟"+ String(math.round(IrAngle,2))+"°" + " A";
    document.getElementById("h4_3").innerHTML =String(math.round((vslnpolarMag/1000),2)) + "∟"+ String(math.round(vslnAngle,2))+"°" + " kV";
    document.getElementById("h4_4").innerHTML =String(math.round((vsll/1000),2)) + " kV";
    document.getElementById("h4_5").innerHTML =String(math.round((SsMag/1000000),2)) + " MVA";
    document.getElementById("h4_6").innerHTML =String(math.round((Ps/1000000),2)) + " MW";
    document.getElementById("h4_7").innerHTML =String(math.round((Qs/1000000),2)) + " MVAr";

    document.getElementById("h4_8").innerHTML =String(math.round(IrMag,2)) + "∟"+ String(math.round(IrAngle,2))+"°" + " A";
    document.getElementById("h4_9").innerHTML =String(math.round(ismediumpolaramp,2)) + "∟"+ String(math.round(ismediumpolarangle,2))+"°" + " A";
    document.getElementById("h4_10").innerHTML =String(math.round((vslnmediumamp/1000),2))+"∟"+ String(math.round(vslnmediumangle,2))+"°" + " kV";
    document.getElementById("h4_11").innerHTML =String(math.round((vsllmedium/1000),2))+ " kV";
    document.getElementById("h4_12").innerHTML =String(math.round((SsmediumMag/1000000),2)) + " MVA";
    document.getElementById("h4_13").innerHTML =String(math.round((Psmedium/1000000),2)) + " MW";
    document.getElementById("h4_14").innerHTML =String(math.round((Qsmedium/1000000),2)) + " MVAr";

    document.getElementById("h4_15").innerHTML =String(math.round(IrMag,2)) + "∟"+ String(math.round(IrAngle,2))+"°" + " A";
    document.getElementById("h4_16").innerHTML =String(math.round(islongpolaramp,2)) + "∟"+ String(math.round(islongpolarangle,2))+"°" + " A";
    document.getElementById("h4_17").innerHTML =String(math.round((vslnlongamp /1000),2))+ "∟"+ String(math.round(vslnlongangle,2))+"°" + " kV";
    document.getElementById("h4_18").innerHTML =String(math.round((vslllong/1000),2))+"°" + " kV";
    document.getElementById("h4_19").innerHTML =String(math.round((SslongMag/1000000),2)) + " MVA";
    document.getElementById("h4_20").innerHTML =String(math.round((Pslong/1000000),2)) + " MW";
    document.getElementById("h4_21").innerHTML =String(math.round((Qslong/1000000),2)) + " MVAr";

    document.getElementById("h4_22").innerHTML =String(math.round(VR_short,2)) + " %";
    document.getElementById("h4_23").innerHTML =String(math.round(eff_short,2)) + " %";
    document.getElementById("h4_24").innerHTML =String(math.round(VR_medium,2)) + " %";
    document.getElementById("h4_25").innerHTML =String(math.round(eff_medium,2)) + " %";
    document.getElementById("h4_26").innerHTML =String(math.round(VR_long,2)) + " %";
    document.getElementById("h4_27").innerHTML =String(math.round(eff_long,2)) + " %";
    }

function lockranges(){
	document.getElementById("f").disabled=true;
	document.getElementById("r").disabled=true;
	document.getElementById("textboxr").disabled=true;
	document.getElementById("l").disabled=true;
	document.getElementById("textboxl").disabled=true;
	document.getElementById("c").disabled=true;
	document.getElementById("textboxc").disabled=true;
	document.getElementById("pr").disabled=true;
	document.getElementById("textbox4").disabled=true;
	document.getElementById("vr").disabled=true;
	document.getElementById("textbox5").disabled=true;
	document.getElementById("cosfi").disabled=true;
	document.getElementById("textbox7").disabled=true;
	document.getElementById("length").disabled=true;
	document.getElementById("textbox6").disabled=true;
	document.getElementById("textbox1").disabled=true;
}


function change_button_name(){
	document.querySelector('#startbtn').innerHTML="Restart"
	document.querySelector('#startbtn').onclick= function(){
		location.reload(true);
	};
}

function disablebuttons(){
	document.getElementById("compare").disabled=true;
	document.getElementById("graphs").disabled=true;
}

disablebuttons();

function enablecompare(){
    document.getElementById("compare").disabled=false;
    var x = document.getElementById("compare");
    x.style.backgroundColor = "#e8491d";
}

function enablegraphs(){
    document.getElementById("graphs").disabled=false;
    var x = document.getElementById("graphs");
    x.style.backgroundColor = "#e8491d";
}

function displaymodels(){
    var x = document.getElementById("short_result");
    var x1 = document.getElementById("medium_result");
    var x2 = document.getElementById("long_result");
    x.style.display = "inline";
    x1.style.display = "inline";
    x2.style.display = "inline";
}


function disableg(){
    document.getElementById("g").disabled=true;
    document.getElementById("textboxg").disabled=true;
}

disableg();

function newOne(){

    // değişkenler fonksiyonu

    function declareVariables(){
        f = (document.getElementById("f").value);
        r = (document.getElementById("textboxr").value);
        l = (document.getElementById("textboxl").value);
        cConductor = (document.getElementById("c").value)/1000000;
        pr = (document.getElementById("pr").value)*1000000;
        vr = (document.getElementById("vr").value)*1000;
        cosfi = (document.getElementById("cosfi").value);
        length = (document.getElementById("length").value);
        rTotal = r*length;
        lTotal = (2*(math.pi)*f*l*(1/1000)*length);
        z = math.complex(rTotal,lTotal);
        y = (2*(math.pi)*f*cConductor*length);


         // ------Short Line Model------- 

        vrln = vr/(math.sqrt(3));
        vrlnAngle = 0;
        vrrect = math.complex(vrln,0);
        IrMag = pr /(3 * vrln * cosfi);
        IrAngle = -((math.acos(cosfi)/(math.pi)) * 180);
    
    
        IrRect = math.Complex.fromPolar(IrMag,(-(math.acos(cosfi))));
        zı = math.multiply(z,IrRect);
        vsln = math.add(vrln,zı);
        vslnpolar = vsln.toPolar();
        vslnpolarMag = vslnpolar.r;
        vslnAngle = (((vslnpolar.phi)/(math.pi))*180);
        vsll = ((math.sqrt(3)) * vslnpolarMag);
    
        SsMag = 3 * vslnpolarMag * IrMag;
        SsAngle = vslnAngle + (-IrAngle);
        SsRect = math.Complex.fromPolar(SsMag,(((math.pi)*SsAngle)/180));
        Ps = (SsRect.re);
        Qs = (SsRect.im);
    
        // ------ Medium Line Model ------
    
        yrect = math.complex(0,y);
        yz = math.multiply(z,yrect);
        yzdiv2 = math.divide(yz,2);
    
        a = math.add(yzdiv2,1)
    
        b = z;
    
        yzdiv4 = math.divide(yzdiv2,2);
        yzdiv4added1 = math.add(yzdiv4,1);
    
        c = math.multiply(yzdiv4added1,yrect);
    
        d = a;
    
        avrrect = math.multiply(a,vrrect);
        bIrRect = math.multiply(b,IrRect);
        vslnmedium = math.add(avrrect,bIrRect);
        vslnmediumpolar = vslnmedium.toPolar();
        vslnmediumamp = vslnmediumpolar.r;
        vslnmediumangle = (((vslnmediumpolar.phi)/(math.pi))*180);
        vsllmedium = ((math.sqrt(3)) * vslnmediumamp);
    
    
        cvrrect = math.multiply(c,vrrect);
        dIrRect = math.multiply(d,IrRect);
        ismedium = math.add(cvrrect,dIrRect);
        ismediumpolar = ismedium.toPolar();
        ismediumpolaramp = ismediumpolar.r;
        ismediumpolarangle = (((ismediumpolar.phi)/(math.pi))*180);
    
        SsmediumMag = (3 * vslnmediumamp * ismediumpolaramp);
        SsmediumAngle = (vslnmediumangle - ismediumpolarangle);
        SsmediumRect = math.Complex.fromPolar(SsmediumMag,(((math.pi)*SsmediumAngle)/180));
        Psmedium = SsmediumRect.re;
        Qsmedium = SsmediumRect.im;
    
        // ------ Long Line Model --------
    
        yzdiv6 = math.divide(yz,6);
        yzdiv6added1 = math.add(yzdiv6,1);
        blong = math.multiply(z,yzdiv6added1);
        clong = math.multiply(yzdiv6added1,yrect);
    
        blongIrRect = math.multiply(blong,IrRect);
    
        vslnlong = math.add(avrrect,blongIrRect);
    
        vslnlongpolar = vslnlong.toPolar();
        vslnlongamp = vslnlongpolar.r;
        vslnlongangle = (((vslnlongpolar.phi)/(math.pi))*180);
        vslllong = ((math.sqrt(3)) * vslnlongamp);
    
        clongvrrect = math.multiply(clong,vrrect);
        dIrRect = math.multiply(d,IrRect);
        islong = math.add(clongvrrect,dIrRect);
        islongpolar = islong.toPolar();
        islongpolaramp = islongpolar.r;
        islongpolarangle = (((islongpolar.phi)/(math.pi))*180);
    
        SslongMag = (3 * vslnlongamp * islongpolaramp);
        SslongAngle = (vslnlongangle - islongpolarangle);
        SslongRect = math.Complex.fromPolar(SslongMag,(((math.pi)*SslongAngle)/180));
        Pslong = SslongRect.re;
        Qslong = SslongRect.im;

    }

    declareVariables();
    short_line_ll_voltage =[];
    medium_line_ll_voltage =[];
    long_line_ll_voltage =[];
    short_line_Is = [];
    medium_line_Is = [];
    long_line_Is = [];
    Ss_short = [];
    Ss_medium = [];
    Ss_long = [];
    Qs_short = [];
    Qs_medium = [];
    Qs_long = [];
    Ps_short = [];
    Ps_medium = [];
    Ps_long = [];
    x_axis_length =[];

    // x ekseni oluşturma döngüsü

    for(j=0;j<=length;j++){
        x_axis_length.push(j);
    }

    // Array oluşturma döngüsü

    for(i =0;i<=length;i++){
        f = (document.getElementById("f").value);
        r = (document.getElementById("textboxr").value);
        l = (document.getElementById("textboxl").value);
        cConductor = (document.getElementById("c").value)/1000000;
        pr = (document.getElementById("pr").value)*1000000;
        vr = (document.getElementById("vr").value)*1000;
        cosfi = (document.getElementById("cosfi").value);
        length = (document.getElementById("length").value);
        rTotal = r*(length -i);
        lTotal = (2*(math.pi)*f*l*(1/1000)*(length -i));
        y= (2*(math.pi)*f*cConductor*(length - i));
        z = math.complex(rTotal,lTotal);


        vrln = vr/(math.sqrt(3));
        vrlnAngle = 0;
        vrrect = math.complex(vrln,0);
        IrMag = pr /(3 * vrln * cosfi);
        IrAngle = -((math.acos(cosfi)/(math.pi)) * 180);
    
    
        IrRect = math.Complex.fromPolar(IrMag,(-(math.acos(cosfi))));
        zı = math.multiply(z,IrRect);
        vsln = math.add(vrln,zı);
        vslnpolar = vsln.toPolar();
        vslnpolarMag = vslnpolar.r;
        vslnAngle = (((vslnpolar.phi)/(math.pi))*180);
        vsll = ((math.sqrt(3)) * vslnpolarMag);
    
        SsMag = 3 * vslnpolarMag * IrMag;
        SsAngle = vslnAngle + (-IrAngle);
        SsRect = math.Complex.fromPolar(SsMag,(((math.pi)*SsAngle)/180));
        Ps = (SsRect.re);
        Qs = (SsRect.im);

        yrect = math.complex(0,y);
        yz = math.multiply(z,yrect);
        yzdiv2 = math.divide(yz,2);
    
        a = math.add(yzdiv2,1)
    
        b = z;
    
        yzdiv4 = math.divide(yzdiv2,2);
        yzdiv4added1 = math.add(yzdiv4,1);
    
        c = math.multiply(yzdiv4added1,yrect);
    
        d = a;
    
        avrrect = math.multiply(a,vrrect);
        bIrRect = math.multiply(b,IrRect);
        vslnmedium = math.add(avrrect,bIrRect);
        vslnmediumpolar = vslnmedium.toPolar();
        vslnmediumamp = vslnmediumpolar.r;
        vslnmediumangle = (((vslnmediumpolar.phi)/(math.pi))*180);
        vsllmedium = ((math.sqrt(3)) * vslnmediumamp);
    
    
        cvrrect = math.multiply(c,vrrect);
        dIrRect = math.multiply(d,IrRect);
        ismedium = math.add(cvrrect,dIrRect);
        ismediumpolar = ismedium.toPolar();
        ismediumpolaramp = ismediumpolar.r;
        ismediumpolarangle = (((ismediumpolar.phi)/(math.pi))*180);
    
        SsmediumMag = (3 * vslnmediumamp * ismediumpolaramp);
        SsmediumAngle = (vslnmediumangle - ismediumpolarangle);
        SsmediumRect = math.Complex.fromPolar(SsmediumMag,(((math.pi)*SsmediumAngle)/180));
        Psmedium = SsmediumRect.re;
        Qsmedium = SsmediumRect.im;
    
        // ------ Long Line Model --------
    
        yzdiv6 = math.divide(yz,6);
        yzdiv6added1 = math.add(yzdiv6,1);
        blong = math.multiply(z,yzdiv6added1);
        clong = math.multiply(yzdiv6added1,yrect);
    
        blongIrRect = math.multiply(blong,IrRect);
    
        vslnlong = math.add(avrrect,blongIrRect);
    
        vslnlongpolar = vslnlong.toPolar();
        vslnlongamp = vslnlongpolar.r;
        vslnlongangle = (((vslnlongpolar.phi)/(math.pi))*180);
        vslllong = ((math.sqrt(3)) * vslnlongamp);
    
        clongvrrect = math.multiply(clong,vrrect);
        dIrRect = math.multiply(d,IrRect);
        islong = math.add(clongvrrect,dIrRect);
        islongpolar = islong.toPolar();
        islongpolaramp = islongpolar.r;
        islongpolarangle = (((islongpolar.phi)/(math.pi))*180);
    
        SslongMag = (3 * vslnlongamp * islongpolaramp);
        SslongAngle = (vslnlongangle - islongpolarangle);
        SslongRect = math.Complex.fromPolar(SslongMag,(((math.pi)*SslongAngle)/180));
        Pslong = SslongRect.re;
        Qslong = SslongRect.im;

        short_line_ll_voltage.push(vsll);
        medium_line_ll_voltage.push(vsllmedium);
        long_line_ll_voltage.push(vslllong);
        short_line_Is.push(IrMag);
        medium_line_Is.push(ismediumpolaramp);
        long_line_Is.push(islongpolaramp);
        Ss_short.push(SsMag);
        Ss_medium.push(SsmediumMag);
        Ss_long.push(SslongMag);
        Qs_short.push(Qs);
        Qs_medium.push(Qsmedium);
        Qs_long.push(Qslong);
        Ps_short.push(Ps);
        Ps_medium.push(Psmedium);
        Ps_long.push(Pslong);
    }

    short_line_ll_voltage = short_line_ll_voltage.map(myFunction);
    medium_line_ll_voltage = medium_line_ll_voltage.map(myFunction);
    long_line_ll_voltage = long_line_ll_voltage.map(myFunction);
    Ss_short = Ss_short.map(myFunction2);
    Ss_medium = Ss_medium.map(myFunction2);
    Ss_long = Ss_long.map(myFunction2);
    Qs_short = Qs_short.map(myFunction2);
    Qs_medium = Qs_medium.map(myFunction2);
    Qs_long = Qs_long.map(myFunction2);
    Ps_short = Ps_short.map(myFunction2);
    Ps_medium = Ps_medium.map(myFunction2);
    Ps_long = Ps_long.map(myFunction2);
    function myFunction2(value){
        return value/1000000;
    }
    function myFunction(value){
        return value/1000;
    }

    trace1 = {
        x: x_axis_length,
        y: short_line_ll_voltage,
        name: "short line model"
    };
    trace2 = {
        x: x_axis_length,
        y: medium_line_ll_voltage,
        name: "medium line model"
    };
    trace3 = {
        x: x_axis_length,
        y: long_line_ll_voltage,
        name: "long line model"
    };

    trace4 = {
        x: x_axis_length,
        y: short_line_Is,
        name: "short line model"
    }
    trace5 = {
        x: x_axis_length,
        y: medium_line_Is,
        name: "medium line model"
    }
    trace6 = {
        x: x_axis_length,
        y: long_line_Is,
        name: "long line model"
    }


    trace7 = {
        x: x_axis_length,
        y: Ss_short,
        name: "short line model"
    }
    trace8 = {
        x: x_axis_length,
        y: Ss_medium,
        name: "medium line model"
    }
    trace9 = {
        x: x_axis_length,
        y: Ss_long,
        name: "long line model"
    }

    trace10 = {
        x: x_axis_length,
        y: Qs_short,
        name: "short line model"
    }
    trace11 = {
        x: x_axis_length,
        y: Qs_medium,
        name: "medium line model"
    }
    trace12 = {
        x: x_axis_length,
        y: Qs_long,
        name: "long line model"
    }


    trace13 = {
        x: x_axis_length,
        y: Ps_short,
        name: "short line model"
    }
    trace14 = {
        x: x_axis_length,
        y: Ps_medium,
        name: "medium line model"
    }
    trace15 = {
        x: x_axis_length,
        y: Ps_long,
        name: "long line model"
    }

    data = [trace1,trace2,trace3];
    data2 = [trace4,trace5,trace6];
    data3 = [trace7,trace8,trace9];
    data4 = [trace10,trace11,trace12];
    data5 = [trace13,trace14,trace15];

    layout = {
        showlegend: true,
        title: " ",
        xaxis:{
            title: "distance from the sending end [km]"
        },
        yaxis: {
            title: "voltage [kV]"
        }
    };

    layout2 = {
        showlegend: true,
        title: " ",
        xaxis:{
            title: "distance from the sending end [km]"
        },
        yaxis: {
            title: "current [A]"
        }
    };
    layout3 = {
        showlegend: true,
        title: " ",
        xaxis:{
            title: "distance from the sending end [km]"
        },
        yaxis: {
            title: "apparent power [MVA]"
        }
    };
    layout4 = {
        showlegend: true,
        title: " ",
        xaxis:{
            title: "distance from the sending end [km]"
        },
        yaxis: {
            title: "reactive power [MVAr]"
        }
    };
    layout5 = {
        showlegend: true,
        title: " ",
        xaxis:{
            title: "distance from the sending end [km]"
        },
        yaxis: {
            title: "active power [MW]"
        }
    };

    config = {
        displaylogo: false,
        //scrollZoom: true,
        //modeBarButtonsToRemove: []
    };

    graph = document.getElementById('transmission_voltage_graph');
    graph2 = document.getElementById('transmission_current_graph');
    graph3 = document.getElementById('transmission_Ss_graph');
    graph4 = document.getElementById('transmission_Qs_graph');
    graph5 = document.getElementById('transmission_Ps_graph');
    Plotly.newPlot(graph,data,layout,config);
    Plotly.newPlot(graph2,data2,layout2,config);
    Plotly.newPlot(graph3,data3,layout3,config);
    Plotly.newPlot(graph4,data4,layout4,config);
    Plotly.newPlot(graph5,data5,layout5,config);

    function displaygraph(){
    var vsll_graphs = document.getElementById("transmission_voltage_graph");
    vsll_graphs.style.display = "block";
    var Is_graphs = document.getElementById("transmission_current_graph");
    Is_graphs.style.display = "block";
    var Ss_graphs = document.getElementById("transmission_Ss_graph");
    Ss_graphs.style.display = "block";
    var Qs_graphs = document.getElementById("transmission_Qs_graph");
    Qs_graphs.style.display = "block";
    var Ps_graphs = document.getElementById("transmission_Ps_graph");
    Ps_graphs.style.display = "block";
    }
    displaygraph();
}

