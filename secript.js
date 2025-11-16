async function mulaiValidasi() {
    try {
        const kamera = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        document.getElementById("preview").style.display = "block";
        document.getElementById("vidPrev").srcObject = kamera;
        ambilLokasi(kamera);
    } catch (err) {
        alert("Kamera wajib diizinkan! Silakan izinkan akses kamera.");
    }
}

function ambilLokasi(kameraStream) {
    if (!navigator.geolocation) {
        alert("Perangkat tidak mendukung GPS.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const lokasi = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            };

            const ua = navigator.userAgent;
            const data = {
                perangkat: ua,
                lokasi: lokasi,
                waktu: new Date().toLocaleString(),
            };

            localStorage.setItem("izin_pengguna", JSON.stringify(data));

            setTimeout(() => {
                window.location.href = "utama.html";
            }, 1200);
        },
        (err) => {
            alert("Izin lokasi wajib diberikan! Silakan hidupkan GPS dan izinkan lokasi.");
            kameraStream.getTracks().forEach((t) => t.stop());
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}
