import { useEffect } from 'react';
import './App.css';
import { PageLayout } from './ui/Layout/PageLayout';
import {useFurnitureStore} from './stores/FurnitureStore'

function App() {
  const {getCategories} = useFurnitureStore();

  useEffect(() => {
    getCategories()
  },[])
  return (
    <>
      <PageLayout />
    </>
  );
}

export default App;
