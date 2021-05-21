import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[700],
      main: grey[800],
      dark: grey[900],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
