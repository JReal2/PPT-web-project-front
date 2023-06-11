const $address = 'http://ec2-54-180-147-190.ap-northeast-2.compute.amazonaws.com:8080'//나중에 만약 서버를 배포하게된다면 바뀌게될수도있음

accessToken = localStorage.getItem('accessToken'); //로그인하면 받는 accessToken 
userID = localStorage.getItem('userID');
userEmail = localStorage.getItem('email');
userName = localStorage.getItem('username');
var data;

$(document).ready(function() {
    $("#edit").click(function(){
        $(".application").hide();
        $(".mentoring").hide();
        $(".modify").show();
        $("#edit").css("fontWeight","700");
        $("#app").css("fontWeight","500");   
        $("#mentoringmenu").css("fontWeight","500");          
    });
    $("#app").click(function(){
        $(".modify").hide();
        $(".mentoring").hide();
        $(".application").show();
        $("#edit").css("fontWeight","500");
        $("#app").css("fontWeight","700");
        $("#mentoringmenu").css("fontWeight","500");          

    });
    $("#mentoringmenu").click(function(){
        $(".modify").hide();
        $(".application").hide();
        $(".mentoring").show();
        $("#edit").css("fontWeight","500");
        $("#app").css("fontWeight","500");
        $("#mentoringmenu").css("fontWeight","700");          

    });
    
});

window.onload = function() {
    getApplicationSent();
    getApplicationReceived();
    getMentoringsAsMentor();
    getMentoringsAsMentee();
    fixedEmail();
}

function getApplicationReceived()
{
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $address + '/applications/received/' + userID, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                data = JSON.parse(xhr.responseText);//json파싱                                      
            }
            else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
                localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
                //location.href='./index.html';
            }
        }
    }
    xhr.send(); //Json형식의 data를 포함하여 요청 전송, 이 경우 클라이언트에서 전송하는 데이터는 없음
    xhr.onload = function() { //응답이 로드되면
        if(data == undefined) {
            //chat기록이 없음
        } else {
            for(let i=0; i<data.length; i++){ //chat은 여러개의 chat이 json데이터로 오는데 이것은 배열로 되어있으니 배열로 1개의 chat씩
                //왼쪽이 멘토채팅, 오른쪽이 멘티채팅으로 나누어져있기떄문에 따로 잘 나누어서 해야함 시간도있으니까 시간순으로 하면댐
                makeReceivedDiv(data[i].date, data[i].menteeName, data[i].id);
            }
        }
    }
}

function makeReceivedDiv(date, menteeName, id) {
    var table = document.getElementById("mentorapp");
    var list = document.getElementById("receivedlist");
    var tr = document.createElement("tr"); // tr 요소를 생성합니다
    var td1 = document.createElement("td"); // td 요소를 생성합니다
    td1.innerHTML = date.substr(0, 10); // td 내부의 내용을 설정합니다

    var td2 = document.createElement("td");
    td2.innerHTML = menteeName;

    var td3 = document.createElement("td");
    var appbtn = document.createElement("input"); // input 요소를 생성합니다
    appbtn.className = "text-center";
    appbtn.type = "button";
    appbtn.value = "Application";
    td3.appendChild(appbtn);

    td3.onclick = function() {
        localStorage.setItem('applicationID', id);
        popup();
    }

    var td4 = document.createElement("td");
    var acceptbtn = document.createElement("input"); // input 요소를 생성합니다
    acceptbtn.className = "text-center";
    acceptbtn.type = "button";
    acceptbtn.value = "Accept";
    td4.appendChild(acceptbtn);

    acceptbtn.onclick = function() {
        agree(id);
        location.reload();
    }

    var td5 = document.createElement("td");
    var rejectbtn = document.createElement("input"); // input 요소를 생성합니다
    rejectbtn.className = "text-center";
    rejectbtn.type = "button";
    rejectbtn.value = "Refuse";
    td5.appendChild(rejectbtn);

    rejectbtn.onclick = function() {
        list.removeChild(tr);
        table.appendChild(list);
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    list.appendChild(tr);
    table.appendChild(list);
}

function popup(){
    var url = "checkapplication.html";
    var name = "신청서";
    var option = "width = 800, height = 500, top = 100, left = 200, location = no, resizable = no"
    window.open(url, name, option);
}

function agree(id) {
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    var jsonData = 
    {applicationId: id, 
    title: "멘토링 제목"};

    xhr.open("POST", $address + '/mentorings/new', true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                console.log(this.response);
                data = JSON.parse(xhr.responseText);//json파싱
            }
            else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
                localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
                //location.href='./index.html';
            }
        }
    }
    xhr.send(JSON.stringify(jsonData)); //Json형식의 data를 포함하여 요청 전송, 이 경우 클라이언트에서 전송하는 데이터는 없음
}
 
function getApplicationSent()
{
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $address + '/applications/sent/' + userID, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    //xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                data = JSON.parse(xhr.responseText);//json파싱
            }
            else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
                localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
                //location.href='./index.html';
            }
        }
    }
    xhr.send(); //Json형식의 data를 포함하여 요청 전송, 이 경우 클라이언트에서 전송하는 데이터는 없음
    xhr.onload = function() { //응답이 로드되면
        if(data == undefined) {
            //chat기록이 없음
        } else {
            for(let i=0; i<data.length; i++){ //chat은 여러개의 chat이 json데이터로 오는데 이것은 배열로 되어있으니 배열로 1개의 chat씩
                //왼쪽이 멘토채팅, 오른쪽이 멘티채팅으로 나누어져있기떄문에 따로 잘 나누어서 해야함 시간도있으니까 시간순으로 하면댐
                makeSentDiv(data[i].date, data[i].mentorName, data[i].price);
            }
        }
    }
}

