import './App.css';
import yummyData from './data/yummy.json';



const FoodItem = ()=> {

}


const FoodCategory = ({items})=> {
  return (<>
    {Object.values(items).map(item => {
      return (<div className='item'>
        <h5>{item.name} - {item.price}</h5>
      </div>)
    })}
  </>)
}

const FoodMenu = ({data})=> {
  return (<>
    {Object.values(data).map(category => {
      return (<div className='category'>
        <h2>{category.name}</h2>
        <FoodCategory items={category.items} />
      </div>)
    })}
  </>)
}

function App() {
  console.log(yummyData)
  return (
    <FoodMenu data={yummyData.foods} />
  );
}

export default App;
