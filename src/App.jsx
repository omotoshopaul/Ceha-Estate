import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiltersProvider } from './context/FiltersContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { AppLayout } from './layouts/AppLayout';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetails } from './pages/PropertyDetails';
import { Favourites } from './pages/Favourites';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <FiltersProvider>
      <FavouritesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavouritesProvider>
    </FiltersProvider>
  );
}
