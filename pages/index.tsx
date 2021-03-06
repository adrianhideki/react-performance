import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../Components/SearchResults";

type Results = {
  totalPrice: number;
  data: any[];
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    data: [],
    totalPrice: 0,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const totalPrice = data.reduce(
      (total, product) => total + product.price,
      0
    );

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product) => {
      return {
        ...product,
        priceFormatted: formatter.format(product.price),
      };
    });

    setResults({ data: products, totalPrice });
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
      <SearchResults
        results={results.data}
        onAddToWishList={addToWishList}
        totalPrice={results.totalPrice}
      />
    </div>
  );
}
