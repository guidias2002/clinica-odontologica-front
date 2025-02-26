import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8338EC',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(131, 56, 236, 0.05)',
                    border: 'none',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: '#8338EC',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#8338EC',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(131, 56, 236, 0.05)',
                    border: 'none',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: '#8338EC', // Borda roxa ao passar o mouse
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#8338EC', // Borda roxa quando em foco
                        },
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(131, 56, 236, 0.05)', // BG com 5% de opacidade
                    borderRadius: '8px',
                    '& fieldset': {
                        borderColor: 'rgba(131, 56, 236, 0.5)', // Cor inicial da borda
                    },
                    '&:hover fieldset': {
                        borderColor: '#8338EC', // Borda roxa ao passar o mouse
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#8338EC', // Borda roxa quando focado
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(131, 56, 236, 0.05)',
                    borderRadius: '8px',
                },
            },
        },
    },
});

export default theme;
