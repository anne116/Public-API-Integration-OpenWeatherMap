import { useEffect } from 'react'
import './App.css'
import api from './api';


function App() {

  useEffect(()=> {
    const testApi = async () => {
      try {
        const response = await api.get('weather', {
          params: {
            q: 'London'
          }
        });
        console.log(response.data); 
      } catch (error) {
        console.error('API Error:', error);
      }
    };
    testApi();
  }, []);

  return <h1>Testing API</h1>;

}

export default App;
