const $address = 'http://ec2-54-180-147- 190.ap-northeast-2.compute.amazonaws.com:8080'//나중에 만약 서버를 배포하게된다면 바뀌게될수도있음

mentoringID = 3; //localStorage.getItem('mentroingId'); // 아마 이 전 화면들 어딘가에서 localStorage에 setItem으로 서버에서 받아온 mentoring의 Id를 저장했을거임 그걸 꺼내쓰는것
accessToken = localStorage.getItem('accessToken'); //로그인하면 받는 accessToken 
userID = 32;//localStorage.getItem('userId');

$(document).ready(function() {
    $("#edit").click(function(){
        $(".application").hide();
        $(".modify").show();
        $("#edit").css("fontWeight","700");
        $("#app").css("fontWeight","500");          
    });
    $("#app").click(function(){
        $(".modify").hide();
        $(".application").show();
        $("#edit").css("fontWeight","500");
        $("#app").css("fontWeight","700");
    });
});

function getApplicationReceived()
{
    console.log(data);
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $address + '/applications/received/' + userID, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                alert("success");
                data = JSON.parse(xhr.responseText);//json파싱                                      
            }
            else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
                localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
                location.href='./index.html';
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
                makeReceivedDiv(data[i].name, data[i].interestskill);
            }
        }
    }
}

function makeReceivedDiv(name, interestskill) {
    var pname = document.createElement("p");
    var pskill = document.createElement("p");
    var rejectbtn = $('<input class="text-center" type="button" value="거절">');
    var acceptbtn = $('<input class="text-center" type="button" value="수락">');
}

function getApplicationSent()
{
    console.log(data);
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $address + '/applications/sent/' + userID, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                alert("success");
                data = JSON.parse(xhr.responseText);//json파싱                                      
            }
            else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
                localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
                location.href='./index.html';
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
                makeChatDiv(data[i].mentoringId, data[i].message, data[i].createTime);
            }
        }
    }
}

function modifyInfo()
{
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("POST", $address +'/members/update/', true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    // xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    var email = $("#email").val();
    var skill = $("#skill").val();
    var interestskill = $("#interestskill").val();
    var jsonData = {"email": email, "skill": skill, "interestskill" : interestskill};
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                console.log(this.response);
                alert("success");
                data = JSON.parse(xhr.responseText);//json파싱                                      
            }
            else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
                localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
                location.href='./index.html';
            }
        }
    };
     //Json형식의 data를 포함하여 요청 전송, 이 경우 클라이언트에서 전송하는 데이터는 없음
    xhr.onload = function() { //응답이 로드되면
        if(data == undefined) {
            //chat기록이 없음
        } else {
            for(let i=0; i<data.length; i++){ //chat은 여러개의 chat이 json데이터로 오는데 이것은 배열로 되어있으니 배열로 1개의 chat씩
                //왼쪽이 멘토채팅, 오른쪽이 멘티채팅으로 나누어져있기떄문에 따로 잘 나누어서 해야함 시간도있으니까 시간순으로 하면댐
                
            }
        }
    }
    xhr.send(JSON.stringify(jsonData));
}