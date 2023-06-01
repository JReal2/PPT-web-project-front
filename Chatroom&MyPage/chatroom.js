const $address = 'ec2-54-180-147-190.ap-northeast-2.compute.amazonaws.com:8080'//배퍼한 서버

mentoringID = localStorage.getItem('mentoringId'); //localStorage.getItem('mentroingId'); // 아마 이 전 화면들 어딘가에서 localStorage에 setItem으로 서버에서 받아온 mentoring의 Id를 저장했을거임 그걸 꺼내쓰는것
accessToken = localStorage.getItem('accessToken'); //로그인하면 받는 accessToken 
userID = localStorage.getItem('userId');//localStorage.getItem('userId');


//TO DO 웹소켓 연결 이건 내가함
var socket = new SockJS( $address + '/websocket');
        
var stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

            stompClient.subscribe('/sub/chat/mentoring/' + mentoringID, function (message) {
                var receivedMessage = JSON.parse(message.body);
                showMessage(receivedMessage);
            });
        });

        function sendMessage() {
            var messageInput = $('#text').val();
            var message = {
                mentoringId: mentoringID,
                userId: userID,
                message: messageInput,
                createTime: new Date().toISOString()
            };
            stompClient.send("/pub/chat/message", {}, JSON.stringify(message));
        }

        function showMessage(message) {
            var messageContainer = $('#chatroom');
            var messageElement = $('<div class="message">');

            if (message.userId === 1) {
                messageElement.addClass('sent');
            } else {
                messageElement.addClass('received');
            }

            var messageTextElement = $('<div class="message-text">').text(message.message);

            messageElement.append(messageTextElement);
            messageContainer.append(messageElement);

        }

function getChatHistory()
{

    console.log(data)
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $address +'/chat/' + mentoringId, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
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
                makeChatDiv(data[i].message, data[i].createTime);
            }
        }
    }
}


//getChatHistory의 요청 결과로 받아온 json을 수업시간에 배운 document.createElement('div')등을 써서 화면을 만든는거임
function makeChatDiv(userId, message, createTime) {
    if(userId == mentorId) {

    } else { //이런식으로 구분하면되지않을까함

    }
    // 본인들이 만든 html에 맞게 알아서 채워넣으셈
}

