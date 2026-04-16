import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const FilterBar = ({ onFilterChange, locations }) => {
  const [localFilters, setLocalFilters] = useState({});

  const handleInputChange = (e) => {
    setLocalFilters({ ...localFilters, title: e.target.value });
  };

  const handleSelectChange = (name, value) => {
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

// Optional: Add prop-types for runtime validation in JavaScript
FilterBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
};