function makeSentDiv(date, name, price) {
    var table = document.getElementById("menteeapp");
    var list = document.getElementById("sentlist");
    var tr = document.createElement("tr"); // tr 요소를 생성합니다
    var td1 = document.createElement("td"); // td 요소를 생성합니다
    td1.innerHTML = date.substr(0, 10); // td 내부의 내용을 설정합니다

    var td2 = document.createElement("td");
    td2.innerHTML = name;

    var td3 = document.createElement("td");
    td3.innerHTML = price;

    var td4 = document.createElement("td");
    var rejectbtn = document.createElement("input"); // input 요소를 생성합니다
    rejectbtn.className = "text-center";
    rejectbtn.type = "button";
    rejectbtn.value = "Cancel";
    td4.appendChild(rejectbtn);

    rejectbtn.onclick = function() {
        list.removeChild(tr);
        table.appendChild(list);
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    list.appendChild(tr);
    table.appendChild(list);
}


function fixedEmail() {
    $("#email").val(userEmail);
}
function modifyInfo()
{
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    var modskill = $("#skill").val();
    var modinterestskill = $("#interestskill").val();
    var jsonData = 
        {email: userEmail, 
        skill: modskill,
        interestSkill : modinterestskill};
    console.log(JSON.stringify(jsonData));
    xhr.open("POST", $address +'/members/update', true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) { 
            if (xhr.status === 200) { //연결 성공시
                console.log(this.response);
                location.reload();                                 
            }
            else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
                localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
                //location.href='./mypage.html';
            }
        }
    };
    xhr.send(JSON.stringify(jsonData)); //Json형식의 data를 포함하여 요청 전송, 이 경우 클라이언트에서 전송하는 데이터는 없음    
}

function getMentoringsAsMentor()
{
    console.log("a");
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $address + '/mentorings/mentor/' + userID, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    //xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                data = JSON.parse(xhr.responseText);//json파싱
                console.log(this.response);                                      
            }
            else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
                localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
                //location.href='./mypage.html';
            }
        }
    }
    xhr.send(); //Json형식의 data를 포함하여 요청 전송, 이 경우 클라이언트에서 전송하는 데이터는 없음
    xhr.onload = function() { //응답이 로드되면
        if(data == undefined) {
            //chat기록이 없음
        } else {
            for(let i=0; i<data.length; i++){ //chat은 여러개의 chat이 json데이터로 오는데 이것은 배열로 되어있으니 배열로 1개의 chat씩
                //왼쪽이 멘토채팅, 오른쪽이 멘티채팅으로 나누어져있기떄문에 따로 잘 나누어서 해야함 시간도있으니까 시간순으로 하면댐
                makeMentorDiv(data[i].title, data[i].menteeName, data[i].id);
            }
        }
    }
}

function makeMentorDiv(title, menteeName, id) {
    var table = document.getElementById("teaching");
    var list = document.getElementById("Mreceivedlist");
    var tr = document.createElement("tr"); // tr 요소를 생성합니다
 
    var td2 = document.createElement("td");
    td2.innerHTML = title;

    var td3 = document.createElement("td");
    td3.innerHTML = menteeName;

    var td4 = document.createElement("td");
    var acceptbtn = document.createElement("input"); // input 요소를 생성합니다
    acceptbtn.className = "text-center";
    acceptbtn.type = "button";
    acceptbtn.value = "Chat";
    td4.appendChild(acceptbtn);

    td4.onclick = function() {
        localStorage.setItem('mentoringID', id);
        localStorage.setItem('mentorName', userName);
        localStorage.setItem('menteeName', menteeName);
        location.href="./chatroom.html";
    }

    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    list.appendChild(tr);
    table.appendChild(list);
}


function getMentoringsAsMentee()
{
    console.log("a");
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $address + '/mentorings/mentee/' + userID, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    //xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                data = JSON.parse(xhr.responseText);//json파싱
                console.log(this.response);                                      
            }
            else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
                localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
                //location.href='./index.html';
            }
        }
    }
    xhr.send(); //Json형식의 data를 포함하여 요청 전송, 이 경우 클라이언트에서 전송하는 데이터는 없음
    xhr.onload = function() { //응답이 로드되면
        if(data == undefined) {
            //chat기록이 없음
        } else {
            for(let i=0; i<data.length; i++){ //chat은 여러개의 chat이 json데이터로 오는데 이것은 배열로 되어있으니 배열로 1개의 chat씩
                //왼쪽이 멘토채팅, 오른쪽이 멘티채팅으로 나누어져있기떄문에 따로 잘 나누어서 해야함 시간도있으니까 시간순으로 하면댐
                makeMenteeDiv(data[i].title, data[i].mentorName, data[i].id);
            }
        }
    }
}

function makeMenteeDiv(title, mentorName, id) {
    var table = document.getElementById("learning");
    var list = document.getElementById("Msentlist");
    var tr = document.createElement("tr"); // tr 요소를 생성합니다

    var td2 = document.createElement("td");
    td2.innerHTML = title;

    var td3 = document.createElement("td");
    td3.innerHTML = mentorName;

    var td4 = document.createElement("td");
    var acceptbtn = document.createElement("input"); // input 요소를 생성합니다
    acceptbtn.className = "text-center";
    acceptbtn.type = "button";
    acceptbtn.value = "Chat";
    td4.appendChild(acceptbtn);

    td4.onclick = function() {
        localStorage.setItem('mentoringID', id);
        localStorage.setItem('menteeName', userName);
        localStorage.setItem('mentorName', mentorName);
        location.href="./chatroom.html";
    }

    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    list.appendChild(tr);
    table.appendChild(list);
}