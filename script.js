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
    keyMenu.style.animation = "fadeInLama 1s forwards";
    innerWall.style.animation = "fadeInLama 1s forwards";
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

// --- UPDATE STEP 4: ZOOM & TRANSISI ---

//function mulaiZoom() {
    //const container = document.querySelector('.game-container');
    //const blackout = document.getElementById('total-blackout');
    
    // 1. Efek Kamera Maju & Layar menggelap
    //container.classList.add('zoom-masuk');
    //blackout.classList.remove('hidden');
    //blackout.style.animation = "fadeInSmooth 2s forwards";
//}

function mulaiZoom() {
    const container = document.querySelector('.game-container');
    const blackout = document.getElementById('total-blackout');
    
    // 1. Jalankan Zoom
    container.classList.add('zoom-masuk');
    
    // 2. Munculkan blackout perlahan supaya transisi ke adegan kue halus
    blackout.classList.remove('hidden');
    blackout.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 2000,
        fill: 'forwards',
        delay: 1000 // Muncul pas zoom sudah setengah jalan
    });

    // 3. Setelah 3 detik (zoom selesai), pindah ke adegan kue
    setTimeout(() => {
        slideCake();
    }, 3000);
}

function slideCake() {
    const cakeScene = document.getElementById('cake-scene');
    const cakeImg = document.getElementById('main-cake');
    
    // 1. Tampilan Awal: cake_blackout.png
    cakeScene.classList.remove('hidden');
    cakeImg.src = "assets/cake/cake_blackout.png";

    // 2. Dialog Pertama (Sakelar)
    setTimeout(() => {
        tampilkanUserDialogLS("Oke, sakelar mana ya? Gelap gini takut kesandung...", () => {
            
            // 3. Muncul cake1.png
            cakeImg.src = "assets/cake/cake1.png";
            
            // 4. Dialog Kedua (Apa itu...)
            setTimeout(() => {
                tampilkanUserDialogLS("Eh? Apa itu ....", () => {
                    
                    // 5. Muncul cake2.png
                    cakeImg.src = "assets/cake/cake2.png";
                    
                    // 6. Dialog Ketiga (Liv?)
                    setTimeout(() => {
                        tampilkanUserDialogLS("Liv?", () => {
                            
                            // 7. Muncul cake3 sampai cake6 secara otomatis
                            jalankanAnimasiKueOtomatis(() => {
                                
                                // 8. Dialog Surprise
                                tampilkanUserDialogLS("??? Surprise...?", () => {
                                    
                                    // 9. Muncul candle1.png
                                    cakeImg.src = "assets/cake/candle1.png";
                                    
                                    // 10. Bubble Liv (Hehe...)
                                    setTimeout(() => {
                                        tampilkanBubbleLiv("hehe, ayo tiup lilinnya!", () => {
                                            
                                            // 11. Kotak "Tiup Lilin" muncul
                                            document.getElementById('action-bubble').classList.remove('hidden');
                                        });
                                    }, 1000);
                                });
                            });
                        });
                    }, 500);
                });
            }, 1000);
        });
    }, 1000);
}

// Fungsi bantu untuk animasi cake3 - cake6
function jalankanAnimasiKueOtomatis(callback) {
    const cakeImg = document.getElementById('main-cake');
    const frames = ['cake3.png', 'cake4.png', 'cake5.png', 'cake6.png'];
    let i = 0;

    const interval = setInterval(() => {
        if (i < frames.length) {
            cakeImg.src = `assets/cake/${frames[i]}`;
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 800); // Kecepatan gerak karakter
}

// 11. Fungsi Klik Tiup Lilin
function prosesTiupLilin() {
    const cakeImg = document.getElementById('main-cake');
    document.getElementById('action-bubble').classList.add('hidden');

    // Muncul candle2.png
    cakeImg.src = "assets/cake/candle2.png";

    // 12. Dialog Liv (Yeyy...)
    setTimeout(() => {
        tampilkanBubbleLiv("yeyyyy happy birthday yan!", () => {
            
            // 13. Tampilan candle3.png
            cakeImg.src = "assets/cake/candle3.png";
            
            // 14. Animasi Back1 sampai Back4
            setTimeout(() => {
                jalankanAnimasiMundur();
            }, 1500);
        });
    }, 1000);
}

function jalankanAnimasiMundur() {
    const cakeImg = document.getElementById('main-cake');
    const frames = ['back1.png', 'back2.png', 'back3.png', 'back4.png', 'back5.png'];
    let i = 0;

    const interval = setInterval(() => {
        if (i < frames.length) {
            cakeImg.src = `assets/cake/${frames[i]}`;
            
            // 15. Tahan 5 detik di back5
            if (frames[i] === 'back5.png') {
                clearInterval(interval);
                console.log("Menahan di back5 selama 5 detik...");
                setTimeout(() => {
                    console.log("Persiapan Haru & Ace...");
                    // Panggil fungsi Haru & Ace di sini nanti
                }, 5000);
            }
            i++;
        }
    }, 1000);
}

// Fungsi untuk memunculkan dialog User di bagian bawah
function tampilkanUserDialogLS(teks, callback) {
    const box = document.getElementById('user-dialog-landscape');
    const txt = document.getElementById('user-text-ls');
    
    txt.innerText = teks;
    box.classList.remove('hidden');
    
    box.onclick = () => {
        box.classList.add('hidden');
        if (callback) callback();
    };
}

// Fungsi untuk memunculkan bubble chat Liv
function tampilkanBubbleLiv(teks, callback) {
    const bubble = document.getElementById('liv-bubble');
    const txt = document.getElementById('liv-text');
    
    txt.innerText = teks;
    bubble.classList.remove('hidden');
    
    bubble.onclick = () => {
        bubble.classList.add('hidden');
        if (callback) callback();
    };
                                    }
                    
