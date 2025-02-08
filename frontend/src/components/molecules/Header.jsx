import React from 'react';
import { Input } from '../ui/input';
import { Search, SortAsc } from 'lucide-react';
import { Button } from '../ui/button';


const Header = () => {
  return (
    <header className="bg-white">
      <div className="container flex flex-row gap-2 items-center justify-between space-y-0">
        <div className="flex-grow">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <Button variant="outline" className="flex items-center rounded-full space-x-2">
          <SortAsc size={18} />
          <span>Sort</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;