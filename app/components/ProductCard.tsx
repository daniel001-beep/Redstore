import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="product-card-link block">
      <div className="product-card">
        <div className="product-card-img">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="product-card-info">
          <span className="product-card-category">{product.category}</span>
          <h4 className="product-card-name">{product.name}</h4>
          <div className="product-card-rating">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-half-stroke"></i>
            <span className="product-card-rating-text">4.5</span>
          </div>
          <p className="product-card-price">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
