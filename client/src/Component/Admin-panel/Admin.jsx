import { useState, useEffect } from 'react';
import {
  Link,
  Outlet,
  useMatch,
  useResolvedPath,
  useLocation,
  useNavigate
} from 'react-router-dom';
import adminMenu from "../../json-Api/Admin-menu.json";
import { deepOrange } from '@mui/material/colors';
import MediaQuery from 'react-responsive';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Stack,
  Toolbar,
  IconButton,
  ListSubheader,
  Collapse,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Breadcrumbs,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material';
import logo from "./logo.png"
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from "../Login/login.action"



const Admin = () => {
  const [activeOnMobile, setActiveOnMobile] = useState(false);
  const [active, setActive] = useState(true);
  const [width, setWidth] = useState(250);
  const [collapse, setCollapse] = useState(false);
  const [parent, setParent] = useState(null);
  const [user, setUser] = useState(null);
  const [mode , setMode]= useState("light");
  const open = Boolean(parent);
  const location = useLocation();
  const routing = location.pathname.split("/");
  const loginReducer  = useSelector(response => response.loginReducer);
  const  adminReducer  = useSelector(response => response.adminReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();


// dark and light label controll
  const darkMode = (e)=>{
    if(e.target.checked){
      dispatch({
        type : "dark"
      })
      setMode("Dark")
    }else{
      setMode("Light")
      dispatch({
        type : "light"
      })
    }
  }

  //openProfileMenu
  const openProfileMenu = (e) => {
    const el = e.currentTarget
    return setParent(el)
  }

  const showUserInfo = () => {
    if (!user) {
      let userInfo = JSON.parse(sessionStorage.getItem("user"));
      return setUser(userInfo)

    }

  }

  const checkForLogout = () => {
    if (loginReducer.isLogout) {

      dispatch({
        type : "light"
      })
      return navigate("/login")
    }
  }

  //show user info
  useEffect(() => {
    showUserInfo();
    checkForLogout()
  }, [user, loginReducer])

  // drawer controller
  const controlDrawerOnDesktop = () => {
    return (
      //  setActive(!active),
      //  active ? setWidth(0) : setWidth(250)
      width == 250 ? setWidth(70) : setWidth(250)
    )
  }

  const controlDrawerOnMobile = () => {
    return (
      setActiveOnMobile(!activeOnMobile),
      activeOnMobile ? setWidth(0) : setWidth(250)

    )
  }


  // menu header list 
  const MenuList = ({ item }) => {
    const menuDesign = (
      <>
        <List subheader={<ListSubheader>
          {item.cat}
        </ListSubheader>}>
          {
            item.menus.map((menu, index) => {
              return <Nav menu={menu} key={index} />
            })
          }
        </List>
      </>

    );
    return menuDesign
  }


  // navitems
  const Nav = ({ menu }) => {
    const resolved = useResolvedPath(menu.link ? menu.link : false);
    const activeLink = useMatch({
      path: resolved.pathname,
      end: true
    })


    const NavDesign = (
      <>
        <ListItem sx={{ py: 0 }}>
          <ListItemButton
            LinkComponent={Link}
            to={menu.link ? menu.link : null}
            onClick={menu.isDropdown ?
              () => setCollapse(!collapse)
              : null
            }
            sx={{
              bgcolor: activeLink && menu.link ? deepOrange[500] : null,
              color: activeLink && menu.link ? "white" : null,
              "&:hover": {
                bgcolor: activeLink && menu.link ? deepOrange[300] : null
              }
            }}

          >
            <ListItemIcon>
              <span className="material-icons"
                style={{
                  color: activeLink && menu.link ? "white" : null

                }}
              >{menu.icon}</span>
            </ListItemIcon>
            <ListItemText primary={menu.label} />
            {
              menu.isDropdown ?
                <span className="material-icons">expand_more</span>
                : null
            }
          </ListItemButton>
        </ListItem>
        {
          menu.isDropdown ?
            <Dropdown dmenu={menu.dropdownMenu} />
            : null
        }
      </>
    );
    return NavDesign
  }

  // dropdown
  const Dropdown = ({ dmenu }) => {
    const dropdownDesign = (
      <>
        <Collapse sx={{ pl: 4 }} in={collapse}>
          {
            dmenu.map((data, index) => {
              return <Nav menu={data} key={index} />
            })
          }
        </Collapse>
      </>
    );
    return dropdownDesign
  }

  const DesktopDrawer = () => {
    const tmp = (
      <>
        <Drawer
          variant='persistent'
          open={active}
          onMouseOver={() => setWidth(250)}
          sx={{
            width: width,
            "& .MuiDrawer-paper": {
              width: width,
            //  bgcolor: "#fff",
              transition: "0.3s"
            }
          }}>
          <List sx={{ mb: 0 ,mt: 2 }} subheader={<ListSubheader>
            <img src={logo} height="70" width="200" alt="brand-logo" />
          </ListSubheader>}>   
          {
            adminMenu.map((item, index) => {
              return < MenuList item={item} key={index} />
            })
          }
       </List>
        </Drawer>
      </>
    );
    return tmp
  }

  const MobileDrawer = () => {
    const tmp = (
      <>
        <Drawer
          variant='temporary'
          open={activeOnMobile}
          onClick={controlDrawerOnMobile}
          sx={{
            width: width,
            "& .MuiDrawer-paper": {
              width: width,
            //  bgcolor: "#fff",
              transition: "0.3s"
            }
          }}>
          <List sx={{ mb: 0 }} subheader={<ListSubheader>
            <img src="images/logo.png" height="70" width="200" alt="brand-logo" />
          </ListSubheader>}></List>
          {
            adminMenu.map((item, index) => {
              return < MenuList item={item} key={index} />
            })
          }
        </Drawer>
      </>
    );
    return tmp
  }

  const design = (
    <>
      <Stack>
        <MediaQuery minWidth={1224}>
          <DesktopDrawer />
        </MediaQuery>

        <MediaQuery maxWidth={1224}>
          <MobileDrawer />
        </MediaQuery>

        <AppBar
          position='fixed'
          elevation={0}
          sx={{
            width: {
              xs: "100%",
              md: `calc(100% - ${width}px)`
            },
            transition: "0.3s",
            background: adminReducer.dark ? "inherit" : "white"

          }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >


            <Toolbar>
              <Stack direction="row" alignItems="center" spacing="12px">
                <MediaQuery minWidth={1224}>
                  <IconButton onClick={controlDrawerOnDesktop}>
                    <span className="material-icons-outlined">menu</span>
                  </IconButton>
                  <IconButton >
                    <span className="material-icons-outlined">email</span>
                  </IconButton>
                  <IconButton >
                    <span className="material-icons-outlined">web_asset</span>
                  </IconButton>
                  <IconButton >
                    <span className="material-icons-outlined">star</span>
                  </IconButton>
                </MediaQuery>
                <MediaQuery maxWidth={1224}>
                  <IconButton onClick={controlDrawerOnMobile}>
                    <span className="material-icons-outlined">menu</span>
                  </IconButton>
                </MediaQuery>

              </Stack>
            </Toolbar>
            <Toolbar>
          
              <Stack direction="row" alignItems="center" spacing="12px">
                  <FormGroup sx={{
                    color :  adminReducer.dark ? "white" : "black"
                    }}>
                    <FormControlLabel 
                     control={<Switch onChange={darkMode} />}
                      label={mode} />
                </FormGroup>
                <IconButton >
                  <span className="material-icons-outlined">notifications</span>
                </IconButton>
                <IconButton >
                  <span className="material-icons-outlined">shopping_cart</span>
                </IconButton>
                <IconButton >
                  <span className="material-icons-outlined">search</span>
                </IconButton>
                <IconButton onClick={openProfileMenu}>
                  <Avatar src='https://mui.com/static/images/avatar/3.jpg' alt="Travis Howard" />
                </IconButton>
                <Menu
                  open={open}
                  onClick={() => setParent(null)}
                  anchorEl={parent}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <span style={{ marginRight: "12px" }} className="material-icons-outlined">home</span>
                      Home
                    </ListItemIcon>
                  </MenuItem>

                  <MenuItem>
                    <ListItemIcon>
                      <span style={{ marginRight: "12px" }} className="material-icons-outlined">person</span>
                      {
                        user && user.name
                      }
                    </ListItemIcon>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <span style={{ marginRight: "12px" }} className="material-icons-outlined">email</span>
                      {
                        user && user.email
                      }
                    </ListItemIcon>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <span style={{ marginRight: "12px" }} className="material-icons-outlined">phone</span>
                      {
                        user && user.mobile
                      }
                    </ListItemIcon>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <span style={{ marginRight: "12px" }} className="material-icons-outlined">settings</span>
                      Setting
                    </ListItemIcon>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon onClick={() => dispatch(logoutRequest())}>
                      <span
                        style={{ marginRight: "12px" }}
                        className="material-icons-outlined"
                      >logout</span>
                      Logout
                    </ListItemIcon>
                  </MenuItem>
                </Menu>
              </Stack>
            </Toolbar>

          </Stack>
        </AppBar>
        <Stack sx={{
          ml: {
            xs: 0,
            md: `${width}px`
          },
          p: 3,
          mt: 4,
          transition: "0.3s",
          bgcolor: adminReducer.dark ? "inherit" : "#f5f5f5",
          minHeight: "100vh"
        }}>
          <Breadcrumbs sx={{ my: 4 }}>
            {
              routing.map((item, index) => {
                if (index > 0) {
                  return (
                    <Typography key={index} >
                      {item}
                    </Typography>)
                }
              })
            }
          </Breadcrumbs>
          <Outlet />
        </Stack>
      </Stack>
    </>
  )
  return design

}

export default Admin