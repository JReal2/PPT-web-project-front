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
    xhr.open("POST", 'http://localhost:8080'+'/members/new', true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Content-Type', 'application/json'); //요청 해더에 컨텐츠 타입 Json으로 사전 정의
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                alert("success");
                location.href='index.html';                                                             
            }
            else {
                alert("Existed email or under 6 letters password.")
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
    xhr.open("POST", 'http://localhost:8080'+'/login', true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Content-Type', 'application/json'); //요청 해더에 컨텐츠 타입 Json으로 사전 정의
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            console.log(this.response)
            if (xhr.status === 200) { //연결 성공시
                alert("success");                                                            
            }
            else {
                alert("회원을 찾을수 없습니다")
            }
        }
    }
    xhr.send(data); //Json형식의 data를 포함하여 요청 전송
}