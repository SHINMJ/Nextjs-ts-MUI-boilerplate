import React from 'react'
import { Container, CssBaseline, Grid, Box } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import SideMenu from './SideBar'
import Header from './Header'
import Footer from './Footer'
import { PageProps } from '@pages/_app'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // height: '100%',
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar,
    authContent: {
      padding: '2.5rem',
    },
  }),
)

interface ILayoutProps extends PageProps {
  children: React.ReactNode
  className?: string
  title?: string
}

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps) => {
  const { children, className, title } = props
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={`${classes.root} ${className}`}>
      {/* <CssBaseline /> */}
      <Header open={open} onClick={handleDrawerOpen} title={title} />

      <SideMenu
        open={open}
        onClick={handleDrawerClose}
        logoText="MSA Admin"
        logo="/images/adminLogo.png"
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
          <Grid container spacing={3}></Grid>
        </Container>
        <Footer />
      </main>
    </div>
  )
}

export { Layout }
