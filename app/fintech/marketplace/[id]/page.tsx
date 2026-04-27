'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ShoppingCart, Star, ArrowLeft, Loader } from 'lucide-react';
import DashboardLayout from '@/app/components/DashboardLayout';

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string | number;
  imageurl: string | null;
  category: string | null;
}

interface Review {
  id: number;
  rating: number;
  comment: string | null;
  userid: string;
  createdat: string;
}

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data.product);
        setReviews(data.reviews || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (!session?.user) {
      router.push('/auth/signin?callbackUrl=/fintech/marketplace');
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });

      if (!res.ok) throw new Error('Failed to add to cart');

      // Show success and redirect to checkout
      router.push('/checkout');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-24">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !product) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">{error || 'Product not found'}</p>
          <Link href="/fintech/marketplace" className="text-blue-400 hover:text-blue-300">
            ← Back to Marketplace
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
  const totalPrice = price * quantity;
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <DashboardLayout>
      <div className="pt-4">
        {/* Back Button */}
        <Link
          href="/fintech/marketplace"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex items-center justify-center py-64">
            {product.imageurl ? (
              <img
                src={product.imageurl}
                alt={product.name}
                className="max-w-full max-h-96 rounded-lg object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-16 h-16 text-slate-500" />
                </div>
                <p className="text-slate-500">No image available</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-slate-100 mb-2">{product.name}</h1>
                  {product.category && (
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                      {product.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Rating */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(Number(avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                      />
                    ))}
                  </div>
                  <span>{avgRating} ({reviews.length} reviews)</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-100 mb-3">About this product</h2>
                <p className="text-slate-400 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Pricing Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
              <p className="text-slate-400 text-sm mb-2">Price</p>
              <p className="text-4xl font-bold text-slate-100 mb-6">${price.toFixed(2)}</p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-slate-300 block mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-slate-100 w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="border-t border-slate-700 pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total:</span>
                  <span className="text-2xl font-bold text-green-400">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || !session?.user}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {addingToCart ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    {session?.user ? 'Add to Cart' : 'Sign in to Purchase'}
                  </>
                )}
              </button>

              {!session?.user && (
                <p className="text-xs text-slate-500 text-center mt-3">
                  <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300">
                    Sign in
                  </Link>{' '}
                  to purchase this product
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Customer Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-slate-700 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(review.createdat).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-slate-300 text-sm">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
