import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAdmin from '../../Hooks/useAdmin';
import { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';
//import useVisitCounter from '../visiteCounter/useVisitCounter';
const drawerWidth = 240;

function HeaderSidebar(props) {
  const [isAdmin] = useAdmin()
  //useVisitCounter()
  console.log(isAdmin?.admin)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext)
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  }

  const drawer = (
    <div className='bg-[#ede7e1] '>
      <div className="bg-gray-800 min-h-screen">
        <div className="p-4">
          <ul className="mt-4 ">
            {
              isAdmin?.admin ? (
                <>
                  <NavLink to="/dashboard">
                    <li className={`py-2 ${location.pathname === '/' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 hover:bg-red-900 py-2 w-full p-2 rounded-md mt-2`}>Home</li>
                  </NavLink>

                  <NavLink to="/dashboard/add-new-doc">
                    <li className={`py-2 ${location.pathname === '/medicines' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>Add new doctor</li>
                  </NavLink>


                  <NavLink to="/dashboard/chat-room">
                    <li className={`py-2 ${location.pathname === '/chat-room' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>Arrange a meeting</li>
                  </NavLink>


                  <NavLink to="/dashboard/all-ambulance">
                    <li className={`py-2 ${location.pathname === '/all-ambulance' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>All Ambulance</li>
                  </NavLink>


                  <NavLink to="/dashboard/add-new-ambulance">
                    <li className={`py-2 ${location.pathname === '/add-new-ambulance' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>Add new ambulance</li>
                  </NavLink>


                  <NavLink to="/dashboard/all-users">
                    <li className={`py-2 ${location.pathname === '/all-users' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>All Users</li>
                  </NavLink>

                  <NavLink to="/dashboard/total-visits">
                    <li className={`py-2 ${location.pathname === '/total-visits' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>Total Visits</li>
                  </NavLink>
                  <NavLink to="/dashboard/medic-guide">
                    <li className={`py-2 ${location.pathname === '/medic-guide' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>Doctors</li>
                  </NavLink>


                  <NavLink to="/dashboard/my-requests">
                    <li className={`py-2 ${location.pathname === '/my-requests' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 hover:bg-red-900 py-2 w-full p-2 rounded-md mt-2`}>My Requests</li>
                  </NavLink>

                  <div className='border-2 border-gray-500 mt-6 mb-4'></div>

                  <NavLink to="/dashboard/my-Bookings">
                    <li className={`py-2 ${location.pathname === '/my-Bookings' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>My Bookings</li>
                  </NavLink>
                </>
              ) : isAdmin?.doctor ? (
                <>

                  <NavLink to="/dashboard">
                    <li className={`py-2 ${location.pathname === '/' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 hover:bg-red-900 py-2 w-full p-2 rounded-md mt-2`}>Home</li>
                  </NavLink>
                  <NavLink to="/dashboard/requests">
                    <li className={`py-2 ${location.pathname === '/requests' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>Request</li>
                  </NavLink>


                  <NavLink to="/dashboard/medic-guide">
                    <li className={`py-2 ${location.pathname === '/medic-guide' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>Doctors</li>
                  </NavLink>


                  <NavLink to="/dashboard/my-requests">
                    <li className={`py-2 ${location.pathname === '/my-requests' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 hover:bg-red-900 py-2 w-full p-2 rounded-md mt-2`}>My Requests</li>
                  </NavLink>

                  <div className='border-2 border-gray-500 mt-6 mb-4'></div>

                  <NavLink to="/dashboard/my-Bookings">
                    <li className={`py-2 ${location.pathname === '/my-Bookings' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>My Bookings</li>
                  </NavLink>
                </>
              ) : (
                <>

                  <NavLink to="/dashboard">
                    <li className={`py-2 ${location.pathname === '/' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 hover:bg-red-900 py-2 w-full p-2 rounded-md mt-2`}>Home</li>
                  </NavLink>

                  <NavLink to="/dashboard/medic-guide">
                    <li className={`py-2 ${location.pathname === '/medic-guide' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>Doctors</li>
                  </NavLink>


                  <NavLink to="/dashboard/my-requests">
                    <li className={`py-2 ${location.pathname === '/my-requests' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 hover:bg-red-900 py-2 w-full p-2 rounded-md mt-2`}>My Requests</li>
                  </NavLink>

                  <div className='border-2 border-gray-500 mt-6 mb-4'></div>

                  <NavLink to="/dashboard/my-Bookings">
                    <li className={`py-2 ${location.pathname === '/my-Bookings' ? 'bg-red-500' : ''} text-white bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2`}>My Bookings</li>
                  </NavLink>

                </>
              )
            }

            <li onClick={handleLogout} className="text-white cursor-pointer bg-white bg-opacity-20 py-2 w-full p-2 rounded-md mt-2">Logout</li>

          </ul>
        </div>


      </div>


    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#1f150c",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Link to="/"><h2 className='font-serif'>HealthCare</h2></Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet></Outlet>
        <Toaster></Toaster>
      </Box>
    </Box>
  );
}

HeaderSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default HeaderSidebar;