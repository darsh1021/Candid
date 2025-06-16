import './page1.css';
import Header from './Components/Header';
import Card from './Components/Card';

function Page1()
{
    return( <div >
      <div className="d1">
      <Header value="Candid"/>
    </div>
    
    <div className="d2">
      <Card/>
    </div>
    </div>);
}

export default Page1;