import React from 'react';
// import Logo from './images/avannis-logo-removebg-preview.png'
import Logo2 from './../images/avannisE.png'
import Logo from './../images/avannis.png'
// import { Button } from 'react-bootstrap'
import BanksDropdownHeader from './Banks/BanksDropdownHeader'
import {
  // Button,
  Navbar,
  NavbarBrand,
} from 'reactstrap';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FaUserCircle } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';


class Header extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      allBanks: this.props.allBanks,
      anchorEl: null,
    }
  }

  componentDidMount(){
    if (this.props.user){
      this.props.handleSignIn(this.props.user)
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.allBanks !== this.props.allBanks) {
      return true
    } else {
      return false
    }
  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  handleMenuLogout = () => {
    this.setState({ anchorEl: null });
    this.props.signOut()
  };

  

  render() {
    const { anchorEl } = this.state;
    return (
      <Navbar 
        light expand="md"
        className='headerTopRow'
        // style={{display: 'flex'}}
      >
        <div
          style={{display: 'inline-flex', flexDirection: 'row',  justifyContent: 'space-between'}}
        >
          <NavbarBrand href="/">
            <img style={{marginLeft: 10, marginTop:3}} id='logo' src={Logo} alt="Avannis Logo"></img>
          </NavbarBrand>

          <BanksDropdownHeader
            fetchBanks={this.props.fetchBanks}
            unSetLoadedBar={this.props.unSetLoadedBar}
            setLoadedBar={this.props.setLoadedBar}
            setProgressBarLoading={this.props.setProgressBarLoading}
            loadedShow={this.props.loadedShow} 
            loadingShow={this.props.loadingShow}
            loadAmount={this.props.loadAmount}
            banks={this.props.banks}
            allBanks={this.props.allBanks}
            showResults={this.props.showResults}
            selectedBank={this.props.selectedBank} 
          />
          <div style={{marginLeft: 100}}>
            <span id='userEmail' style={{color: 'white'}}>{this.props.user.attributes.email}</span>
            {/* <Button 
              size='sm' 
              // id='signOutButton' 
              onClick={() => this.props.signOut()}
              style={{marginLeft: 10}}
            >
              Sign out
            </Button> */}
            <Button
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenuClick}
              style={{color: 'white', fontSize:30}}
            >
              <FaUserCircle/>
              {/* <FiMenu/> */}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClose}
            >
              {/* <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleMenuClose}>My account</MenuItem> */}
              <MenuItem onClick={this.handleMenuLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>

      </Navbar>
      // {/* <header>
      //   <div>
      //     <div style={{color: 'white'}} className='headerTopRow'>
      //       <BanksDropdownHeader
      //         fetchBanks={this.props.fetchBanks}
      //         unSetLoadedBar={this.props.unSetLoadedBar}
      //         setLoadedBar={this.props.setLoadedBar}
      //         setProgressBarLoading={this.props.setProgressBarLoading}
      //         loadedShow={this.props.loadedShow} 
      //         loadingShow={this.props.loadingShow}
      //         loadAmount={this.props.loadAmount}
      //         banks={this.props.banks}
      //         allBanks={this.props.allBanks}
      //         showResults={this.props.showResults}
      //         selectedBank={this.props.selectedBank} 
      //        />
      //       <div id='userInfoContainer'>
      //         <span id='userEmail' >{this.props.user.attributes.email}</span>
      //         <Button size='sm' id='signOutButton' onClick={() => this.props.signOut()}>Sign out</Button>
      //         <img style={{marginLeft: 10}} id='logo' src={Logo} alt="Avannis Logo"></img>
      //         <div>adsfdas</div>
      //       </div>
      //     </div>
      //     <div>
      //     </div>
      //   </div>
      // </header> */}
    )
  }
}

export default (Header)