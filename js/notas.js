const logoutButton = document.getElementById('logout');




logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});