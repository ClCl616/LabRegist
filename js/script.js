//로그인 폼 제출 시 정보 확인 함수 호출
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    checkLoginInfo();
});

//로그인 버튼 클릭 시 로그인 폼 제출
document.getElementById('loginButton').addEventListener('click', function() {
    document.getElementById('loginForm').submit();
});

//로그인 정보 확인
function checkLoginInfo() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const errorMessage = document.getElementById('error-message');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username);
    
    if (user) {
        if (password === user.password) {
            alert('로그인에 성공하였습니다. 확인을 누르면 페이지가 이동됩니다.');
            window.location.href = '../html/main.html';
        } else {
            errorMessage.textContent = '사용자 이름이나 비밀번호가 잘못되었습니다. 다시 시도해주세요.';
        }
    } else {
        errorMessage.textContent = '등록된 사용자 이름이 없습니다. 회원가입 후 로그인하세요.';
    }
}

//프로필 사진 미리보기 
function previewImage(event) {
    const reader = new FileReader();

    reader.onload = function() {
        const output = document.getElementById('profileImage');
        output.src = reader.result;
    };

    reader.readAsDataURL(event.target.files[0]);
}

//프로필 변경 저장
function saveProfile() {
    alert("저장되었습니다. 확인을 누르면 페이지가 이동됩니다.");
    window.location.href = "main.html";

}

// 회원가입
function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
        username: username,
        email: email,
        password: password
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    window.location.href = 'login.html';
}