// kelas parent
class Pendaftar {
    constructor(nama, umur, uangSangu) {
        // 3 Properti
        this.nama = nama;
        this.umur = umur;
        this.uangSangu = uangSangu;
    }
}

// mengelola daftar pendaftar
class ListPendaftar {
    constructor() {
        // properti sebagai array untuk nyimpan list pendaftar
        this.listPendaftar = [];
    }

    // Menambahkan pendaftar ke dalam list
    tambahPendaftar(pendaftar) {
        this.listPendaftar.push(pendaftar);
    }

    // Menghitung rata-rata uang sangu dari list pendaftar
    hitungRataRataUangSangu() {
        let total = 0;
        this.listPendaftar.forEach((pendaftar) => {
            total += pendaftar.uangSangu;
        });
        return total / this.listPendaftar.length;
    }

    // Menghitung rata-rata umur dari list pendaftar
    hitungRataRataUmur() {
        let total = 0;
        this.listPendaftar.forEach((pendaftar) => {
            total += pendaftar.umur;
        });
        return total / this.listPendaftar.length;
    }
}
// instance dari kelas ListPendaftar
const listPendaftar = new ListPendaftar();

// Mengupdate tampilan resume dengan nilai rata-rata
function updateResume() {
    const rataRataUangSangu = listPendaftar.hitungRataRataUangSangu();
    const rataRataUmur = listPendaftar.hitungRataRataUmur();
    const resume = document.getElementById("resume");
    resume.innerHTML = `Rata-rata pendaftar memiliki uang sangu sebesar ${rataRataUangSangu} dengan rata-rata umur ${rataRataUmur}`;
}

// Menambahkan data pendaftar ke dalam ta bel
function addPendaftarToTable(pendaftar) {
    const tabelPendaftar = document.getElementById("tabelPendaftar");
    const row = tabelPendaftar.insertRow();

    // Menambahkan setiap properti pendaftar sebagai sel dalam baris tabel
    for (const key in pendaftar) {
        const cell = row.insertCell();
        cell.textContent = pendaftar[key];
    }
}

// Memvalidasi form registrasi
function validateForm(nama, umur, uangSangu) {
    if (nama.length < 10) {
        alert("Minimal Nama harus 10 Karakter");
        return false;
    } else if (isNaN(umur) || umur < 25) {
        alert("Minimal Umur harus Berusia 25 Tahun");
        return false;
    } else if (isNaN(uangSangu) || uangSangu < 100000 || uangSangu > 1000000) {
        alert("Minimal Uang sangu harus diantara 100.000 sampai 1.000.000");
        return false;
    }
    return true;
}

// Fungsi untuk menunda eksekusi
async function delay(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

// Menangani submit form dengan penundaan selama 5 detik
document
    .getElementById("formRegistrasi")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value;
        const umur = parseInt(document.getElementById("umur").value);
        const uangSangu = parseInt(document.getElementById("uangSangu").value);

        if (!validateForm(nama, umur, uangSangu)) {
            alert("Data yang anda masukkan salah, silahkan masukkan ulang");
            return;
        }

        // Menunda eksekusi selama 5 detik
        await delay(5000);

        const pendaftar = new Pendaftar(nama, umur, uangSangu);
        listPendaftar.tambahPendaftar(pendaftar);
        addPendaftarToTable(pendaftar);
        updateResume();

        document.getElementById("nama").value = "";
        document.getElementById("umur").value = "";
        document.getElementById("uangSangu").value = "";
    });
