"use client";

import { useRouter } from "next/navigation";
import { FilterBar } from "@/components/ui/FilterBar";

const CATEGORIES = ["Todos", "Hombres", "Mujeres", "Accesorios"];

export function FilterBarWrapper({ initialCategory }: { initialCategory: string }) {
  const router = useRouter();

  const handleCategoryChange = (category: string) => {
    if (category === "Todos") {
      router.push("/catalog");
    } else {
      router.push(`/catalog?category=${category}`);
    }
  };

  return (
    <FilterBar 
      categories={CATEGORIES}
      selectedCategory={initialCategory}
      onSelectCategory={handleCategoryChange}
    />
  );
}
