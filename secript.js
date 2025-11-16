async function mintaIzin() {
    try {
        // Izin Kamera
        const kamera = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("preview").style.display = "block";
        document.getElementById("vidPrev").srcObject = kamera;

        // Izin Lokasi
        navigator.geolocation.getCurrentPosition(pos => {
            const lokasi = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            };

            // Ambil Informasi Perangkat
            const device = navigator.userAgent;

            // Kirim ke server atau Web Utama
            const data = {
                perangkat: device,
                lokasi: lokasi,
                waktu: new Date().toLocaleString()
            };

            localStorage.setItem("izin_pengguna", JSON.stringify(data));
            setTimeout(()=>{
                window.location.href = "utama.html";
            },1500);
        }, err => {
            alert("Izin lokasi wajib diberikan!");
        });

    } catch(err){
        alert("Kamera wajib diizinkan!");
    }
}
