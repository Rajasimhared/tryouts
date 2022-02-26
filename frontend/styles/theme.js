import {
    createTheme,
    responsiveFontSizes
} from "@mui/material/styles";
import {
    deepPurple,
    amber
} from "@mui/material/colors";

// Create a theme instance.
let theme = createTheme({
    palette: {
        primary: deepPurple,
        secondary: amber,
        background: {
            default: 'rgb(0, 30, 60)'
        }
    },
    typography: {
        fontFamily: [
            'Work Sans',
            'sans-serif'
        ].join(','),
        button: {
            textTransform: 'none'
        }
    },

});

theme = responsiveFontSizes(theme);

export default theme;