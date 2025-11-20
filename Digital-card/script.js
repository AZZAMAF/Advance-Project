

const searchButton = document.querySelector('#search-button')
searchButton.addEventListener('click', function () {
    const inputKeyword = document.querySelector('#searchInput')
    const data = new getData(inputKeyword.value)
    updateUI(data)

})

function updateUI(data) {
    let cards = ''
    data.forEach(m => cards += showCard(m))
    const dataContainer = document.querySelector('#BodyCard')
    dataContainer.innerHTML = cards

}







function getData(query) {
    // Menggunakan RandomUser API sebagai contoh
    // Parameter 'query' bisa diisi dengan '?results=1' atau dikosongkan
    const url = 'https://randomuser.me/api/' + (query || '');

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                // Tangani kesalahan jaringan/HTTP (404, 500, dll.)
                throw new Error(`Kesalahan HTTP: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.results || data.results.length === 0) {
                // Tangani kasus tidak ada hasil
                throw new Error("Tidak ada data user yang ditemukan.");
            }

            const user = data.results[0];

            // Mengembalikan objek yang berisi nama, alamat, dan telepon
            return {
                nama: `${user.name.first} ${user.name.last}`,
                alamat: `${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
                telepon: user.phone
            };
        });
}

console.log(getData())

function showCard(m) {
    return `<div class="p-6 space-y-4">
                <!-- Item: Nama -->
                <div class="flex items-center space-x-3 p-3 bg-indigo-50/70 rounded-lg border border-indigo-200">
                    <!-- Icon Nama -->
                    <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>

                    <div>
                        <p class="text-xs font-semibold uppercase text-gray-500">Nama</p>
                        <p class="text-lg font-bold text-gray-800">${m.sekolah}</p>
                    </div>
                </div>

                <!-- Item: Alamat (Kota) -->
                <div class="flex items-center space-x-3 p-3 bg-indigo-50/70 rounded-lg border border-indigo-200">
                    <!-- Icon Alamat -->
                    <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z">
                        </path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>

                    <div>
                        <p class="text-xs font-semibold uppercase text-gray-500">Alamat</p>
                        <p class="text-lg font-bold text-gray-800">Jakarta, Indonesia</p>
                    </div>
                </div>

                <!-- Item: Telepon -->
                <div class="flex items-center space-x-3 p-3 bg-indigo-50/70 rounded-lg border border-indigo-200">
                    <!-- Icon Telepon -->
                    <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                        </path>
                    </svg>

                    <div>
                        <p class="text-xs font-semibold uppercase text-gray-500">Telepon</p>
                        <p class="text-lg font-bold text-gray-800">+62 812-3456-7890</p>
                    </div>
                </div>

            </div>`
}