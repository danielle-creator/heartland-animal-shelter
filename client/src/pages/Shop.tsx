/*
 * HEARTLAND ANIMAL SHELTER — Shop Page
 * Features: product grid with category filter, variant selection modal, cart sidebar, checkout flow
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  ShoppingCart, X, Plus, Minus, Heart, ArrowRight,
  Package, Tag, ChevronDown, Star, Truck, Shield
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CartItem {
  productId: number;
  variantId?: number;
  productName: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: string;
  imageUrl?: string | null;
}

// ─── Cart context (local state) ───────────────────────────────────────────────
function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const key = `${item.productId}-${item.variantId ?? ""}`;
      const existing = prev.find(
        (i) => `${i.productId}-${i.variantId ?? ""}` === key
      );
      if (existing) {
        return prev.map((i) =>
          `${i.productId}-${i.variantId ?? ""}` === key
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: number, variantId?: number) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.variantId === variantId)
      )
    );
  };

  const updateQty = (productId: number, variantId: number | undefined, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, i) => sum + parseFloat(i.unitPrice) * i.quantity,
    0
  );
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, updateQty, total, count };
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onSelect,
}: {
  product: any;
  onSelect: (product: any) => void;
}) {
  const price = parseFloat(product.price);
  const salePrice = product.salePrice ? parseFloat(product.salePrice) : null;

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border border-gray-100"
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={40} className="text-gray-300" />
          </div>
        )}
        {salePrice && (
          <div className="absolute top-2 left-2 bg-[#C8102E] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            SALE
          </div>
        )}
        {product.stock === 0 && !product.hasVariants && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-[#0D9488] font-semibold uppercase tracking-wide mb-1">
          {product.category}
        </div>
        <h3
          className="font-bold text-[#1C1917] text-sm mb-2 line-clamp-2 group-hover:text-[#C8102E] transition-colors"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {salePrice ? (
            <>
              <span className="text-[#C8102E] font-bold">${salePrice.toFixed(2)}</span>
              <span className="text-gray-400 text-sm line-through">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-[#1C1917] font-bold">${price.toFixed(2)}</span>
          )}
        </div>
        {product.hasVariants && (
          <div className="mt-2 text-xs text-gray-400">Multiple sizes available</div>
        )}
      </div>
    </div>
  );
}

// ─── Product Detail Modal ─────────────────────────────────────────────────────
function ProductModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: any;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}) {
  const { data: detail, isLoading } = trpc.shop.getProduct.useQuery({ id: product.id });
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [qty, setQty] = useState(1);

  const variants = detail?.variants ?? [];
  const selectedVariant = variants.find((v: any) => v.id === selectedVariantId);
  const effectivePrice = selectedVariant?.price
    ? parseFloat(selectedVariant.price)
    : parseFloat(product.price);

  const inStock = product.hasVariants
    ? selectedVariant ? selectedVariant.stock > 0 : false
    : product.stock > 0;

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      variantId: selectedVariantId ?? undefined,
      productName: product.name,
      variantLabel: selectedVariant
        ? [selectedVariant.size, selectedVariant.color].filter(Boolean).join(" / ")
        : undefined,
      quantity: qty,
      unitPrice: effectivePrice.toFixed(2),
      imageUrl: product.imageUrl,
    });
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          {/* Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-50">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={60} className="text-gray-200" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div>
              <Badge variant="secondary" className="text-[#0D9488] bg-teal-50 mb-2">
                {product.category}
              </Badge>
              <div className="text-2xl font-black text-[#1C1917]">
                ${effectivePrice.toFixed(2)}
              </div>
            </div>

            {product.description && (
              <p className="text-sm text-[#78716C] leading-relaxed">{product.description}</p>
            )}

            {/* Variants */}
            {isLoading && (
              <div className="text-sm text-gray-400">Loading options...</div>
            )}
            {!isLoading && variants.length > 0 && (
              <div>
                <div className="text-sm font-semibold text-[#1C1917] mb-2">
                  {variants[0].size ? "Select Size" : "Select Option"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v: any) => {
                    const label = [v.size, v.color].filter(Boolean).join(" / ");
                    const outOfStock = v.stock === 0;
                    return (
                      <button
                        key={v.id}
                        onClick={() => !outOfStock && setSelectedVariantId(v.id)}
                        disabled={outOfStock}
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                          selectedVariantId === v.id
                            ? "border-[#C8102E] bg-red-50 text-[#C8102E]"
                            : outOfStock
                            ? "border-gray-200 text-gray-300 cursor-not-allowed line-through"
                            : "border-gray-200 hover:border-[#C8102E] text-[#1C1917]"
                        }`}
                      >
                        {label}
                        {outOfStock && <span className="ml-1 text-xs">(sold out)</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <div className="text-sm font-semibold text-[#1C1917] mb-2">Quantity</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#C8102E] transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-lg font-bold w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#C8102E] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <Button
              onClick={handleAdd}
              disabled={!inStock || (product.hasVariants && !selectedVariantId)}
              className="w-full bg-[#C8102E] hover:bg-[#a50d26] text-white font-bold py-3 rounded-lg"
            >
              {!inStock
                ? "Out of Stock"
                : product.hasVariants && !selectedVariantId
                ? "Select an Option"
                : `Add to Cart — $${(effectivePrice * qty).toFixed(2)}`}
            </Button>

            {/* Trust badges */}
            <div className="flex gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <Truck size={12} className="text-[#0D9488]" />
                Free shipping $50+
              </div>
              <div className="flex items-center gap-1">
                <Heart size={12} className="text-[#C8102E]" />
                100% supports animals
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────
function CartSidebar({
  cart,
  onClose,
  onCheckout,
}: {
  cart: ReturnType<typeof useCart>;
  onClose: () => void;
  onCheckout: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-black" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Your Cart ({cart.count})
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-8">
            <ShoppingCart size={48} className="text-gray-200" />
            <p className="text-gray-400 font-medium">Your cart is empty</p>
            <p className="text-gray-400 text-sm">Add some items to get started!</p>
            <button onClick={onClose} className="btn-heartland-teal rounded-lg px-5 py-2 text-sm mt-2">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId ?? ""}`}
                  className="flex gap-3 bg-gray-50 rounded-xl p-3"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[#1C1917] truncate">{item.productName}</div>
                    {item.variantLabel && (
                      <div className="text-xs text-gray-500">{item.variantLabel}</div>
                    )}
                    <div className="text-sm font-bold text-[#C8102E] mt-1">
                      ${(parseFloat(item.unitPrice) * item.quantity).toFixed(2)}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => cart.updateQty(item.productId, item.variantId, -1)}
                        className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs hover:border-[#C8102E]"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => cart.updateQty(item.productId, item.variantId, 1)}
                        className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs hover:border-[#C8102E]"
                      >
                        <Plus size={10} />
                      </button>
                      <button
                        onClick={() => cart.removeItem(item.productId, item.variantId)}
                        className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#1C1917]">Subtotal</span>
                <span className="text-xl font-black text-[#C8102E]">${cart.total.toFixed(2)}</span>
              </div>
              {cart.total < 50 && (
                <div className="text-xs text-[#0D9488] bg-teal-50 rounded-lg p-2 text-center">
                  Add ${(50 - cart.total).toFixed(2)} more for free shipping!
                </div>
              )}
              <Button
                onClick={onCheckout}
                className="w-full bg-[#C8102E] hover:bg-[#a50d26] text-white font-bold py-3 rounded-lg"
              >
                Checkout — ${cart.total.toFixed(2)}
              </Button>
              <p className="text-xs text-center text-gray-400">
                All proceeds support Heartland animals 🐾
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Checkout Form ─────────────────────────────────────────────────────────────
function CheckoutModal({
  cart,
  onClose,
  onSuccess,
}: {
  cart: ReturnType<typeof useCart>;
  onClose: () => void;
  onSuccess: (orderId: number) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const createOrder = trpc.shop.createOrder.useMutation({
    onSuccess: (data) => {
      onSuccess(data.orderId);
    },
    onError: (err) => {
      toast.error("Order failed: " + err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOrder.mutate({
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone || undefined,
      shippingAddress: form.address || undefined,
      notes: form.notes || undefined,
      items: cart.items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        productName: i.productName,
        variantLabel: i.variantLabel,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Complete Your Order
          </DialogTitle>
        </DialogHeader>

        <div className="bg-[#FAF7F2] rounded-xl p-4 mb-4">
          <div className="text-sm font-semibold text-[#1C1917] mb-2">Order Summary</div>
          {cart.items.map((item) => (
            <div key={`${item.productId}-${item.variantId ?? ""}`} className="flex justify-between text-sm py-1">
              <span className="text-gray-600">
                {item.productName}
                {item.variantLabel ? ` (${item.variantLabel})` : ""} × {item.quantity}
              </span>
              <span className="font-semibold">${(parseFloat(item.unitPrice) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-[#C8102E]">${cart.total.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-semibold text-[#1C1917] mb-1 block">Full Name *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E]"
              placeholder="Jane Smith"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1C1917] mb-1 block">Email *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E]"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1C1917] mb-1 block">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E]"
              placeholder="(847) 555-0100"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1C1917] mb-1 block">Shipping Address</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] resize-none"
              placeholder="123 Main St, Northbrook, IL 60062"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1C1917] mb-1 block">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] resize-none"
              placeholder="Gift message, special instructions..."
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            <strong>Note:</strong> After submitting, our team will contact you to arrange payment and shipping. 
            We accept credit cards, checks, and PayPal.
          </div>

          <Button
            type="submit"
            disabled={createOrder.isPending}
            className="w-full bg-[#C8102E] hover:bg-[#a50d26] text-white font-bold py-3 rounded-lg"
          >
            {createOrder.isPending ? "Placing Order..." : `Place Order — $${cart.total.toFixed(2)}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Shop Page ───────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Apparel", "Calendars", "Pet Accessories", "Accessories", "Home & Kitchen", "Gift Cards"];

export default function Shop() {
  const cart = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<number | null>(null);
  const { data: products = [], isLoading } = trpc.shop.listProducts.useQuery();

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p: any) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const handleAddToCart = (item: CartItem) => {
    cart.addItem(item);
    toast.success(`Added to cart: ${item.productName}${item.variantLabel ? ` (${item.variantLabel})` : ""}`);
    setCartOpen(true);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
        <Navigation />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={36} className="text-green-600 fill-green-600" />
            </div>
            <h1 className="text-3xl font-black text-[#1C1917] mb-3" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Thank You!
            </h1>
            <p className="text-[#78716C] mb-2">
              Your order #{orderSuccess} has been received. Our team will contact you shortly to arrange payment and shipping.
            </p>
            <p className="text-sm text-[#0D9488] font-semibold mb-6">
              100% of proceeds support Heartland animals 🐾
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/">
                <button className="btn-heartland-teal rounded-lg px-6 py-3">
                  Back to Home
                </button>
              </Link>
              <button
                onClick={() => setOrderSuccess(null)}
                className="btn-heartland-red rounded-lg px-6 py-3"
              >
                Shop More
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF7F2" }}>
      <Navigation />

      {/* Header */}
      <section className="bg-[#1C1917] py-14">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[#0D9488] text-xs font-bold uppercase tracking-widest mb-2">
                Support Our Mission
              </div>
              <h1
                className="text-3xl md:text-4xl font-black text-white"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Heartland Shop
              </h1>
              <p className="text-white/70 mt-2 text-sm">
                Every purchase directly supports the animals in our care.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center text-white">
                <div className="text-2xl font-black text-[#0D9488]">100%</div>
                <div className="text-xs text-white/60">Goes to animals</div>
              </div>
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 bg-[#C8102E] hover:bg-[#a50d26] text-white font-bold px-5 py-3 rounded-lg transition-colors"
              >
                <ShoppingCart size={18} />
                Cart
                {cart.count > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-[#C8102E] text-xs font-black rounded-full flex items-center justify-center">
                    {cart.count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-[#0D9488] py-3">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 text-white text-xs font-semibold">
            <div className="flex items-center gap-1.5"><Truck size={14} /> Free shipping on orders $50+</div>
            <div className="flex items-center gap-1.5"><Heart size={14} fill="white" /> 100% supports shelter animals</div>
            <div className="flex items-center gap-1.5"><Shield size={14} /> Secure checkout</div>
            <div className="flex items-center gap-1.5"><Star size={14} fill="white" /> Heartland-quality merchandise</div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="container">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#C8102E] text-white"
                    : "text-[#78716C] hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Package size={48} className="text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">No products in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mission CTA */}
      <section className="bg-[#C8102E] py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Can't find what you're looking for?
          </h2>
          <p className="text-white/90 mb-5 text-sm">
            You can also support Heartland through a direct donation — every dollar goes to the animals.
          </p>
          <Link href="/donate">
            <button className="bg-white text-[#C8102E] font-bold uppercase tracking-wide text-sm px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Make a Donation
            </button>
          </Link>
        </div>
      </section>

      <Footer />

      {/* Floating cart button */}
      {cart.count > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#C8102E] text-white font-bold px-5 py-3 rounded-full shadow-2xl hover:bg-[#a50d26] transition-colors"
        >
          <ShoppingCart size={18} />
          {cart.count} item{cart.count !== 1 ? "s" : ""} — ${cart.total.toFixed(2)}
        </button>
      )}

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      {cartOpen && (
        <CartSidebar
          cart={cart}
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}
      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onSuccess={(id) => {
            setCheckoutOpen(false);
            setOrderSuccess(id);
          }}
        />
      )}
    </div>
  );
}
