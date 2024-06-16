export const columns = [
    { title: 'Nama Produk', field: 'namaProduk' },
    { title: 'Kategori', field: 'kategori' },
    { title: 'Status', field: 'status' },
    { title: 'Stok', field: 'stok' },
    { title: 'Tarif', field: 'tarif' },
    { title: 'Jam Sewa', field: 'jamSewa' },
    { title: 'Cabang', field: 'Cabang' },
    { title: 'Keterangan', field: 'keterangan' },
    { title: 'Terakhir Update', field: 'terakhirUpdate' }
];

export const initialData = [
    {
        namaProduk: 'Produk 1',
        kategori: 'Kategori 1',
        status: 'Tersedia',
        stok: 10,
        tarif: 10000,
        jamSewa: '6 jam',
        Cabang: 'Cabang 1',
        keterangan: 'Keterangan 1',
        terakhirUpdate: '2023-01-01',
    },
    {
        namaProduk: 'Produk 2',
        kategori: 'Kategori 2',
        status: 'Tidak Tersedia',
        stok: 5,
        tarif: 15000,
        jamSewa: '12 jam',
        Cabang: 'Cabang 2',
        keterangan: 'Keterangan 2',
        terakhirUpdate: '2023-02-01',
    },
    {
        namaProduk: 'Produk 3',
        kategori: 'Kategori 3',
        status: 'Tersedia',
        stok: 8,
        tarif: 12000,
        jamSewa: '24 jam',
        Cabang: 'Cabang 3',
        keterangan: 'Keterangan 3',
        terakhirUpdate: '2023-03-01',
    }
];
