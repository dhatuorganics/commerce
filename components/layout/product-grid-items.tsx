import Grid from "components/grid";
import { ProductCard } from "components/product/product-card";
import { Product } from "lib/shopify/types";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <ProductCard
            product={product}
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            showATC={true}
          />
        </Grid.Item>
      ))}
    </>
  );
}
