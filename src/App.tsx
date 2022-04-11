import { useEffect } from 'react';
import './App.css';
import { PageLayout } from './ui/Layout/PageLayout';
import {useFurnitureStore} from './stores/FurnitureStore'

function App() {
  const {categories, getCategories} = useFurnitureStore();

  useEffect(() => {
    getCategories()
    console.log("k", categories)
  },[])
  return (
    <>
      <PageLayout />
    </>
  );
}

export default App;
