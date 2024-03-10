import { useEffect, useState } from 'react';
import ToDoList from '../ToDoList/ToDoList';
import './App.scss';
import Preloader from '../Preloader/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <h1>Wedding To-Do List</h1>
      <ToDoList />
    </>
  );
}

export default App;
