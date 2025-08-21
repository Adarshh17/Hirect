import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  onFilterChange: (filters: { [key: string]: string }) => void;
  locations: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, locations }) => {
  const [localFilters, setLocalFilters] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters({ ...localFilters, title: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handleSearch = () => {
    onFilterChange(localFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input placeholder="Job title or keyword" onChange={handleInputChange} />
        
        <Select onValueChange={(value) => handleSelectChange('location', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};
