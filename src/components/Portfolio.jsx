//components/Portfolio.jsx
import PortfolioCard from './PortfolioCard'
import "../assets/css/portfolio.css";


const Portfolio = () => {
  return (
    <div id="portfolio" style={{height: "100vh"}}>
      <div className="Portfolio">
        <PortfolioCard />
      </div>
    </div>
    
  )
}

export default Portfolio
