import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, CssBaseline, IconButton, Link, Tab, Tabs, Toolbar, Tooltip } from '@mui/material';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom';


export const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function Navbar(props)
{
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () =>
  {
    setOpen(true);
  };

  const handleDrawerClose = () =>
  {
    setOpen(false);
  };
  //handle if page opened not from tabs active page 
  let url = window.location.pathname;
  const tabsUrl = {
    "/notes": 0,
    "/notes/trash": 1,
    "/tasks": 3,
    "/tasks/done": 4
  };
  const [value, setValue] = React.useState(tabsUrl[url] || 0);

  const handleChange = (event, newValue) =>
  {
    setValue(newValue);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link component={NavLink} to="/" variant='h6' onClick={() => setValue(0)}>
            CoCo Notes
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider  />

        <Tabs orientation="vertical"
          value={value} onChange={handleChange} aria-label="navigation tabs">
          <Tab
            sx={{ justifyContent: "left" }}
            iconPosition="start"
            icon={
              <div
                style={{ minWidth: "56px", textAlign: "left" }}>
                <Tooltip title="All Notes"><StickyNote2RoundedIcon /></Tooltip>
              </div>}
            label="All Notes"
            to="/notes"
            component={NavLink} />
          <Tab
            sx={{ justifyContent: "left" }}
            iconPosition="start"
            icon={
              <div
                style={{ minWidth: "56px", textAlign: "left" }}>
                <Tooltip title="Notes Trash"><DeleteRoundedIcon /></Tooltip>
              </div>}
            label="Notes Trash"
            to="/notes/trash"
            component={NavLink} />
          <Tab
            sx={{ justifyContent: "left" }}
            iconPosition="start"
            icon={
              <div
                style={{ minWidth: "56px", textAlign: "left" }}>
                <Tooltip title="All Tasks"><TaskAltRoundedIcon /></Tooltip>
              </div>}
            label="All Tasks"
            to="/tasks"
            component={NavLink} />
          <Tab
            sx={{ justifyContent: "left" }}
            iconPosition="start"
            icon={
              <div
                style={{ minWidth: "56px", textAlign: "left" }}>
                <Tooltip title="Done Tasks"><CheckCircleRoundedIcon /></Tooltip>
              </div>}
            label="Done Tasks"
            to="/tasks/done"
            component={NavLink} />
        </Tabs>
      </Drawer>
      {props.children}
    </Box>
  );
}

export default Navbar