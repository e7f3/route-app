// Создание и настройка темы Material UI

import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
  palette: {
    

    neutral: {
      main: '#3d3d3d',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
})

// Responsive шрифты

theme = responsiveFontSizes(theme)

export default theme
