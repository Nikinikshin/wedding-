// 1. Мгновенное открытие конверта (без тяжелых библиотек)
function openInvitation() {
    document.getElementById('welcome-overlay').classList.add('hidden');
}

// 2. Смена фото при клике с плавным переходом
const normalPhotoPath = "assets/photo-normal.jpg";
const memePhotoPath = "assets/photo-meme.jpg";
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

// 3. Таймер обратного отсчета (Саяногорск, UTC+7)
const weddingDate = new Date("2027-07-09T13:30:00+07:00").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }
}
updateTimer();
setInterval(updateTimer, 1000);

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

        alert("Ура! Ваш ответ записан. Ждем вас на празднике! 🎉");
        form.reset();
    } catch (error) {
        alert("Похоже, пропал интернет. Проверьте подключение и попробуйте еще раз!");
        console.error('Ошибка сети:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    }
}

