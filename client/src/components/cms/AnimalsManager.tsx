import { useState } from "react";
import { trpc } from "@/lib/trpc";
import ImageUploader from "./ImageUploader";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  StarOff,
  X,
  Save,
  Loader2,
  Dog,
  Cat,
  PawPrint,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

type Species = "dog" | "cat" | "other";
type AnimalStatus = "available" | "pending" | "adopted" | "foster" | "hold";
type Sex = "male" | "female" | "unknown";
type Size = "small" | "medium" | "large" | "xlarge";

interface AnimalForm {
  name: string;
  species: Species;
  breed: string;
  age: string;
  sex: Sex;
  size: Size;
  color: string;
  description: string;
  imageUrl: string;
  status: AnimalStatus;
  goodWithKids: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
  specialNeeds: boolean;
  specialNeedsNote: string;
  adoptionFee: string;
  featured: boolean;
  sortOrder: number;
}

const EMPTY_FORM: AnimalForm = {
  name: "",
  species: "dog",
  breed: "",
  age: "",
  sex: "unknown",
  size: "medium",
  color: "",
  description: "",
  imageUrl: "",
  status: "available",
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: true,
  specialNeeds: false,
  specialNeedsNote: "",
  adoptionFee: "",
  featured: false,
  sortOrder: 0,
};

const STATUS_COLORS: Record<AnimalStatus, string> = {
  available: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  adopted: "bg-blue-100 text-blue-700",
  foster: "bg-purple-100 text-purple-700",
  hold: "bg-gray-100 text-gray-600",
};

const SPECIES_ICON = {
  dog: <Dog size={14} />,
  cat: <Cat size={14} />,
  other: <PawPrint size={14} />,
};

