import s from './style.module.scss'
import userAvatar from '../../images/user-avatar.svg'
import arrowDown from '../../images/arrow-down.svg'
import { useEffect, useRef, useState } from 'react'

const Header = () => {

  const [ isOpenDropDown, setIsOpenDropDown ] = useState(false)
  const dropDownRef = useRef<HTMLDivElement>(null)

  const handleProfile = () => setIsOpenDropDown(!isOpenDropDown);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
    if (
      isOpenDropDown && 
      dropDownRef.current && 
      !dropDownRef.current.contains(e.target as Node)
    ) {
      setIsOpenDropDown(false);
    }
  };

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpenDropDown])

  const homeLink = process.env.NODE_ENV === 'production' ? '/KanbanBoard' : '/'; // Чтобы работала и на GHPages и локально

  return(
    <header className={s.header}>
      <div className={s.title}>
        <h1><a href={homeLink}>Awesome Kanban Board</a></h1>
      </div>

      <div className={s.profile} onClick={handleProfile} ref={dropDownRef}>
        <img className={s.userAvatar} src={userAvatar} alt="user-avatar" />
        <img className={`${s.dropArrow} ${isOpenDropDown ? s.rotated : ''}`} src={arrowDown} alt="arrow" />
        <div className={`${s.dropDownMenu} ${isOpenDropDown ? s.opened : s.closed}`}>
          <div className={s.arrow}></div>
          <ul className={s.dropDownList}>
            <li className={s.dropDownItem}>
              <a className={s.dropDownLink} href="#">Profile</a>
            </li>
            <li className={s.dropDownItem}>
              <a className={s.dropDownLink} href="#">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header;