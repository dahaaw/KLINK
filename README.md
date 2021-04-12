# KLINK

**Note**  
`Pastikan PC sudah terinstall redis, dan sudah running.
`   

## Penggunaan

### Persiapan Database
Buat database di mysql dengan nama klink

### Clone repository, dan install node packages

``` 
git clone https://github.com/dahaaw/KLINK.git
cd KLINK
npm install
npm start
```

### Testing
Gunakan postman untuk testing, <br/>
Import collection dari [https://www.getpostman.com/collections/03bf63e6f82f22959f65](https://www.getpostman.com/collections/03bf63e6f82f22959f65)<br/>
untuk dokumentas bisa diakses di [https://documenter.getpostman.com/view/3877565/TzCV4QGz](https://documenter.getpostman.com/view/3877565/TzCV4QGz) 
#### 1. Tambah User
#### 2. Login
Setelah login berhasil sistem akan mengirim token sebagai cookies di postman
#### 3. Tambah Master Produk
Catat id product untuk penambahan cart nanti 
#### 4. Tambah Cart
#### 5. Buat Transaction
Catat id transaksi dan total untuk konfirmasi pembayaran
#### 6. Konfirmasi Pembayaran
Status transaksi menjadi paid
