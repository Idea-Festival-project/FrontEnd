import styles from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/CodingGo-logo.png'
import { RiHomeFill } from "react-icons/ri";
import { RiHomeLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoCodeSharp } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";
import { BiTrophy } from "react-icons/bi";
import { BiSolidTrophy } from "react-icons/bi";
import { RiUser3Line } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";

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
          <NavLink 
            to='/main'
            className={({ isActive }) => 
              isActive ? `${styles.TabItems} ${styles.Active}` : styles.TabItems
            }>
              
            {({ isActive }) => (
              <>
                {isActive ? (
                  <RiHomeFill size={25} className={styles.TabIcons} />
                ) : (
                  <RiHomeLine size={25} className={styles.TabIcons} />
                )}
                <p>홈</p>
              </>
            )}

          </NavLink>

          <NavLink 
            to='/community'
            className={({ isActive }) => 
              isActive ? `${styles.TabItems} ${styles.Active}` : styles.TabItems
            }>
              
            {({ isActive }) => (
              <>
                {isActive ? (
                  <BsFillPeopleFill size={25} className={styles.TabIcons} />
                ) : (
                  <BsPeople size={25} className={styles.TabIcons} />
                )}
                <p>커뮤니티</p>
              </>
            )}
            
          </NavLink>

          <NavLink 
            to='/problems'
            className={({ isActive }) => 
              isActive ? `${styles.TabItems} ${styles.Active}` : styles.TabItems
            }>
              
            {({ isActive }) => (
              <>
                {isActive ? (
                  <IoCodeSlash size={25} className={styles.TabIcons} />
                ) : (
                  <IoCodeSharp size={25} className={styles.TabIcons} />
                )}
                <p>문제</p>
              </>
            )}
            
          </NavLink>

          <NavLink 
            to='/ranking'
            className={({ isActive }) => 
              isActive ? `${styles.TabItems} ${styles.Active}` : styles.TabItems
            }>
              
            {({ isActive }) => (
              <>
                {isActive ? (
                  <BiSolidTrophy size={25} className={styles.TabIcons} />
                ) : (
                  <BiTrophy size={25} className={styles.TabIcons} />
                )}
                <p>랭킹</p>
              </>
            )}
            
          </NavLink>

          <NavLink 
            to='/mypage'
            className={({ isActive }) => 
              isActive ? `${styles.TabItems} ${styles.Active}` : styles.TabItems
            }>
              
            {({ isActive }) => (
              <>
                {isActive ? (
                  <RiUser3Fill size={25} className={styles.TabIcons} />
                ) : (
                  <RiUser3Line size={25} className={styles.TabIcons} />
                )}
                <p>마이페이지</p>
              </>
            )}
            
          </NavLink>
        </div>

        <div className={styles.Atti}>

        </div>
      </div>
  )
}

export default NavBar