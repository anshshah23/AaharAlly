"use client";
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import debounce from 'lodash.debounce';

function InputDemo() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const options = {
    keys: ["name", "description"],
  };

  
  useEffect(() => {
    if (query && data.length > 0) {
      const fuse = new Fuse(data, options);
      const result = fuse.search(query);
      const searchResults = result.map(({ item }) => item);
      setData(searchResults);
    } else {
      fetchData();
    }
  }, [query]);

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, 500);

  return <Input type="search" placeholder="Search" onChange={handleSearch} />
}
export default InputDemo