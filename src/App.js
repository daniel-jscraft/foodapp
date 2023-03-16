import './App.css';
import yummyData from './data/yummy.json';
import { BrowserRouter, Route, Link, Routes, useParams, useNavigate } from "react-router-dom";

const IngredientsLabel = ({ingredients})=> {
  return <p><em>({ingredients.join(', ')})</em></p>
}

const AddonsList = ({ids})=> {
  const renderAddonChoices = (choices)=> 
    <ul> {choices.map( (c, i) => <li className='list-item' key={i}>
      {c.name} 
      <span className='left'>{
        (c.price > 0 ? `+ ${c.price}` : ``)}
      </span></li>)}
    </ul>

  return <div>
    {ids.map(id => {
      const {name, choices} = yummyData.addons[id]
      return (<div key={id}>
        <h5>{name}</h5>
        {renderAddonChoices(choices)}
      </div>)
  })}</div>
}

const FoodItem = ()=> {
  const { categoryId, itemId } = useParams();
  const navigate = useNavigate();

  const category = yummyData.foods[categoryId]
  const foodItem = category.items[itemId];
  const allAddonsIds = [...foodItem.addons_ids, ...category.addons_ids]
  
  return (<>
    <header>
      <div className='back-button' onClick={()=> navigate(-1)}> &lt; </div>
      <h5>{foodItem.name}</h5>
    </header>
    <div className="container">
      {<IngredientsLabel ingredients={foodItem.ingredients} />}
      <br/>
      <AddonsList ids={allAddonsIds} />
    </div>
  </>)
}


const FoodCategory = ({items, category})=> {
  return (<>
    {Object.entries(items).map(([key, item]) => {
      const {name, price, ingredients} = item
      return (<Link to={`${category}/${key}`} className='list-item' key={key}>
          <h5>{name} <span className='left'>{price}</span></h5>
          <IngredientsLabel ingredients={ingredients} />
      </Link>)
    })}
  </>)
}

const FoodMenu = ()=> {
  return (<div className="container">
    {Object.entries(yummyData.foods).map(([key, category]) => {
      return (<div className='category' key={key}>
        <h1>{category.name}</h1>
        <FoodCategory items={category.items} category={key} />
      </div>)
    })}
  </div>)
}

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<FoodMenu />} />
      <Route path={`/:categoryId/:itemId`} element={(<FoodItem />)} />
    </Routes>
  </BrowserRouter>
  
}

export default App;
