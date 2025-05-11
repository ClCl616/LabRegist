//로그인 폼 제출 시 정보 확인 함수 호출
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        checkLoginInfo();
    });
}

//로그인 정보 확인
function checkLoginInfo() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const errorMessage = document.getElementById('error-message');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username);
    
    if (user) {
        if (password === user.password) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showMessage("error-message", "로그인 성공! 메인 페이지로 이동합니다.", true);
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1500);
        } else {
            showMessage("error-message", "비밀번호가 잘못되었습니다.", false);
        }
    } else {
        errorMessage.textContent = '등록된 사용자 이름이 없습니다. 회원가입 후 로그인하세요.';
    }
}

// 회원가입
function registerUser() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert("모든 칸에 내용을 입력해주세요.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const isDuplicate = users.some(user => user.username === username);
    if (isDuplicate) {
        alert("이미 존재하는 사용자 이름입니다. 다른 이름을 사용해주세요.");
        return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    showMessage("signup-message", "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.", true);
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}


//프로필 사진 미리보기 
function previewImage(event) {
    const reader = new FileReader();

    reader.onload = function() {
        const output = document.getElementById('profileImage').src = reader.result;
    };

    reader.readAsDataURL(event.target.files[0]);
}

//프로필 변경 저장
function saveProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("로그인이 필요합니다.");
        window.location.href = 'index.html';
        return;
    }

    const profilePicInput = document.getElementById("profilePic");
    const profileImage = document.getElementById("profileImage");
    const name = document.getElementById("name").value;
    const interests = document.getElementById("interests").value;
    const company = document.getElementById("company").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const saveData = (imageSrc) => {
        const profileData = {
            image: imageSrc,
            name,
            interests,
            company,
            email,
            phone
        };
        localStorage.setItem(`profileData_${currentUser.username}`, JSON.stringify(profileData));
        showMessage("profile-message", "프로필이 저장되었습니다!", true);
    };

    if (profilePicInput.files && profilePicInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            saveData(e.target.result);
        };
        reader.readAsDataURL(profilePicInput.files[0]);
    } else {
        saveData(profileImage.src);
    }
}

//프로필 불러오기
function loadProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const storedData = localStorage.getItem(`profileData_${currentUser.username}`);
    if (!storedData) return;

    const data = JSON.parse(storedData);
    const profileImage = document.getElementById("profileImage");
    if (profileImage) profileImage.src = data.image;

    const nameInput = document.getElementById("name");
    if (nameInput) nameInput.value = data.name || "";

    const interestsInput = document.getElementById("interests");
    if (interestsInput) interestsInput.value = data.interests || "";

    const companyInput = document.getElementById("company");
    if (companyInput) companyInput.value = data.company || "";

    const emailInput = document.getElementById("email");
    if (emailInput) emailInput.value = data.email || "";

    const phoneInput = document.getElementById("phone");
    if (phoneInput) phoneInput.value = data.phone || "";
}

//메인 페이지 프로필 정보 표시
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const welcomeEl = document.getElementById('welcomeMessage');

    if (currentUser && welcomeEl) {
        welcomeEl.textContent = `환영합니다, ${currentUser.username}님!`;
    }
});

//로그인 필요
function requireLogin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        window.location.href = "index.html";
    }
}

//메시지 출력
function showMessage(elementId, message, isSuccess = true) {
    const target = document.getElementById(elementId);
    if (target) {
        target.textContent = message;
        target.className = 'status-message ' + (isSuccess ? 'success' : 'error');
    }
}