import { Snackbar, Alert } from "@mui/material";

interface SnackbarMessageProps {
    message: string;
    open: boolean;
    onClose: () => void;
}

export default function SnackbarMessage({
    message,
    open,
    onClose,
}: SnackbarMessageProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={onClose}
        >
            <Alert
                sx={{
                    bgcolor: "#8338EC",
                    color: "#fff",
                    "& .MuiAlert-icon": {
                        color: "#fff",
                    },
                }}
                onClose={onClose}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
