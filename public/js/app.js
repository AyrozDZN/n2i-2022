let egImgClickCount = 0;

window.addEventListener('scroll', function() {
    var scroll = window.scrollY;
    var header = document.querySelector('header nav');
    if (scroll > 25) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
})

function egImgClick() {
    egImgClickCount++;
    if (egImgClickCount >= 10) {
        egImgClickCount = 0;
        window.open('https://www.arte.tv/fr/videos/052993-000-A/la-vie-avec-le-vih/', '_blank');
    }
}