"use client";

import { useState, useTransition, useEffect, useMemo } from "react";
import { deleteMovementAction } from "@/actions/productActions";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Trash2,
  Loader2,
  Package,
  AlertTriangle,
  Search,
  Filter,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { StockMovement } from "@/models/StockMovement";
import { useRouter } from "next/navigation";

interface MovementsClientProps {
  initialMovements: any[];
}

export default function MovementsClient({ initialMovements }: MovementsClientProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [movementToDelete, setMovementToDelete] = useState<string | null>(null);

  // Stati per i Filtri
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "in" | "out">("all");

  const [, startTransition] = useTransition();
  const { t, locale } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const confirmDelete = () => {
    if (!movementToDelete) return;

    const id = movementToDelete;
    setDeletingId(id);
    setMovementToDelete(null);

    startTransition(async () => {
      const res = await deleteMovementAction(id);
      if (res.success) {
        router.refresh();
      } else {
        alert(t.movementsHistory.deleteError);
      }
      setDeletingId(null);
    });
  };

  // Logica di filtraggio dei movimenti in tempo reale
  const filteredMovements = useMemo(() => {
    return initialMovements.filter((m: StockMovement) => {
      // Filtro per Tipo (in / out)
      const matchesType = typeFilter === "all" || m.type === typeFilter;

      // Filtro per Nome o SKU (supporta sia italiano che inglese)
      const productNameIt = m.productName || "";
      const productNameEn = m.productName_en || "";
      const productSku = m.productSku || "";
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        productNameIt.toLowerCase().includes(query) ||
        productNameEn.toLowerCase().includes(query) ||
        productSku.toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }, [initialMovements, typeFilter, searchQuery]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t.movementsHistory.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.movementsHistory.subtitle}
          </p>
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground self-start sm:self-auto">
          {filteredMovements.length} / {initialMovements.length} {t.movementsHistory.countLabel}
        </span>
      </div>

      {/* BARRA DEI FILTRI (Search & Type Toggle) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card p-3 rounded-xl border border-border shadow-sm">
        {/* Input di Ricerca */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.movementsHistory.searchPlaceholder || "Cerca per nome o SKU..."}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Filtri Tipo (Tutti / Carichi / Scarichi) */}
        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border self-start sm:self-auto">
          <button
            onClick={() => setTypeFilter("all")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              typeFilter === "all"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.movementsHistory.filterAll || "Tutti"}
          </button>
          <button
            onClick={() => setTypeFilter("in")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              typeFilter === "in"
                ? "bg-emerald-500/20 text-emerald-600 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.movementsHistory.filterIn || "Carichi"}
          </button>
          <button
            onClick={() => setTypeFilter("out")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              typeFilter === "out"
                ? "bg-rose-500/20 text-rose-600 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.movementsHistory.filterOut || "Scarichi"}
          </button>
        </div>
      </div>

      {/* Lista Movimenti */}
      <div className="flex flex-col gap-3">
        {initialMovements.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-xl border border-border shadow-sm">
            <Package className="w-10 h-10 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground font-medium">
              {t.movementsHistory.empty}
            </p>
          </div>
        ) : filteredMovements.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-card rounded-xl border border-border shadow-sm">
            <Filter className="w-8 h-8 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground font-medium">
              {t.movementsHistory.noResults || "Nessun movimento corrisponde ai filtri selezionati."}
            </p>
          </div>
        ) : (
          filteredMovements.map((m: StockMovement) => (
            <div
              key={m._id as string}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card hover:bg-muted/40 rounded-xl border border-border gap-4 transition-all shadow-sm"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div
                  className={`p-2.5 rounded-lg flex-shrink-0 mt-0.5 ${
                    m.type === "in"
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                  }`}
                >
                  {m.type === "in" ? (
                    <ArrowDownLeft className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground text-sm truncate">
                      {locale === "it" ? m.productName : m.productName_en}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                      {m.productSku}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(m.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      m.type === "in"
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                    }`}
                  >
                    {m.type === "in"
                      ? t.movementsHistory.typeIn
                      : t.movementsHistory.typeOut}
                  </span>

                  <span className="font-bold text-sm tracking-tight px-2 py-0.5 rounded bg-background border border-border">
                    {m.type === "in" ? `+${m.quantity}` : `-${m.quantity}`}
                  </span>
                </div>

                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-foreground border border-border max-w-[140px] sm:max-w-[180px] truncate">
                  {m.reason}
                </span>

                <button
                  onClick={() => setMovementToDelete(m._id as string)}
                  disabled={deletingId === m._id}
                  className="p-2 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 transition-colors disabled:opacity-50 ml-1"
                  title={t.movementsHistory.deleteTooltip}
                >
                  {deletingId === m._id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DIALOG MODAL CONFIRMATION */}
      {movementToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2 rounded-full bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-foreground">
                {t.movementsHistory.confirmDeleteTitle}
              </h2>
            </div>

            <p className="text-sm text-muted-foreground">
              {t.movementsHistory.deleteConfirm}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setMovementToDelete(null)}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-muted transition-colors"
              >
                {t.movementsHistory.cancel}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              >
                {t.movementsHistory.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}