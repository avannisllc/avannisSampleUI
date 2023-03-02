import React from 'react';
// import Logo from './images/avannis-logo-removebg-preview.png'
import Logo from './../images/avannisA.png'
// import { Button } from 'react-bootstrap'
import BanksDropdownHeader from './Banks/BanksDropdownHeader'
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Navbar,
  NavbarBrand,
} from 'reactstrap';

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      allBanks: this.props.allBanks 
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
  render() {
    return (
      <Navbar 
        color="light" 
        light expand="md"
        className='headerTopRow'
        style={{display: 'inline-flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
      >
        <NavbarBrand href="/">
          <img style={{marginLeft: 10}} id='logo' src={Logo} alt="Avannis Logo"></img>
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
        <div>
          <span id='userEmail' >{this.props.user.attributes.email}</span>
          <Button 
            size='sm' 
            // id='signOutButton' 
            onClick={() => this.props.signOut()}
            style={{marginLeft: 10}}
          >
            Sign out
          </Button>
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