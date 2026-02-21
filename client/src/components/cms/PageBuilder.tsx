import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Type,
  LayoutTemplate,
  Plus,
  Save,
  Loader2,
} from "lucide-react";
import ImageUploader from "./ImageUploader";
import { nanoid } from "nanoid";

// ─── Types ────────────────────────────────────────────────────────────────────
export type SectionLayout =
  | "hero-split"
  | "hero-full"
  | "text-left-image-right"
  | "image-left-text-right"
  | "text-center"
  | "image-grid"
  | "stats-bar"
  | "cta-banner"
  | "cards-row"
  | "testimonial"
  | "custom-html";

export interface PageSection {
  id: string;
  layout: SectionLayout;
  visible: boolean;
  label: string;
  // Content fields
  headline?: string;
  subheadline?: string;
  body?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  ctaLabel2?: string;
  ctaUrl2?: string;
  // Photos — each section can have up to 3 images
  image1?: string;
  image2?: string;
  image3?: string;
  // Style
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  // Extra JSON for advanced layouts
  extra?: string;
}

const LAYOUT_OPTIONS: { value: SectionLayout; label: string; icon: string; description: string }[] = [
  { value: "hero-split", label: "Hero — Split", icon: "◧", description: "Large photo left, headline + CTA right" },
  { value: "hero-full", label: "Hero — Full Bleed", icon: "▣", description: "Full-width background photo with overlay text" },
  { value: "text-left-image-right", label: "Text + Photo (right)", icon: "◫", description: "Text on left, photo on right" },
  { value: "image-left-text-right", label: "Photo (left) + Text", icon: "◨", description: "Photo on left, text on right" },
  { value: "text-center", label: "Centered Text", icon: "≡", description: "Headline and body centered, optional background" },
  { value: "image-grid", label: "Photo Grid", icon: "⊞", description: "2–3 photos in a grid with optional captions" },
  { value: "stats-bar", label: "Stats Bar", icon: "▦", description: "Highlight key numbers and metrics" },
  { value: "cta-banner", label: "CTA Banner", icon: "▬", description: "Bold call-to-action strip with button" },
  { value: "cards-row", label: "Cards Row", icon: "⊟", description: "3 cards with icon/image, title, and text" },
  { value: "testimonial", label: "Testimonial", icon: "❝", description: "Quote with photo and attribution" },
  { value: "custom-html", label: "Custom HTML", icon: "</>", description: "Paste raw HTML for advanced layouts" },
];

