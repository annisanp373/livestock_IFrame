import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/logo.png';

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
  table: {
    width: '95%',
    margin: 'auto',
    fontSize: '1rem',  // Ukuran font untuk tabel
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
  },
  importButton: {
    margin: theme.spacing(2),
    backgroundColor: '#FF7200',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#E66100',
    },
    fontSize: '0,5rem',  // Ukuran font untuk tombol import
  },
  importedFileName: {
    marginLeft: theme.spacing(1),
    fontSize: '0,5rem',  // Ukuran font untuk nama file terimpor
  },
  dialogTitle: {
    backgroundColor: '#FF7200',
    color: '#FFF',
    textAlign: 'center',
    padding: theme.spacing(2),
    fontSize: '1rem',  // Ukuran font untuk judul dialog
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    minWidth: '400px',
    '& .MuiTextField-root': {
      fontSize: '0.75rem',  // Ukuran font untuk input TextField
    },
  },
  textField: {
    fontSize: '0.75rem',  // Ukuran font untuk input TextField
  },
  dialogActions: {
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  addButton: {
    backgroundColor: '#FF7200',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#E66100',
    },
    fontSize: '1rem',  // Ukuran font untuk tombol Tambah di dialog
  },
  cancelButton: {
    color: '#FF7200',
    fontSize: '1rem',  // Ukuran font untuk tombol Batal di dialog
  },
}));

export default useStyles;
