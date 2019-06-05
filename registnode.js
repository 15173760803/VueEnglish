var express=require("express");
var app=express();
var mysql=require("mysql");


app.get("/registjs",function(req,res){//(接收,响应)

    //解决跨域问题
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    //得到注册页面发送的数据;
    var getRegisttell=req.query.tellOne;
    var getRegistemail=req.query.emailOne;
    var getRegistname=req.query.nameOne;
    var getRegistpwd=req.query.pwdOne;
    var getRegistrpw=req.query.rpwOne;
    var getRegistday=req.query.dayOne;
    console.log(getRegisttell+"--"+getRegistemail+"--"+getRegistname+"--"+getRegistpwd+"--"+getRegistrpw+"--"+getRegistday);

   //创建数据库链接信息;
    var conn=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    //连接
    conn.connect();
    //写sql对数据库进行操作;
    var registdata="INSERT INTO registtable (phonenumber,email,uname,upassword,rpassword,ubirthday) VALUES ("+getRegisttell+",'"+getRegistemail+"','"+getRegistname+"','"+getRegistpwd+"','"+getRegistrpw+"','"+getRegistday+"');";
    conn.query(registdata,function(error,ok){
        if(error){
            console.log(error);
            return;
        }
        res.send("2");
    })
    conn.end();
})

app.get("/selectjs1",function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var getSlecttell=req.query.selecttell;
    console.log(getSlecttell);
    //创建数据库链接信息;
    var conn2=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    //连接
    conn2.connect();
    //对数据库操作(选择对比)
    var selectdata1="SELECT phonenumber FROM registtable WHERE (phonenumber='"+getSlecttell+"');"
    conn2.query(selectdata1,function(err,okk){
     if(err){
       console.log(err);
         return;
     }
        if(okk.length==0){
            res.send("0");
        }else{
            res.send("1");

        }
    })
    conn2.end();

})


app.get("/selectjs2",function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var getSlectemail=req.query.selectemail;
    console.log(getSlectemail);
    //创建数据库链接信息;
    var conn3=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    //连接
    conn3.connect();
    //对数据库操作(选择对比)
    var selectdata2="SELECT email FROM registtable WHERE (email='"+getSlectemail+"');"
    conn3.query(selectdata2,function(err2,okk2){
        if(err2){
            console.log(err2);
            return;
        }
        if(okk2.length==0){
            res.send("0");
        }else{
            res.send("1");
            return ;
        }
    })
    conn3.end();

})

//post请求
//引用body-parser模块
var bodyParser=require("body-parser");
//初始化解析功能
var bodydemo=bodyParser.urlencoded({extended:false});
app.post("/loginjs",bodydemo,function(req,res){
    //解决跨域
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    //接收前台发送的数据
    var receiveTell=req.body.loginT;
    var receivePwd=req.body.loginP;
    console.log(receiveTell+"------"+receivePwd);
    //创建数据库链接
    var conn4=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    //链接
    conn4.connect();
    //对数据库操作语句
    var loginselect="SELECT phonenumber,upassword FROM registtable WHERE phonenumber='"+receiveTell+"' AND upassword='"+receivePwd+"';";
    //执行
    conn4.query(loginselect,function(err4,ok4){
        if(err4){
            console.log(err4);
            return;
        }
        if(ok4.length==0){
            res.send("0");
        }else{
            res.send("1");
        }
    })
})




//post请求
//引用body-parser模块
var bodyParser2=require("body-parser");
//初始化解析功能
var bodydemo2=bodyParser2.urlencoded({extended:false});
app.post("/changxiaoshowjs",bodydemo2,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var conn5=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn5.connect();
    var changxiao="SELECT  srcc,tittlee,pirce,id FROM sumimg WHERE NAME='畅销书';";
    conn5.query(changxiao,function(errcx,okcx){
        if(errcx){
            console.log(errcx);
            return;
        }
        res.send(okcx);
    })
    conn5.end();
})

//post请求
//引用body-parser模块
var bodyParser3=require("body-parser");
//初始化解析功能
var bodydemo3=bodyParser3.urlencoded({extended:false});
app.post("/jingpinshowjs",bodydemo3,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var conn6=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn6.connect();
    var jingpin="SELECT  srcc,tittlee,pirce,id FROM sumimg WHERE NAME='精品';";
    conn6.query(jingpin,function(errjp,okjp){
        if(errjp){
            console.log(errjp);
            return;
        }
        res.send(okjp);
    })
    conn6.end();
})


