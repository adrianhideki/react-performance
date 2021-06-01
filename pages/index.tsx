import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../Components/SearchResults";

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
  };

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>
      <SearchResults results={results} onAddToWishList={addToWishList} />
    </div>
  );
}