export default function AnimalsManager() {
  const utils = trpc.useUtils();
  const { data: animals = [], isLoading } = trpc.adminAnimals.list.useQuery();
  const createMutation = trpc.adminAnimals.create.useMutation({
    onSuccess: () => utils.adminAnimals.list.invalidate(),
  });
  const updateMutation = trpc.adminAnimals.update.useMutation({
    onSuccess: () => utils.adminAnimals.list.invalidate(),
  });
  const deleteMutation = trpc.adminAnimals.delete.useMutation({
    onSuccess: () => utils.adminAnimals.list.invalidate(),
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AnimalForm>(EMPTY_FORM);
  const [filterSpecies, setFilterSpecies] = useState<Species | "all">("all");
  const [filterStatus, setFilterStatus] = useState<AnimalStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(animal: any) {
    setEditingId(animal.id);
    setForm({
      name: animal.name ?? "",
      species: animal.species ?? "dog",
      breed: animal.breed ?? "",
      age: animal.age ?? "",
      sex: animal.sex ?? "unknown",
      size: animal.size ?? "medium",
      color: animal.color ?? "",
      description: animal.description ?? "",
      imageUrl: animal.imageUrl ?? "",
      status: animal.status ?? "available",
      goodWithKids: animal.goodWithKids ?? true,
      goodWithDogs: animal.goodWithDogs ?? true,
      goodWithCats: animal.goodWithCats ?? true,
      specialNeeds: animal.specialNeeds ?? false,
      specialNeedsNote: animal.specialNeedsNote ?? "",
      adoptionFee: animal.adoptionFee ?? "",
      featured: animal.featured ?? false,
      sortOrder: animal.sortOrder ?? 0,
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editingId !== null) {
        await updateMutation.mutateAsync({ id: editingId, ...form });
      } else {
        await createMutation.mutateAsync(form);
      }
      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
    } finally {
      setSaving(false);
    }
  }

  async function toggleFeatured(animal: any) {
    await updateMutation.mutateAsync({ id: animal.id, featured: !animal.featured });
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this animal? This cannot be undone.")) return;
    await deleteMutation.mutateAsync({ id });
  }

  const filtered = animals.filter((a: any) => {
    if (filterSpecies !== "all" && a.species !== filterSpecies) return false;
    if (filterStatus !== "all" && a.status !== filterStatus) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search animals…"
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
          />
        </div>
        <select
          value={filterSpecies}
          onChange={(e) => setFilterSpecies(e.target.value as any)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
        >
          <option value="all">All Species</option>
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
          <option value="other">Other</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="adopted">Adopted</option>
          <option value="foster">Foster</option>
          <option value="hold">On Hold</option>
        </select>
        <button
          type="button"
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#C8102E] hover:bg-[#a00d24] text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus size={15} /> Add Animal
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {(["available", "pending", "adopted", "foster", "hold"] as AnimalStatus[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
            className={`rounded-xl px-3 py-2 text-center border transition-all ${
              filterStatus === s ? "border-[#C8102E] bg-red-50" : "border-gray-100 bg-white hover:border-gray-200"
            }`}
          >
            <div className="text-lg font-bold text-[#1C1917]">
              {animals.filter((a: any) => a.status === s).length}
            </div>
            <div className="text-xs text-gray-500 capitalize">{s}</div>
          </button>
        ))}
      </div>

      {/* Animal list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-gray-400">
          <Loader2 size={24} className="animate-spin mr-2" /> Loading animals…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <PawPrint size={32} className="mx-auto mb-2 opacity-30" />
          <p>No animals found. Add your first animal above.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((animal: any) => (
            <div
              key={animal.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {/* Row */}
              <div className="flex items-center gap-3 px-4 py-3">
                {/* Photo thumbnail */}
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {animal.imageUrl ? (
                    <img src={animal.imageUrl} alt={animal.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      {SPECIES_ICON[animal.species as Species]}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-[#1C1917]">{animal.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[animal.status as AnimalStatus]}`}>
                      {animal.status}
                    </span>
                    {animal.featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {[animal.breed, animal.age, animal.sex, animal.size].filter(Boolean).join(" · ")}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleFeatured(animal)}
                    title={animal.featured ? "Remove from featured" : "Feature on homepage"}
                    className="p-1.5 rounded-lg hover:bg-yellow-50 text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {animal.featured ? <Star size={15} className="fill-yellow-400 text-yellow-400" /> : <StarOff size={15} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(animal)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(animal.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpandedId(expandedId === animal.id ? null : animal.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                  >
                    {expandedId === animal.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {expandedId === animal.id && (
                <div className="border-t border-gray-100 px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-600">
                  <div><span className="font-semibold">Adoption Fee:</span> {animal.adoptionFee ? `$${animal.adoptionFee}` : "—"}</div>
                  <div><span className="font-semibold">Good with kids:</span> {animal.goodWithKids ? "Yes" : "No"}</div>
                  <div><span className="font-semibold">Good with dogs:</span> {animal.goodWithDogs ? "Yes" : "No"}</div>
                  <div><span className="font-semibold">Good with cats:</span> {animal.goodWithCats ? "Yes" : "No"}</div>
                  {animal.specialNeeds && (
                    <div className="col-span-4"><span className="font-semibold">Special needs:</span> {animal.specialNeedsNote}</div>
                  )}
                  {animal.description && (
                    <div className="col-span-4"><span className="font-semibold">Description:</span> {animal.description}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#1C1917]">
                {editingId ? "Edit Animal" : "Add New Animal"}
              </h3>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-4 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Photo */}
              <ImageUploader
                value={form.imageUrl}
                onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
                label="Animal Photo"
                aspectRatio="square"
              />

              {/* Basic info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Animal name"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Species</label>
                  <select
                    value={form.species}
                    onChange={(e) => setForm((f) => ({ ...f, species: e.target.value as Species }))}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as AnimalStatus }))}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="adopted">Adopted</option>
                    <option value="foster">Foster</option>
                    <option value="hold">On Hold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Breed</label>
                  <input
                    type="text"
                    value={form.breed}
                    onChange={(e) => setForm((f) => ({ ...f, breed: e.target.value }))}
                    placeholder="e.g. Labrador Mix"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Age</label>
                  <input
                    type="text"
                    value={form.age}
                    onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                    placeholder="e.g. 2 years"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Sex</label>
                  <select
                    value={form.sex}
                    onChange={(e) => setForm((f) => ({ ...f, sex: e.target.value as Sex }))}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Size</label>
                  <select
                    value={form.size}
                    onChange={(e) => setForm((f) => ({ ...f, size: e.target.value as Size }))}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">X-Large</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Color</label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                    placeholder="e.g. Black & White"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Adoption Fee ($)</label>
                  <input
                    type="text"
                    value={form.adoptionFee}
                    onChange={(e) => setForm((f) => ({ ...f, adoptionFee: e.target.value }))}
                    placeholder="e.g. 150"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Tell adopters about this animal…"
                    rows={3}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 resize-y"
                  />
                </div>
              </div>

              {/* Compatibility */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Compatibility</label>
                <div className="flex flex-wrap gap-3">
                  {(["goodWithKids", "goodWithDogs", "goodWithCats"] as const).map((key) => (
                    <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))}
                        className="w-4 h-4 accent-[#C8102E]"
                      />
                      {key === "goodWithKids" ? "Good with kids" : key === "goodWithDogs" ? "Good with dogs" : "Good with cats"}
                    </label>
                  ))}
                </div>
              </div>

              {/* Special needs */}
              <div>
                <label className="flex items-center gap-2 text-sm cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={form.specialNeeds}
                    onChange={(e) => setForm((f) => ({ ...f, specialNeeds: e.target.checked }))}
                    className="w-4 h-4 accent-[#C8102E]"
                  />
                  Special needs animal
                </label>
                {form.specialNeeds && (
                  <input
                    type="text"
                    value={form.specialNeedsNote}
                    onChange={(e) => setForm((f) => ({ ...f, specialNeedsNote: e.target.value }))}
                    placeholder="Describe special needs…"
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                  />
                )}
              </div>

              {/* Featured */}
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 accent-[#C8102E]"
                />
                Feature on homepage
              </label>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || !form.name.trim()}
                className="flex items-center gap-2 px-5 py-2 bg-[#C8102E] hover:bg-[#a00d24] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {editingId ? "Save Changes" : "Add Animal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
