import { useEffect } from 'react';
import './App.css';
import { PageLayout } from './ui/Layout/PageLayout';
import {useFurnitureStore} from './stores/FurnitureStore'
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  const {getCategories} = useFurnitureStore();

  useEffect(() => {
    getCategories()
  },[])
  return (
    <>
          <NotificationsProvider>
          <PageLayout />
          </NotificationsProvider>
    </>
  );
}
export default App;
