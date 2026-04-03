//components/PortfolioCard.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regular} from '@fortawesome/free-regular-svg-icons'
import { faHeart as solid} from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react';
import { ThemeDataContext } from '../utils/ThemeSwitcher';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { ProfileCardData } from '../utils/ProfileCardData'

const PortfolioCard = () => {
    const initialState = 0;
    const {theme} = useContext(ThemeDataContext);
      const {icon} = useContext(ThemeDataContext);
      const [likes,setLikes] = useState(initialState);
      const [liked, setLiked] = useState(false);
      const [currPage,setCurrPage] = useState(1);
      const handleClick = ()=>{
        setLikes(prev=>prev+1);
        setLiked(true);
        sessionStorage.setItem(currPage,likes+1);
      }

      useEffect(()=>{
        const profileLikedCount = sessionStorage.getItem(currPage);
        profileLikedCount > 0 ? (setLikes(profileLikedCount),setLiked(true)) : setLiked(false);
      },[])
      const handleBack=()=>{
        setCurrPage(prev => {const previous = prev === 1 ? prev : prev-1
            const profileLikedCount = sessionStorage.getItem(previous);
            profileLikedCount > 0 ? (setLikes(profileLikedCount),setLiked(true)) : (setLikes(initialState),setLiked(false));
            return previous;
        });
      }
      const handleFront=()=>{
        setCurrPage(prev => {const next = prev < ProfileCardData.length ? prev + 1 : prev;        
            const profileLikedCount = sessionStorage.getItem(next);
            profileLikedCount ? (setLikes(profileLikedCount),setLiked(true)) : (setLikes(initialState),setLiked(false));
            return next;
        });
      }
  return (
    ProfileCardData.map((profile)=>(
        currPage === profile.id ? (
            <div className="portfolio" key={profile.id}>
                <div className="intro">
                    <img className="profile-img" src={profile.image} alt={profile.name}/>
                    <div style={{width: "100%"}}>
                        <span className="name">{profile.name}</span>
                        <p className="role">{profile.domain}</p>   
                    </div>   
                </div>
            
                <p className="about-me">{profile.aboutMe}</p>
                <span className="skill-heading">Skills</span>
                <div className="skill-container">
                    {
                        profile.skills.map((skill)=>(
                            <span key={crypto.randomUUID()} className="skill">{skill}</span>
                        ))
                    }
                </div>
                <footer>
                    <span><FontAwesomeIcon icon={icon} />{theme}</span>
                    <div>
                    <span>  <FontAwesomeIcon icon={faCaretLeft} onClick={handleBack} style={{cursor: "pointer"}}/></span>
                    <span> <FontAwesomeIcon icon={faCaretRight} onClick={handleFront} style={{cursor: "pointer"}}/></span>
                    <span> {parseInt(currPage)}/{ProfileCardData.length}</span>
                    </div>
                    <span><FontAwesomeIcon icon={liked ? solid : regular} onClick={handleClick} id="likes" className={liked ? "solid" : "regular"}/>{likes}</span>
                    <button><FontAwesomeIcon icon={faEnvelope} style={{paddingRight: '5px'}}/>Contact</button>
                </footer>
            </div>
        ) : (null)
    ))
    
  )
}

export default PortfolioCard
