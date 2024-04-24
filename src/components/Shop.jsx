import Card from "./Card";
import data from "./data";

function Shop() {
  const products = data.products;
  return (
    <main>
      <div className="container">
        <div className="products-container">
          <div className="row mb-3">
            {products.map((product, index) => (
              <div key={`${product.title}-${index}`} className="col-md-6 col-lg-6 col-xl-4 my-2">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Shop;
