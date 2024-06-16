import React, { useState } from 'react';
import MaterialTable from 'material-table';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import {
  Button, TextField, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { AddBox, Edit, DeleteOutline, FilterList } from '@material-ui/icons';
import useStyles from './styles';
import tableIcons from './tableIcons'; // Pastikan file tableIcons.js sudah diimplementasikan dengan benar
import { columns, initialData } from './data';
import logo from '../../assets/logo.png';

const LivestockTable = () => {
  const classes = useStyles();
  const [dataState, setDataState] = useState(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    namaProduk: '',
    kategori: '',
    status: 'Tersedia',
    stok: 0,
    tarif: 0,
    jamSewa: '6 jam',
    Cabang: '',
    keterangan: '',
    terakhirUpdate: new Date().toISOString().split('T')[0],
  });
  const [importedFileName, setImportedFileName] = useState('');

  const handleRowAdd = () => {
    setDataState(prevState => [...prevState, newProduct]);
    setDialogOpen(false);
    setNewProduct({
      namaProduk: '',
      kategori: '',
      status: 'Tidak Tersedia',
      stok: 0,
      tarif: 0,
      jamSewa: '6 jam',
      Cabang: '',
      keterangan: '',
      terakhirUpdate: new Date().toISOString().split('T')[0],
    });
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    const updatedData = [...dataState];
    const index = updatedData.findIndex(item => item === oldData);
    if (index !== -1) {
      updatedData[index] = newData;
      setDataState(updatedData);
    }
    resolve();
  };

  const handleRowDelete = (oldData, resolve) => {
    setDataState(prevState => prevState.filter(data => data !== oldData));
    resolve();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Livestock');

    // Add header row
    worksheet.addRow(Object.keys(dataState[0]));

    // Add data rows
    dataState.forEach((rowData) => {
      worksheet.addRow(Object.values(rowData));
    });

    // Generate Blob from workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Livestock.xlsx');
    });
  };

  const importFromFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx.load(event.target.result).then(workbook => {
        const worksheet = workbook.worksheets[0];
        const importedData = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1) { // Skip header row
            const rowData = {};
            columns.forEach((col, index) => {
              rowData[col.field] = row.getCell(index + 1).value;
            });
            importedData.push(rowData);
          }
        });
        setDataState(importedData); // Update state with imported data
        setImportedFileName(file.name); // Set imported file name for display
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={classes.table}>
        <h1 align="center">Livestock</h1>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={dataState}
        title=""
        options={{
          filtering: true,
          sorting: true,
          search: false,
          pageSize: 5,
          pageSizeOptions: [5, 10, 20],
          headerStyle: {
            backgroundColor: '#FF7200',
            color: '#FFF',
            fontSize: '1rem',
            textAlign: 'left',
          },
          rowStyle: {
            fontSize: '1rem',
          },
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: () => <tableIcons.Import />,
            tooltip: 'Import Data',
            isFreeAction: true,
            onClick: () => document.getElementById('raised-button-file').click(),
          },
          {
            icon: () => <AddBox />,
            tooltip: 'Add Barang',
            isFreeAction: true,
            onClick: () => setDialogOpen(true),
          }
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              handleRowDelete(oldData, resolve);
            })
        }}
      />
      <input
        accept=".xlsx, .xls"
        id="raised-button-file"
        type="file"
        style={{ display: 'none' }}
        onChange={importFromFile}
      />
      {importedFileName && (
        <Typography variant="body1" className={classes.importedFileName}>
          Imported file: {importedFileName}
        </Typography>
      )}
      <Button
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          className={classes.exportButton}
          startIcon={<CloudUploadIcon />}
          style={{ marginTop: '50px' }}
        >
          Export Data
        </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle className={classes.dialogTitle}>Tambah Produk</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            margin="dense"
            name="namaProduk"
            label="Nama Produk"
            type="text"
            fullWidth
            className={classes.textField}
            value={newProduct.namaProduk}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="kategori"
            label="Kategori"
            type="text"
            fullWidth
            className={classes.textField}
            value={newProduct.kategori}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            select
            fullWidth
            className={classes.textField}
            value={newProduct.status}
            onChange={handleInputChange}
          >
            <MenuItem value="Tersedia">Tersedia</MenuItem>
            <MenuItem value="Tidak Tersedia">Tidak Tersedia</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            name="stok"
            label="Stok"
            type="number"
            fullWidth
            className={classes.textField}
            value={newProduct.stok}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="tarif"
            label="Tarif"
            type="number"
            fullWidth
            className={classes.textField}
            value={newProduct.tarif}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="jamSewa"
            label="Jam Sewa"
            type="text"
            fullWidth
            className={classes.textField}
            value={newProduct.jamSewa}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Cabang"
            label="Cabang"
            type="text"
            fullWidth
            className={classes.textField}
            value={newProduct.Cabang}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="keterangan"
            label="Keterangan"
            type="text"
            fullWidth
            className={classes.textField}
            value={newProduct.keterangan}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="terakhirUpdate"
            label="Terakhir Update"
            type="date"
            fullWidth
            className={classes.textField}
            value={newProduct.terakhirUpdate}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Batal
          </Button>
          <Button onClick={handleRowAdd} color="primary">
  Tambah
</Button>
</DialogActions>
</Dialog>
</div>
);
};

export default LivestockTable;

