import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8338EC',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(131, 56, 236, 0.05)',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(131, 56, 236, 0.5)', // Cor inicial da borda
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8338EC !important', // Forçando a cor no hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8338EC !important', // Forçando a cor ao focar
                    },
                },
            },
        },
    },
});

export default theme;
