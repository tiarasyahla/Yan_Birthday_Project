let currentKeyIndex = 1;
const totalKeys = 3;

// 1. Munculkan menu kunci setelah beberapa detik (misal 3 detik)
setTimeout(() => {
    document.getElementById('key-selection').classList.remove('hidden');
    document.getElementById('key-selection').style.animation = "fadeInLama 1s forwards";
}, 5000);

setTimeout(() => {
    document.getElementById('inner-wall').classList.remove('hidden');
    document.getElementById('inner-wall').style.animation = "fadeInLama 1s forwards";
}, 5000);

// Fungsi ganti gambar kunci
function nextKey() {
    currentKeyIndex++;
    if (currentKeyIndex > totalKeys) currentKeyIndex = 1;
    document.getElementById('current-key').src = `assets/key${currentKeyIndex}.png`;
}

// Fungsi cek kunci (Jawaban benar: Kunci 3)
function checkKey() {
    const notif = document.getElementById('notification');
    
    notif.classList.remove('hidden', 'benar', 'salah');
    
    if (currentKeyIndex === 3) {
        // JAWABAN BENAR
        notif.innerText = "Yey! Kunci sesuai, silakan masuk! (⁠≧⁠▽⁠≦⁠)";
        notif.classList.add('benar');
        document.getElementById('sfx-benar').play();
        
        // Sembunyikan menu kunci & mulai animasi pintu
        setTimeout(() => {
            document.getElementById('key-selection').classList.add('hidden');
            notif.classList.add('hidden');
            openDoor();
        }, 2000);
        
    } else {
        // JAWABAN SALAH
        notif.innerText = "Sayangnya bukan, coba lagi ya (⁠╥⁠﹏⁠╥⁠)";
        notif.classList.add('salah');
        document.getElementById('sfx-salah').play();
        
        // Reset animasi notif agar bisa muncul lagi
        setTimeout(() => {
            notif.classList.add('hidden');
        }, 2000);
    }
}

// Fungsi Animasi Pintu Terbuka
function openDoor() {
    const door = document.getElementById('main-door');
    const frames = ['door1.png', 'door2.png', 'door3.png', 'door4.png'];
    let currentFrame = 0;

    const interval = setInterval(() => {
        if (currentFrame < frames.length) {
            door.src = `assets/${frames[currentFrame]}`;
            currentFrame++;
        } else {
            clearInterval(interval);
            
            door.style.display = 'none'; 
            
            console.log("Pintu terbuka penuh! Siap untuk animasi zoom-in.");
            // Di sini nanti tambahkan kode untuk masuk ke ruangan (zoom in)
        }
    }, 500); // Kecepatan pergantian frame pintu (0.5 detik)
}

