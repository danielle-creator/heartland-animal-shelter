/*
 * HEARTLAND ANIMAL SHELTER — Admin Dashboard
 * Protected: admin role only. Sections: Products, News/Events, Orders
 */
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Package, Newspaper, ShoppingBag, Plus, Edit2, Trash2,
  Eye, EyeOff, ChevronDown, Save, X, AlertTriangle,
  BarChart3, Users, Heart, TrendingUp, LogOut,
  LayoutTemplate, PawPrint, Settings
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import PageBuilder from "@/components/cms/PageBuilder";
import AnimalsManager from "@/components/cms/AnimalsManager";
import SiteSettings from "@/components/cms/SiteSettings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

// ─── Auth guard ───────────────────────────────────────────────────────────────
function useAdminGuard() {
  const { user, loading, isAuthenticated } = useAuth();
  // Allow access in dev mode without authentication
  const isDev = import.meta.env.DEV;
  if (isDev) return { authorized: true, loading: false };
  if (!loading && (!isAuthenticated || user?.role !== "admin")) {
    return { authorized: false, loading };
  }
  return { authorized: true, loading };
}

// ─── Product Form Modal ───────────────────────────────────────────────────────
function ProductFormModal({
  product,
  onClose,
  onSaved,
}: {
  product?: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? "",
    salePrice: product?.salePrice ?? "",
    imageUrl: product?.imageUrl ?? "",
    category: product?.category ?? "Apparel",
    stock: product?.stock ?? 0,
    active: product?.active ?? true,
    hasVariants: product?.hasVariants ?? false,
    sortOrder: product?.sortOrder ?? 99,
  });

  const utils = trpc.useUtils();

  const createProduct = trpc.admin.createProduct.useMutation({
    onSuccess: () => { toast.success("Product created!"); utils.shop.listProducts.invalidate(); onSaved(); },
    onError: (e) => toast.error(e.message),
  });
  const updateProduct = trpc.admin.updateProduct.useMutation({
    onSuccess: () => { toast.success("Product updated!"); utils.shop.listProducts.invalidate(); onSaved(); },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      price: form.price.toString(),
      salePrice: form.salePrice || undefined,
      stock: Number(form.stock),
      sortOrder: Number(form.sortOrder),
    };
    if (isEdit) {
      updateProduct.mutate({ id: product.id, ...data });
    } else {
      createProduct.mutate(data as any);
    }
  };

  const categories = ["Apparel", "Calendars", "Pet Accessories", "Accessories", "Home & Kitchen", "Gift Cards"];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Product Name *</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Price *</label>
              <input required type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Sale Price</label>
              <input type="number" step="0.01" min="0" value={form.salePrice} onChange={e => setForm(f => ({ ...f, salePrice: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30" placeholder="Optional" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Image URL</label>
            <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30" placeholder="https://..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 bg-white">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Stock</label>
              <input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30" />
            </div>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="rounded" />
              Active (visible in shop)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.hasVariants} onChange={e => setForm(f => ({ ...f, hasVariants: e.target.checked }))} className="rounded" />
              Has size/color variants
            </label>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={createProduct.isPending || updateProduct.isPending}
              className="flex-1 bg-[#C8102E] hover:bg-[#a50d26] text-white">
              <Save size={14} className="mr-1" />
              {isEdit ? "Save Changes" : "Create Product"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="px-4">Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── News Form Modal ──────────────────────────────────────────────────────────
function NewsFormModal({
  post,
  onClose,
  onSaved,
}: {
  post?: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!post;
  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    body: post?.body ?? "",
    imageUrl: post?.imageUrl ?? "",
    category: post?.category ?? "News",
    authorName: post?.authorName ?? "Heartland Team",
    published: post?.published ?? false,
  });

  const utils = trpc.useUtils();

  const createPost = trpc.admin.createPost.useMutation({
    onSuccess: () => { toast.success("Post created!"); utils.news.listPosts.invalidate(); onSaved(); },
    onError: (e) => toast.error(e.message),
  });
  const updatePost = trpc.admin.updatePost.useMutation({
    onSuccess: () => { toast.success("Post updated!"); utils.news.listPosts.invalidate(); onSaved(); },
    onError: (e) => toast.error(e.message),
  });

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setForm(f => ({ ...f, title: val, slug: isEdit ? f.slug : autoSlug(val) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      updatePost.mutate({ id: post.id, ...form });
    } else {
      createPost.mutate(form as any);
    }
  };

  const categories = ["News", "Event", "Adoption Event", "Fundraiser", "Volunteer", "Foster", "Community"];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Post" : "New Post / Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Title *</label>
            <input required value={form.title} onChange={e => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">URL Slug *</label>
            <input required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 font-mono" />
            <div className="text-xs text-gray-400 mt-0.5">heartland.org/news/{form.slug || "..."}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Author</label>
              <input value={form.authorName} onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Image URL</label>
            <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30" placeholder="https://..." />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Excerpt (shown in listings)</label>
            <textarea rows={2} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 resize-none" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Full Body (HTML or plain text)</label>
            <textarea rows={6} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 resize-none font-mono" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="rounded" />
            Published (visible on website)
          </label>
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={createPost.isPending || updatePost.isPending}
              className="flex-1 bg-[#C8102E] hover:bg-[#a50d26] text-white">
              <Save size={14} className="mr-1" />
              {isEdit ? "Save Changes" : "Create Post"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="px-4">Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────
function ProductsTab() {
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const utils = trpc.useUtils();

  const { data: products = [], isLoading } = trpc.admin.listAllProducts.useQuery();
  const deleteProduct = trpc.admin.deleteProduct.useMutation({
    onSuccess: () => { toast.success("Product removed"); utils.admin.listAllProducts.invalidate(); utils.shop.listProducts.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-[#1C1917]">Products ({products.length})</h2>
        <Button onClick={() => setShowCreate(true)} className="bg-[#C8102E] hover:bg-[#a50d26] text-white text-sm">
          <Plus size={14} className="mr-1" /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p: any) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl && (
                        <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div>
                        <div className="font-semibold text-[#1C1917] truncate max-w-[200px]">{p.name}</div>
                        {p.hasVariants && <div className="text-xs text-gray-400">Has variants</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{p.category}</td>
                  <td className="px-4 py-3 font-semibold text-[#1C1917]">${parseFloat(p.price).toFixed(2)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge variant={p.active ? "default" : "secondary"} className={p.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}>
                      {p.active ? "Active" : "Hidden"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => setEditProduct(p)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-[#C8102E]">
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => { if (confirm(`Remove "${p.name}"?`)) deleteProduct.mutate({ id: p.id }); }}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(showCreate || editProduct) && (
        <ProductFormModal
          product={editProduct ?? undefined}
          onClose={() => { setShowCreate(false); setEditProduct(null); }}
          onSaved={() => { setShowCreate(false); setEditProduct(null); utils.admin.listAllProducts.invalidate(); }}
        />
      )}
    </div>
  );
}

// ─── News Tab ─────────────────────────────────────────────────────────────────
function NewsTab() {
  const [editPost, setEditPost] = useState<any | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const utils = trpc.useUtils();

  const { data: posts = [], isLoading } = trpc.admin.listAllPosts.useQuery();
  const deletePost = trpc.admin.deletePost.useMutation({
    onSuccess: () => { toast.success("Post deleted"); utils.admin.listAllPosts.invalidate(); utils.news.listPosts.invalidate(); },
    onError: (e) => toast.error(e.message),
  });
  const togglePublish = trpc.admin.updatePost.useMutation({
    onSuccess: () => { utils.admin.listAllPosts.invalidate(); utils.news.listPosts.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-[#1C1917]">News & Events ({posts.length})</h2>
        <Button onClick={() => setShowCreate(true)} className="bg-[#C8102E] hover:bg-[#a50d26] text-white text-sm">
          <Plus size={14} className="mr-1" /> New Post
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map((p: any) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#1C1917] truncate max-w-[250px]">{p.title}</div>
                    <div className="text-xs text-gray-400">/news/{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{p.category}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <button
                      onClick={() => togglePublish.mutate({ id: p.id, published: !p.published })}
                      className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full transition-colors ${
                        p.published ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {p.published ? <Eye size={10} /> : <EyeOff size={10} />}
                      {p.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => setEditPost(p)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-[#C8102E]">
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => { if (confirm(`Delete "${p.title}"?`)) deletePost.mutate({ id: p.id }); }}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(showCreate || editPost) && (
        <NewsFormModal
          post={editPost ?? undefined}
          onClose={() => { setShowCreate(false); setEditPost(null); }}
          onSaved={() => { setShowCreate(false); setEditPost(null); utils.admin.listAllPosts.invalidate(); }}
        />
      )}
    </div>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab() {
  const { data: orders = [], isLoading } = trpc.admin.listOrders.useQuery();
  const utils = trpc.useUtils();
  const updateStatus = trpc.admin.updateOrderStatus.useMutation({
    onSuccess: () => { toast.success("Status updated"); utils.admin.listOrders.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const STATUS_COLORS: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    paid: "bg-blue-100 text-blue-700",
    fulfilled: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refunded: "bg-gray-100 text-gray-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-[#1C1917]">Orders ({orders.length})</h2>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <ShoppingBag size={40} className="mx-auto mb-3 text-gray-200" />
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((o: any) => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">#{o.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#1C1917]">{o.customerName}</div>
                    <div className="text-xs text-gray-400">{o.customerEmail}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#1C1917] hidden md:table-cell">
                    ${parseFloat(o.totalAmount ?? "0").toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={e => updateStatus.mutate({ id: o.id, status: e.target.value as any })}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[o.status] ?? "bg-gray-100 text-gray-500"}`}
                    >
                      {["pending", "paid", "fulfilled", "cancelled", "refunded"].map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
const TABS = [
  { id: "pages", label: "Page Builder", icon: LayoutTemplate },
  { id: "animals", label: "Animals", icon: PawPrint },
  { id: "news", label: "News & Events", icon: Newspaper },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "settings", label: "Site Settings", icon: Settings },
];

export default function AdminDashboard() {
  const { authorized, loading } = useAdminGuard();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-[#C8102E] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 p-8 text-center">
        <AlertTriangle size={48} className="text-amber-400" />
        <h1 className="text-2xl font-black text-[#1C1917]">Access Restricted</h1>
        <p className="text-gray-500 max-w-sm">This page is for Heartland administrators only. Please log in with an admin account.</p>
        <button onClick={() => setLocation("/")} className="btn-heartland-teal rounded-lg px-6 py-3">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-[#1C1917] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart size={18} className="text-[#C8102E] fill-[#C8102E]" />
          <span className="font-black text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Heartland Admin
          </span>
          <span className="text-white/40 text-xs">|</span>
          <span className="text-white/60 text-xs">{user?.name ?? user?.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="text-white/60 hover:text-white text-xs transition-colors">View Site</a>
          <button onClick={() => logout()} className="flex items-center gap-1 text-white/60 hover:text-white text-xs transition-colors">
            <LogOut size={12} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#1C1917]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm">Build pages, manage animals, publish news, and configure your site — no coding required.</p>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 mb-6 flex-wrap">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === id
                  ? "bg-[#C8102E] text-white shadow-sm"
                  : "text-gray-500 hover:text-[#1C1917] hover:bg-gray-50"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "pages" && <PageBuilder />}
        {activeTab === "animals" && <AnimalsManager />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "news" && <NewsTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "settings" && <SiteSettings />}
      </div>
    </div>
  );
}
