const $address = 'http://ec2-54-180-147-190.ap-northeast-2.compute.amazonaws.com:8080'//배포한 서버

userID = localStorage.getItem('userID');

window.onload = function() {
    getRecommend();
}

function makediv(id, name, skill, company, carrer){
    console.log(localStorage.getItem('userID'));
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
    img.setAttribute('src', 'images/profile.svg');
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

    btn.onclick = function() {
        localStorage.setItem('mentorID', id);
        popup();
    }
    
    nameh.textContent=name;
    skillp.textContent="Skill: " + skill;
    companyp.textContent="Company: " + company;
    carrerp.textContent="Carrer: " + carrer;

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

function popup(){
    var url = "application.html";
    var name = "신청서";
    var option = "width = 800, height = 500, top = 100, left = 200, location = no, resizable=no"
    window.open(url, name, option);
}

function getRecommend() {
    var data;
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("GET", $address+ '/members/recommend/' + userID, true); //요청을 보낼 방식, 주소, 비동기 여부 설정
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

function getMentors() {
  var data;
  var sskill = document.getElementById("learnSkill").value;
  var scompany = document.getElementById("mentorCompany").value;
  var jsonData = {
    skill: sskill,
    company: scompany
  };
  console.log(jsonData);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", $address + "/members", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
      console.log(this.response);
      if (xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        console.log(this.response);
      } else {
        localStorage.clear();
      }
    }
  };
  xhr.send(JSON.stringify(jsonData));
  xhr.onload = function() {
    if (data == undefined) {
      // 프로젝트가 없습니다
    } else {
      deleteAllSubElements("wrapper");
      for (let i = 0; i < data.length; i++) {
        makediv(data[i].id, data[i].name, data[i].skill, data[i].company, data[i].career);
      }
      refreshScript('js/script1.js', 'jsc');
    }
  };
}


function deleteAllSubElements(id) {
    var parentElement = document.getElementById(id);
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}




function refreshScript(scriptUrl, scriptId) {
    // Create a new script element
    var scriptElement = document.createElement('script');
  
    // Set the source attribute of the script to the URL of the JavaScript file
    scriptElement.src = "js/script1.js";
  
    // Remove the existing script (if any)
    var existingScript = document.getElementById("jsc");
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript);
    }
  
    // Append the new script element to the document's head
    document.head.appendChild(scriptElement);
  }