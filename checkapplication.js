const $addr = 'http://ec2-54-180-147-190.ap-northeast-2.compute.amazonaws.com:8080'//나중에 만약 서버를 배포하게된다면 바뀌게될수도있음

var applicationid = localStorage.getItem('applicationID');
//mentoringID = 3; //localStorage.getItem('mentroingId'); // 아마 이 전 화면들 어딘가에서 localStorage에 setItem으로 서버에서 받아온 mentoring의 Id를 저장했을거임 그걸 꺼내쓰는것
//accessToken = localStorage.getItem('accessToken'); //로그인하면 받는 accessToken 
var userID = localStorage.getItem('userID');
var mentorID = localStorage.getItem('mentorID');
var data;

window.onload = function() {
    checkApplication();
}
function checkApplication()
{
    console.log(data);
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $addr + '/applications/' + applicationid, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    //xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                data = JSON.parse(xhr.responseText);//json파싱                                      
            }
            // else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
            //     localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
            //     location.href='./mypage.html';
            // }
        }
    }
    xhr.send(); //Json형식의 data를 포함하여 요청 전송, 이 경우 클라이언트에서 전송하는 데이터는 없음
    xhr.onload = function() { //응답이 로드되면
        if(data == undefined) {
            //chat기록이 없음
        } else {
            var motiv = document.getElementById("motivation");
            motiv.value = data.motivation;
            motiv.disabled;
            var price = document.getElementById("price");
            price.value = data.price;
            price.disabled;
            var btn =  document.getElementById("applicate");
            btn.value= "확인";
            btn.onclick = function(){
            window.close();
            }
        }
    }
}