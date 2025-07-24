import SearchBar from "./SearchBar";
import SplitText from "../Components/SplitText";

export default function HomePageSearch(){
    return(
        <div
          style={{
            background: 'url(/bg.svg) no-repeat center top',
            backgroundSize: 'cover',
            height: '550px',
            lineHeight: '3rem',
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            marginBottom: '20px'
          }}>
          <div style={{maxWidth:'1200px', padding: '10.5rem 2rem', margin: '0 auto'}}>
            <SplitText />
            <SearchBar />
          </div>
        </div>
    )
}