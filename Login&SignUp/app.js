const $address = 'http://ec2-54-180-147-190.ap-northeast-2.compute.amazonaws.com:8080'//배포한 서버
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const signUpForm = document.querySelector('.sign-up-form');
const signInForm = document.querySelector('.sign-in-form');

sign_up_btn.addEventListener("click", () => {
   container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
   container.classList.remove("sign-up-mode");
});

// onclick 함수 정의
function signUp()
{
    const name = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;
    const company = signUpForm.querySelector('input[placeholder="Company"]').value;
    const career = signUpForm.querySelector('input[placeholder="Career"]').value;
    const skill = signUpForm.querySelector('input[placeholder="Skill"]').value;
    const interestSkill = signUpForm.querySelector('input[placeholder="Interest skill"]').value;
   

    data = JSON.stringify({
        name: name,
        email: email,
        password: password,
        company: company,
        career: career,
        skill: skill,
        interestSkill: interestSkill
    });
    console.log(data)
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("POST", $address +'/members/new', true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Content-Type', 'application/json'); //요청 해더에 컨텐츠 타입 Json으로 사전 정의
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                alert("success");
                location.href="index.html"
            }
            else {
                alert("Fail");
            }
        }
    }
    xhr.send(data); //Json형식의 data를 포함하여 요청 전송
}

function login()
{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    data = JSON.stringify({
        email: email,
        password: password
    });
    console.log(data)
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("POST", $address+'/login', true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Content-Type', 'application/json'); //요청 해더에 컨텐츠 타입 Json으로 사전 정의
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            console.log(this.response)
            if (xhr.status === 200) { //연결 성공시
                alert("success");
                var data=JSON.parse(xhr.response);
                localStorage.setItem('accessToken',data.accessToken) //요청 응답으로 받은 json데이터를 파싱하여 브라우저 localStorage에 저장, localStorage는 창이이동해도 계속해서 가지고있을수있는 브라우저 임시 저장소
                localStorage.setItem('username',data.name)
                localStorage.setItem('email',email)    
                
                location.href = "메인화면";
            }
            else {
                alert("회원을 찾을수 없습니다")
            }
        }
    }
    xhr.send(data); //Json형식의 data를 포함하여 요청 전송
}