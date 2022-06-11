// #Filename: App.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import View from './pages/View';
import Settings from './pages/Settings';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  //const [currentSub, setCurrentSub] = useState('');
  const defaultValue = {
    icon: 'https://a.thumbs.redditmedia.com/APweUko3qLJ0prsQI1giluMwBdcVnokw9_yZcby4SB8.png',
    banner:
      'https://styles.redditmedia.com/t5_2qmjl/styles/bannerBackgroundImage_2qok6gpoiud71.png?width=4000&s=6b7f7b1846d648c37b4c12393a8ba2fe067300ca',
    name: 'wallpaper',
  };
  return (
    <>
      <Header defaultVal={defaultValue} />
      <div className="page-body">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view" element={<View />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
