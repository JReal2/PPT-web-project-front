const $address = 'http://ec2-54-180-147-190.ap-northeast-2.compute.amazonaws.com:8080'//배포한 서버


window.onload = function() {
    getRecommend();
}
function makediv(id, name, skill, company, carrer){
    //추가할 위치 설정
    const element = document.getElementById('wrapper');
    // div들 만들기
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.classList.add('swiper-slide');
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image-content');
    const span = document.createElement('span');
    span.classList.add('overlay');
    const cardImg = document.createElement('div');
    cardImg.classList.add('card-image');
    const img = document.createElement('img');
    img.setAttribute('src', 'images/profile2.jpg');
    img.classList.add('card-img');

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    const nameh = document.createElement('h2');
    nameh.classList.add('name');
    const skillp = document.createElement('p');
    const companyp = document.createElement('p');
    const carrerp = document.createElement('p');

    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.textContent="Apply"
    
    nameh.textContent=name;
    skillp.textContent="Skill: " + skill;
    companyp.textContent="Company: " +company;
    carrerp.textContent="Carrer: " +carrer;

    cardContent.appendChild(nameh);
    cardContent.appendChild(skillp);
    cardContent.appendChild(companyp);
    cardContent.appendChild(carrerp);
    cardContent.appendChild(btn);

    cardImg.appendChild(img);

    imageDiv.appendChild(span);
    imageDiv.appendChild(cardImg);

    cardDiv.appendChild(imageDiv);
    cardDiv.appendChild(cardContent);

    element.appendChild(cardDiv);
    
}

function getRecommend() {
    var data;
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $address+ '/members/recommend/' + 32, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            console.log(this.response)
            if (xhr.status === 200) { //연결 성공시
                data=JSON.parse(xhr.response);
                console.log(data);
            }
            else {
                alert("fail")
            }
        }
    }
    xhr.send()
    xhr.onload = function(){
        if(data==undefined){
        // 프로젝트가 없습니다
        } else {
            for(let i=0; i<data.length; i++){
                makediv(data[i].id, data[i].name, data[i].skill, data[i].company, data[i].career)
            }
        }
    }
}

