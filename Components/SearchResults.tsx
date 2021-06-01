import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = useMemo(
    () => results.reduce((total, product) => total + product.price, 0),
    [results]
  );

  return (
    <div>
      <h2>
        <strong>{totalPrice}</strong>
      </h2>
      {results.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
}
