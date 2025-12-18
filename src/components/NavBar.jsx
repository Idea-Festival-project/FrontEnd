import styles from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/CodingGo-logo.png'
import { PiFire } from "react-icons/pi";
import { RiHomeFill } from "react-icons/ri";
import { RiHomeLine } from "react-icons/ri";

function NavBar() {


  return(
      <div className={styles.NavBar}>

        <div className={styles.LogoBox}>
          <img src={Logo} />
        </div>

        {/* <div className={styles.StreakAndPoints}>
          <div className={styles.StreakBox}>
            <div className={styles.StreakIconBox}>
              <PiFire size={30} color='rgb(216, 97, 18)' />
            </div>
            <div>
              <h5>연속 학습일</h5>
              <h3 style={{color : 'red'}}>{}일</h3>             
            </div>

          </div>


          
        </div> */}

        <div className={styles.NavTab}>
          <NavLink className={styles.TabItems}
            to='/main'
            style={({isActive}) => ({
              backgroundColor: isActive ? 'yellow' : 'transparent'
            })}>
            <RiHomeFill size={25} className={styles.TabIcons}/>
            <p>홈</p>
          </NavLink>
        </div>

        <div className={styles.Atti}>

        </div>
      </div>
  )
}

export default NavBar