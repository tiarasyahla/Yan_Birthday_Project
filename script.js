let currentKeyIndex = 1;
const totalKeys = 3;

// --- STEP 1: LOGIKA DIALOG (GANTI SETTIMEOUT LAMA DENGAN INI) ---
let dialogStep = 0;
const dialogLines = [
    "Hahhh... akhirnya sampai juga di rumah.",
    "Waktunya istirahat, capek banget hari ini...",
    "Loh? Kok pintunya terkunci? Mana ya kuncinya...?"
];

// Munculkan dialog setelah out_wall selesai fade-in (detik ke-4)
setTimeout(() => {
    mulaiDialog();
}, 4000); 

function mulaiDialog() {
    const box = document.getElementById('dialog-box');
    box.classList.remove('hidden');
    tampilkanTeks();
    
    box.onclick = () => {
        dialogStep++;
        if (dialogStep < dialogLines.length) {
            tampilkanTeks();
        } else {
            box.classList.add('hidden');
            munculkanMenuKunci(); // Pindah ke pemilihan kunci
        }
    };
}

function tampilkanTeks() {
    document.getElementById('dialog-text').innerText = dialogLines[dialogStep];
}

// --- STEP 2: MUNCULKAN MENU KUNCI ---
function munculkanMenuKunci() {
    const keyMenu = document.getElementById('key-selection');
    const innerWall = document.getElementById('inner-wall');
    
    keyMenu.classList.remove('hidden');
    innerWall.classList.remove('hidden');
    
    // Beri animasi fade in halus agar tidak kaget
    //keyMenu.style.animation = "fadeInLama 1s forwards";
    //innerWall.style.animation = "fadeInLama 1s forwards";
}

// --- STEP 3: LOGIKA TOMBOL KUNCI (Tetap Pakai yang Lama) ---
function nextKey() {
    currentKeyIndex++;
    if (currentKeyIndex > totalKeys) currentKeyIndex = 1;
    document.getElementById('current-key').src = `assets/key${currentKeyIndex}.png`;
}

function checkKey() {
    const notif = document.getElementById('notification');
    notif.classList.remove('hidden', 'benar', 'salah');

    if (currentKeyIndex === 3) {
        notif.innerText = "Yey! Kunci sesuai, silakan masuk! (⁠≧⁠▽⁠≦⁠)";
        notif.classList.add('benar');
        document.getElementById('sfx-benar').play();
        
        setTimeout(() => {
            document.getElementById('key-selection').classList.add('hidden');
            notif.classList.add('hidden');
            openDoor(); // Lanjut ke animasi pintu
        }, 2000);
    } else {
        notif.innerText = "Sayangnya bukan, coba lagi yaa (⁠╥⁠﹏⁠╥⁠)";
        notif.classList.add('salah');
        document.getElementById('sfx-salah').play();
        setTimeout(() => { notif.classList.add('hidden'); }, 2000);
    }
}

// --- STEP 4: ANIMASI PINTU & ZOOM ---
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
            setTimeout(() => { mulaiZoom(); }, 500);
        }
    }, 500);
}

function mulaiZoom() {
    const container = document.querySelector('.game-container');
    container.classList.add('zoom-masuk');
}
