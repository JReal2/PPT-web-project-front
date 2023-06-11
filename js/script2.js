const $address = 'http://ec2-54-180-147-190.ap-northeast-2.compute.amazonaws.com:8080'//나중에 만약 서버를 배포하게된다면 바뀌게될수도있음

var data;

window.onload = function() {
    getMentors();
}

function getMentors()
{
    var sskill = document.getElementById("learnSkill").value;
    var scompany = document.getElementById("mentorCompany").value;
    var jsonData = 
        {skill: sskill, 
        company: scompany};        
    console.log(jsonData);
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("POST", $address + '/members', true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.setRequestHeader('Authorization', accessToken); //로그인하면 accessToken을 받을건데 로그인후에는 요청을 보낼때 무조건 이 헤더를 포함시켜야함
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === xhr.DONE) {
            console.log(this.response);
            if (xhr.status === 200) { //연결 성공시
                data = JSON.parse(xhr.responseText); //json파싱 
                console.log(this.response);                                     
            }
            else {//실패했다는것은 엑세스토큰이 만료되었거나 비정상적인 접근이라는것
                localStorage.clear();// 저장소를 비우고 로그인화면으로 이동
                //location.href='./mypage.html';
            }
        }
    }
    xhr.send(JSON.stringify(jsonData)); //Json형식의 data를 포함하여 요청 전송, 이 경우 클라이언트에서 전송하는 데이터는 없음
    xhr.onload = function() { //응답이 로드되면
        if(data == undefined) {
            //chat기록이 없음
        } else {
            tableClear();
            for(let i=0; i<data.length; i++){ //chat은 여러개의 chat이 json데이터로 오는데 이것은 배열로 되어있으니 배열로 1개의 chat씩
                //왼쪽이 멘토채팅, 오른쪽이 멘티채팅으로 나누어져있기떄문에 따로 잘 나누어서 해야함 시간도있으니까 시간순으로 하면댐
                makeMentorsTable(data[i].name, data[i].skill, data[i].interestSkill, data[i].company, data[i].career);
            }
        }
    }
}

function tableClear() {
    var table = document.getElementById("mentors");
    const rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
      table.deleteRow(i);
    }
}

function makeMentorsTable(name,skill,interestSkill,company,career) {
    var table = document.getElementById("mentors");
    var list = document.getElementById("receivedlist");
    var tr = document.createElement("tr"); // tr 요소를 생성합니다
    tr.style.borderBottom = "0.5px solid rgb(105, 105, 105)"; // tr의 하단 테두리 스타일을 설정합니다
    var td1 = document.createElement("td"); // td 요소를 생성합니다
    td1.innerHTML = name; // td 내부의 내용을 설정합니다

    var td2 = document.createElement("td");
    td2.innerHTML = skill;

    var td3 = document.createElement("td");
    td3.innerHTML = interestSkill;

    var td4 = document.createElement("td");
    td4.innerHTML = company;

    var td5 = document.createElement("td");
    td5.innerHTML = career;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    list.appendChild(tr);
    table.appendChild(list);
}

