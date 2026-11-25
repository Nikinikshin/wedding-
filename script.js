// 1. Открытие конверта и салют
function openInvitation() {
    document.getElementById('welcome-overlay').classList.add('hidden');
    confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// 2. Смена фото при клике (с предзагрузкой и плавным переходом)
const normalPhotoPath = "assets/photo-normal.jpg";
const memePhotoPath = "assets/photo-meme.jpg";

// Заранее подгружаем смешное фото в память браузера, чтобы оно открылось мгновенно
const preloadMeme = new Image();
preloadMeme.src = memePhotoPath;

let isMeme = false;

function toggleMemePhoto() {
    const img = document.getElementById('main-photo');
    const caption = document.getElementById('photo-caption');
    const badge = document.getElementById('photo-badge');
    
    // Плавно делаем фото прозрачным на 0.2 секунды
    img.style.opacity = 0;
    
    setTimeout(() => {
        isMeme = !isMeme;
        if (isMeme) {
            img.src = memePhotoPath;
            caption.innerText = "😂 А вот и правда! Нажми еще раз, чтобы вернуть серьезность";
            badge.innerText = "Вернуть классику 🎩";
        } else {
            img.src = normalPhotoPath;
            caption.innerText = "👆 Нажми на фото, чтобы увидеть, как мы выглядим на самом деле";
            badge.innerText = "Нажми на нас 👀";
        }
        // Плавно возвращаем видимость
        img.style.opacity = 1;
    }, 200);
}


// 3. Таймер обратного отсчета
const weddingDate = new Date("2027-07-09T13:30:00+07:00").getTime();

setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }
}, 1000);

// 4. Отправка формы в Google Таблицу
const scriptURL = 'https://script.google.com/macros/s/AKfycbwJZmgeLdO--IEmwklmPWE5I4SN2kT48HBDtdXcm-fFr7L6yt-TWkg58mlDD_2dxViepw/exec';

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    
    submitBtn.disabled = true;
    submitBtn.innerText = "Отправляем ответ... ⏳";

    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: new FormData(form)
        });

        // Если дошли до этой строки — запрос успешно ушел в Google!
        alert("Ура! Ваш ответ записан. Ждем вас на празднике! 🎉");
        form.reset();

        // Запускаем конфетти безопасно (даже если интернет медленный, ошибки не будет)
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    } catch (error) {
        // Сюда попадем ТОЛЬКО если реально отключен интернет
        alert("Похоже, пропал интернет. Проверьте подключение и попробуйте еще раз!");
        console.error('Ошибка сети:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    }
}