var bodyParser4=require("body-parser");
//初始化解析功能
var bodydemo4=bodyParser4.urlencoded({extended:false});
app.post("/quanbujs",bodydemo4,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var conn7=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn7.connect();
    var quanbu="SELECT  srcc,tittlee,pirce,id FROM sumimg ;";
    conn7.query(quanbu,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);
    })
    conn7.end();
})


//幼儿
var bodyParser5=require("body-parser");
//初始化解析功能
var bodydemo5=bodyParser5.urlencoded({extended:false});
app.post("/youerjs",bodydemo5,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var conn8=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn8.connect();
    var youer="SELECT  srcc,tittlee,pirce,id FROM sumimg WHERE NAME='幼儿英语';";
    conn8.query(youer,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);
    })
    conn8.end();
})
//小学初中
var bodyParser6=require("body-parser");
//初始化解析功能
var bodydemo6=bodyParser6.urlencoded({extended:false});
app.post("/xiaoxuejs",bodydemo6,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var conn9=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn9.connect();
    var xiaoxue="SELECT  srcc,tittlee,pirce,id FROM sumimg WHERE NAME='小学初中英语';";
    conn9.query(xiaoxue,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);
    })
    conn9.end();
})


//高中
var bodyParser7=require("body-parser");
//初始化解析功能
var bodydemo7=bodyParser7.urlencoded({extended:false});
app.post("/gaozhongjs",bodydemo7,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var conn10=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn10.connect();
    var gaozhong="SELECT  srcc,tittlee,pirce,id FROM sumimg WHERE NAME='高中';";
    conn10.query(gaozhong,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);
    })
    conn10.end();
})
//四六级
var bodyParser8=require("body-parser");
//初始化解析功能
var bodydemo8=bodyParser8.urlencoded({extended:false});
app.post("/siliujs",bodydemo8,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var conn12=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn12.connect();
    var siliu="SELECT  srcc,tittlee,pirce,id FROM sumimg WHERE NAME='四级六级';";
    conn12.query(siliu,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);
    })
    conn12.end();
})

//考研
var bodyParser9=require("body-parser");
//初始化解析功能
var bodydemo9=bodyParser9.urlencoded({extended:false});
app.post("/kaoyanjs",bodydemo9,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var conn13=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn13.connect();
    var kaoyan="SELECT  srcc,tittlee,pirce,id FROM sumimg WHERE NAME='考研';";
    conn13.query(kaoyan,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);
    })
    conn13.end();

})
//雅思
var bodyParser10=require("body-parser");
//初始化解析功能
var bodydemo10=bodyParser10.urlencoded({extended:false});
app.post("/yasijs",bodydemo10,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var conn14=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn14.connect();
    var yasi="SELECT  srcc,tittlee,pirce,id FROM sumimg WHERE NAME='雅思托福';";
    conn14.query(yasi,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);
    })
    conn14.end();

})
//课外
var bodyParser11=require("body-parser");
//初始化解析功能
var bodydemo11=bodyParser11.urlencoded({extended:false});
app.post("/kewaijs",bodydemo11,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');

    var conn15=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn15.connect();
    var kewai="SELECT  srcc,tittlee,pirce,id FROM sumimg WHERE NAME='课外';";
    conn15.query(kewai,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);
    })
    conn15.end();

})
//商品详情
//选择id
var bodyParser12=require("body-parser");
//初始化解析功能
var bodydemo12=bodyParser12.urlencoded({extended:false});
app.post("/xiangqingjs",bodydemo12,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    var demoid2=req.body.demoid;
        console.log(demoid2);
    var conn16=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn16.connect();
    var xiangq="SELECT  name,srcc,pirce,details,tittlee,id FROM sumimg WHERE id="+demoid2;
        conn16.query(xiangq,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);
    })
    conn16.end();

})


//加入购物车
var bodyParser13=require("body-parser");
//初始化解析功能
var bodydemo13=bodyParser13.urlencoded({extended:false});
app.post("/car1js",bodydemo13,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    //var demoid2=req.body.demoid;
    var shopphone2=req.body.userphone;
    var shopid2=req.body.shopid;
    var shopname2=req.body.shopname;
    var shoppirce2=req.body.shoppirce;
    var shopsrc2=req.body.shopsrc;
    var shoptittlee2=req.body.shoptittlee;
    var shopdetails2=req.body.shopdetails;
    console.log(shopphone2+"--"+shopid2+"--"+shopname2+"--"+shoppirce2+"--"+shopsrc2+"--"+shoptittlee2+"--"+shopdetails2);
    var  conn17=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn17.connect();
    var car1="insert into usershop (userphone,shopid,shopname,shoppirce,shopsrc,shoptittlee,details) values ('"+shopphone2+"',"+shopid2+",'"+shopname2+"',"+shoppirce2+",'"+shopsrc2+"','"+shoptittlee2+"','"+shopdetails2+"');";
    conn17.query(car1,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        if(okqp.length==0){
            res.send("0");
        }else{
            res.send("1");
        }

    })
    conn17.end();

})

