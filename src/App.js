import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CartContainer from './Components/CartContainer';
import Modal from './Components/Modal';
import Navbar from './Components/Navbar'
import { useEffect } from 'react';
import { calculateTotals, getCartItems } from './Features/Cart/CartSlice';
function App() {
  const { cartItems, isLoading} = useSelector((store) => store.cart);
  const {isOpen} = useSelector(store => store.modal)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(calculateTotals())
  },[dispatch,cartItems]);


  useEffect(()=>{
    dispatch(getCartItems('react-useReducer-cart-project'))
  },[dispatch]);


  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="App">
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </div>
  );
}

export default App;
