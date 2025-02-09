import React, { useEffect } from 'react';
import { Input } from '../ui/input';
import { Search, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '../ui/button';
import useFilterStore from '@/hooks/store/filterStore';
import { useLocation } from 'react-router-dom';


const Header = () => {

  const {filters, setFilter} = useFilterStore();
  const location = useLocation();


  useEffect(() => {
    if (location.pathname === "/favorites") {
      setFilter("isFavorite", true);
    }
    else {
      setFilter("isFavorite", "");
    }
  }, [location])


  function handleOnChanege(e) {
    setFilter("keyword", e.target.value);
  }

  useEffect(() => {
    console.log(filters);
  }, [filters])

  function handleChangeSort() {
    if (filters.sort === "newest") {
      setFilter("sort", "oldest");
    }
    else {
      setFilter("sort", "newest");
    }
  }


  return (
    <header className="bg-white">
      <div className="container flex flex-row gap-2 items-center justify-between space-y-0">
        <div className="flex-grow">
          <div className="relative">
            <Input
              type="text"
              value={filters.keyword}
              onChange={handleOnChanege}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <Button variant="outline" onClick={handleChangeSort} className="flex items-center rounded-full space-x-2">
          {filters.sort === "newest" ? <SortAsc size={18} /> : <SortDesc size={18} />}
          <span>Sort</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;