// ─── Sortable Section Card ────────────────────────────────────────────────────
function SortableSectionCard({
  section,
  onUpdate,
  onDuplicate,
  onDelete,
  onToggle,
}: {
  section: PageSection;
  onUpdate: (id: string, patch: Partial<PageSection>) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [activeImageTab, setActiveImageTab] = useState<"image1" | "image2" | "image3">("image1");

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const layoutMeta = LAYOUT_OPTIONS.find((l) => l.value === section.layout);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl border transition-all ${
        isDragging ? "shadow-2xl border-[#C8102E]" : "border-gray-200 shadow-sm hover:shadow-md"
      } ${!section.visible ? "opacity-60" : ""}`}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing touch-none"
          title="Drag to reorder"
        >
          <GripVertical size={18} />
        </button>

        {/* Layout icon */}
        <span className="text-lg w-6 text-center select-none">{layoutMeta?.icon ?? "▣"}</span>

        {/* Label */}
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={section.label}
            onChange={(e) => onUpdate(section.id, { label: e.target.value })}
            className="font-semibold text-sm text-[#1C1917] bg-transparent border-none outline-none w-full truncate"
            placeholder="Section name"
          />
          <p className="text-xs text-gray-400 truncate">{layoutMeta?.description}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onToggle(section.id)}
            title={section.visible ? "Hide section" : "Show section"}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            {section.visible ? <Eye size={15} /> : <EyeOff size={15} />}
          </button>
          <button
            type="button"
            onClick={() => onDuplicate(section.id)}
            title="Duplicate"
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <Copy size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(section.id)}
            title="Delete"
            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Expanded editor */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-4">
          {/* Layout picker */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              <LayoutTemplate size={11} className="inline mr-1" /> Layout
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LAYOUT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onUpdate(section.id, { layout: opt.value })}
                  className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                    section.layout === opt.value
                      ? "border-[#C8102E] bg-red-50 text-[#C8102E] font-semibold"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <span className="mr-1">{opt.icon}</span> {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text content */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              <Type size={11} className="inline mr-1" /> Content
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={section.headline ?? ""}
                onChange={(e) => onUpdate(section.id, { headline: e.target.value })}
                placeholder="Headline"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
              />
              <input
                type="text"
                value={section.subheadline ?? ""}
                onChange={(e) => onUpdate(section.id, { subheadline: e.target.value })}
                placeholder="Subheadline"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
              />
              <textarea
                value={section.body ?? ""}
                onChange={(e) => onUpdate(section.id, { body: e.target.value })}
                placeholder="Body text (supports basic HTML)"
                rows={3}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 resize-y"
              />
            </div>
          </div>

          {/* CTA buttons */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Buttons / CTAs
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={section.ctaLabel ?? ""}
                onChange={(e) => onUpdate(section.id, { ctaLabel: e.target.value })}
                placeholder="Button 1 label"
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
              />
              <input
                type="text"
                value={section.ctaUrl ?? ""}
                onChange={(e) => onUpdate(section.id, { ctaUrl: e.target.value })}
                placeholder="Button 1 URL"
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
              />
              <input
                type="text"
                value={section.ctaLabel2 ?? ""}
                onChange={(e) => onUpdate(section.id, { ctaLabel2: e.target.value })}
                placeholder="Button 2 label"
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
              />
              <input
                type="text"
                value={section.ctaUrl2 ?? ""}
                onChange={(e) => onUpdate(section.id, { ctaUrl2: e.target.value })}
                placeholder="Button 2 URL"
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
              />
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              <ImageIcon size={11} className="inline mr-1" /> Photos
            </label>
            <div className="flex gap-2 mb-3">
              {(["image1", "image2", "image3"] as const).map((key, i) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveImageTab(key)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    activeImageTab === key
                      ? "border-[#C8102E] bg-red-50 text-[#C8102E] font-semibold"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  Photo {i + 1} {section[key] ? "✓" : ""}
                </button>
              ))}
            </div>
            <ImageUploader
              value={section[activeImageTab]}
              onChange={(url) => onUpdate(section.id, { [activeImageTab]: url })}
              label={`Photo ${activeImageTab.slice(-1)}`}
              aspectRatio={section.layout.startsWith("hero") ? "wide" : "square"}
            />
          </div>

          {/* Style */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Colors
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={section.bgColor ?? "#ffffff"}
                    onChange={(e) => onUpdate(section.id, { bgColor: e.target.value })}
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={section.bgColor ?? "#ffffff"}
                    onChange={(e) => onUpdate(section.id, { bgColor: e.target.value })}
                    className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Text</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={section.textColor ?? "#1C1917"}
                    onChange={(e) => onUpdate(section.id, { textColor: e.target.value })}
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={section.textColor ?? "#1C1917"}
                    onChange={(e) => onUpdate(section.id, { textColor: e.target.value })}
                    className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Accent</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={section.accentColor ?? "#C8102E"}
                    onChange={(e) => onUpdate(section.id, { accentColor: e.target.value })}
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={section.accentColor ?? "#C8102E"}
                    onChange={(e) => onUpdate(section.id, { accentColor: e.target.value })}
                    className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Custom HTML */}
          {section.layout === "custom-html" && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Custom HTML
              </label>
              <textarea
                value={section.extra ?? ""}
                onChange={(e) => onUpdate(section.id, { extra: e.target.value })}
                placeholder="<div>Your custom HTML here</div>"
                rows={6}
                className="w-full text-xs font-mono border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 resize-y"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Add Section Dialog ───────────────────────────────────────────────────────
function AddSectionPanel({ onAdd }: { onAdd: (layout: SectionLayout) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-[#C8102E] hover:text-[#C8102E] hover:bg-red-50 transition-all"
      >
        <Plus size={16} /> Add Section
      </button>
      {open && (
        <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {LAYOUT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onAdd(opt.value); setOpen(false); }}
              className="text-left px-3 py-2.5 rounded-lg border border-gray-100 hover:border-[#C8102E] hover:bg-red-50 transition-all group"
            >
              <div className="text-lg mb-0.5">{opt.icon}</div>
              <div className="text-xs font-semibold text-gray-700 group-hover:text-[#C8102E]">{opt.label}</div>
              <div className="text-xs text-gray-400 leading-tight">{opt.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page Selector ────────────────────────────────────────────────────────────
const PAGES = [
  { id: "home", label: "Home" },
  { id: "adopt", label: "Adopt" },
  { id: "get-involved", label: "Get Involved" },
  { id: "foster", label: "Foster" },
  { id: "donate", label: "Donate" },
  { id: "about", label: "About" },
  { id: "news", label: "News & Events" },
  { id: "resources", label: "Resources" },
  { id: "shop", label: "Shop" },
];

// ─── Default sections per page ────────────────────────────────────────────────
function defaultSections(pageId: string): PageSection[] {
  const base: Record<string, PageSection[]> = {
    home: [
      { id: nanoid(), layout: "hero-split", visible: true, label: "Hero Slider", headline: "Every Animal Deserves a Loving Home", subheadline: "Heartland Animal Shelter finds permanent, loving homes for each animal in our care.", ctaLabel: "Adopt an Animal", ctaUrl: "/adopt", ctaLabel2: "Donate Now", ctaUrl2: "/donate", bgColor: "#1C1917", textColor: "#ffffff", accentColor: "#C8102E" },
      { id: nanoid(), layout: "stats-bar", visible: true, label: "Impact Stats", headline: "How YOU Helped Animals in 2025", bgColor: "#C8102E", textColor: "#ffffff", accentColor: "#ffffff" },
      { id: nanoid(), layout: "cards-row", visible: true, label: "Featured Animals", headline: "Meet Our Animals", bgColor: "#ffffff", textColor: "#1C1917", accentColor: "#C8102E" },
      { id: nanoid(), layout: "text-left-image-right", visible: true, label: "Foster CTA", headline: "Open Your Home, Save a Life", body: "In 2025, 274 foster homes provided 22,373 days of care for animals in need.", ctaLabel: "Become a Foster", ctaUrl: "/foster", bgColor: "#f8f7f5", textColor: "#1C1917", accentColor: "#008080" },
      { id: nanoid(), layout: "cta-banner", visible: true, label: "Donate Banner", headline: "Help Us Save More Lives in 2026", ctaLabel: "Donate Now", ctaUrl: "/donate", bgColor: "#008080", textColor: "#ffffff", accentColor: "#ffffff" },
    ],
    adopt: [
      { id: nanoid(), layout: "hero-full", visible: true, label: "Adopt Hero", headline: "Find Your Perfect Match", subheadline: "Browse our available dogs, cats, and more.", bgColor: "#1C1917", textColor: "#ffffff", accentColor: "#C8102E" },
      { id: nanoid(), layout: "cards-row", visible: true, label: "Available Animals", headline: "Animals Looking for Homes", bgColor: "#ffffff", textColor: "#1C1917", accentColor: "#C8102E" },
    ],
  };
  return base[pageId] ?? [
    { id: nanoid(), layout: "hero-full", visible: true, label: "Page Hero", headline: "Welcome", bgColor: "#1C1917", textColor: "#ffffff", accentColor: "#C8102E" },
    { id: nanoid(), layout: "text-center", visible: true, label: "Main Content", headline: "Content", body: "Add your content here.", bgColor: "#ffffff", textColor: "#1C1917", accentColor: "#C8102E" },
  ];
}

// ─── Main Page Builder ────────────────────────────────────────────────────────
export default function PageBuilder() {
  const [activePage, setActivePage] = useState("home");
  const [pageLayouts, setPageLayouts] = useState<Record<string, PageSection[]>>(() => {
    // Try to load from localStorage
    try {
      const saved = localStorage.getItem("cms_page_layouts");
      if (saved) return JSON.parse(saved);
    } catch {}
    return Object.fromEntries(PAGES.map((p) => [p.id, defaultSections(p.id)]));
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const sections = pageLayouts[activePage] ?? defaultSections(activePage);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function setActiveSections(updater: (prev: PageSection[]) => PageSection[]) {
    setPageLayouts((prev) => ({
      ...prev,
      [activePage]: updater(prev[activePage] ?? defaultSections(activePage)),
    }));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setActiveSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function updateSection(id: string, patch: Partial<PageSection>) {
    setActiveSections((items) => items.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function duplicateSection(id: string) {
    setActiveSections((items) => {
      const idx = items.findIndex((s) => s.id === id);
      if (idx === -1) return items;
      const copy = { ...items[idx], id: nanoid(), label: items[idx].label + " (copy)" };
      const next = [...items];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  }

  function deleteSection(id: string) {
    setActiveSections((items) => items.filter((s) => s.id !== id));
  }

  function toggleSection(id: string) {
    setActiveSections((items) =>
      items.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  }

  function addSection(layout: SectionLayout) {
    const newSection: PageSection = {
      id: nanoid(),
      layout,
      visible: true,
      label: LAYOUT_OPTIONS.find((l) => l.value === layout)?.label ?? "New Section",
      bgColor: "#ffffff",
      textColor: "#1C1917",
      accentColor: "#C8102E",
    };
    setActiveSections((items) => [...items, newSection]);
  }

  async function saveLayouts() {
    setSaving(true);
    try {
      // Persist to localStorage (works without DB)
      localStorage.setItem("cms_page_layouts", JSON.stringify(pageLayouts));
      // Also try to save to server CMS
      try {
        const res = await fetch("/api/trpc/adminCms.bulkSet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "0": {
              json: Object.entries(pageLayouts).map(([pageId, secs]) => ({
                key: `page.${pageId}.layout`,
                value: JSON.stringify(secs),
                label: `${pageId} page layout`,
                contentType: "json",
                section: "page-builder",
              })),
            },
          }),
        });
      } catch {}
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Page selector + save */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 flex-wrap">
          {PAGES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePage(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePage === p.id
                  ? "bg-white text-[#1C1917] shadow-sm"
                  : "text-gray-500 hover:text-[#1C1917]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={saveLayouts}
          disabled={saving}
          className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            saved
              ? "bg-green-500 text-white"
              : "bg-[#C8102E] hover:bg-[#a00d24] text-white"
          }`}
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? "Saved!" : "Save Layout"}
        </button>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
        <strong>Drag</strong> sections to reorder · <strong>Click ▼</strong> to edit content & photos · <strong>👁</strong> to show/hide · <strong>⧉</strong> to duplicate
      </div>

      {/* Section count */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          {PAGES.find((p) => p.id === activePage)?.label} — {sections.length} section{sections.length !== 1 ? "s" : ""}
        </h3>
        <span className="text-xs text-gray-400">
          {sections.filter((s) => s.visible).length} visible
        </span>
      </div>

      {/* Sortable list */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {sections.map((section) => (
              <SortableSectionCard
                key={section.id}
                section={section}
                onUpdate={updateSection}
                onDuplicate={duplicateSection}
                onDelete={deleteSection}
                onToggle={toggleSection}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add section */}
      <AddSectionPanel onAdd={addSection} />
    </div>
  );
}