//购物车
var bodyParser14=require("body-parser");
//初始化解析功能
var bodydemo14=bodyParser14.urlencoded({extended:false});
app.post("/car2js",bodydemo14,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
     var phone=req.body.uesrphone;
      console.log(phone);
    var  conn18=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn18.connect();
    var car2="SELECT *FROM usershop WHERE userphone="+phone+";";
    conn18.query(car2,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);

    })
    conn18.end();

})

//删除
var bodyParser15=require("body-parser");
//初始化解析功能
var bodydemo15=bodyParser15.urlencoded({extended:false});
app.post("/shanchujs",bodydemo15,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    var sunx3=req.body.sumx2;
    console.log(sunx3);
    var  conn19=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn19.connect();
    var shanchu="DELETE FROM usershop WHERE sumx="+sunx3;
    conn19.query(shanchu,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);

    })
    conn19.end();

})
//搜索
var bodyParser16=require("body-parser");
//初始化解析功能
var bodydemo16=bodyParser16.urlencoded({extended:false});
app.post("/sousuojs",bodydemo16,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    var name2=req.body.name1;
    console.log(name2);
    var  conn20=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn20.connect();
    var sousuo="SELECT *FROM sumimg WHERE NAME LIKE '%"+name2+"%'";
    conn20.query(sousuo,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
       res.send(okqp);

    })
    conn20.end();

})
//修改密码
var bodyParser17=require("body-parser");
//初始化解析功能
var bodydemo17=bodyParser17.urlencoded({extended:false});
app.post("/xiugaijs",bodydemo17,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    var puta2=req.body.puta1;
    var putb2=req.body.putb1;
    console.log(puta2+"----"+putb2);
    var conn21=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn21.connect();
    var xiugai="UPDATE registtable SET upassword='"+putb2+"' WHERE phonenumber='"+puta2+"';";
    conn21.query(xiugai,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
       if(okqp){
           res.send("1");
       }

    })
    conn21.end();

})
//收藏
var bodyParser18=require("body-parser");
//初始化解析功能
var bodydemo18=bodyParser18.urlencoded({extended:false});
app.post("/shoujs",bodydemo18,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    //var demoid2=req.body.demoid;
    var shopphone2=req.body.userphone;
    var shopid2=req.body.shopid;
    var shopname2=req.body.shopname;
    var shoppirce2=req.body.shoppirce;
    var shopsrc2=req.body.shopsrc;
    var shoptittlee2=req.body.shoptittlee;
    var shopdetails2=req.body.shopdetails;
    console.log(shopphone2+"--"+shopid2+"--"+shopname2+"--"+shoppirce2+"--"+shopsrc2+"--"+shoptittlee2+"--"+shopdetails2);
    var  conn22=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn22.connect();
    var shou1="insert into shou (userphone,shopid,shopname,shoppirce,shopsrc,shoptittlee,details) values ('"+shopphone2+"',"+shopid2+",'"+shopname2+"',"+shoppirce2+",'"+shopsrc2+"','"+shoptittlee2+"','"+shopdetails2+"');";
    conn22.query(shou1,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        if(okqp.length==0){
            res.send("0");
        }else{
            res.send("1");
        }

    })
    conn22.end();

})


//收藏夹
var bodyParser19=require("body-parser");
//初始化解析功能
var bodydemo19=bodyParser19.urlencoded({extended:false});
app.post("/shou2js",bodydemo19,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    var phone=req.body.uesrphone;
    console.log(phone);
    var  conn23=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn23.connect();
    var shou2="SELECT *FROM shou WHERE userphone="+phone+";";
    conn23.query(shou2,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);

    })
    conn23.end();

})
//取消收藏
var bodyParser20=require("body-parser");
//初始化解析功能
var bodydemo20=bodyParser20.urlencoded({extended:false});
app.post("/quxiaojs",bodydemo20,function(req,res){
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    var sunx3=req.body.sumx2;
    console.log(sunx3);
    var  conn24=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"loveenglish"
    })
    conn24.connect();
    var quxiao="DELETE FROM shou WHERE how="+sunx3;
    conn24.query(quxiao,function(errqp,okqp){
        if(errqp){
            console.log(errqp);
            return;
        }
        res.send(okqp);

    })
    conn24.end();

})

app.listen("3000","localhost",function(){
    console.log("服务器已经开启！");
})