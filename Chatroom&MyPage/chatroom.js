const $address = 'http://localhost:8080'

function getChatHistory()
{
    mentoringId = localStorage.getItem('mentroingId');
    accessToken = localStorage.getItem('accessToken');


    console.log(data)
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $address +'/chat/' + mentoringId, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Authorization', accessToken); //요청 해더에 컨텐츠 타입 Json으로 사전 정의
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                alert("success");
                data = JSON.parse(xhr.responseText);                                                             
            }
            else {
                localStorage.clear();
                location.href='./index.html';
            }
        }
    }
    xhr.send(); //Json형식의 data를 포함하여 요청 전송
    xhr.onload = function() {
        if(data == undefined) {
            //chat기록이 없음
        } else {
            for(let i=0; i<data.length; i++){
                if(data[i].userId == mentorId) {// mentorId는 대충적은거임 userId가 멘토Id와 같으면 멘토의 채팅기록으로 뿌림
                    mekeMentorChat(data[i].message, data[i].createTime);
                } else { //멘티의 채팅기록으로 화면에 뿌림
                    makeMenteeChat(data[i].message, data[i].createTime);
                }
            }
        }
    }
}


//getChatHistory의 요청 결과로 받아온 json을 수업시간에 배운 document.createElement('div')등을 써서 화면을 만든는거임
function makeMentorChat(message, createTime) {
    // 본인들이 만든 html에 맞게 알아서 채워넣으셈
}

function makeMenteeChat(message, createTime) {
    // 본인들이 만든 html에 맞게 알아서 채워넣으셈
}