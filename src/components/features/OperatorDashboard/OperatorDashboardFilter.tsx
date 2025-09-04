"use client";

import { useEffect, useMemo, useState } from "react";

import { Row } from ".";
import { SearchIcon } from "@/components/ui/svg";

interface OperatorDashboardFilterProps {
  items?: Row[];
  className?: string;
  placeholder?: string;
  debounceDelay?: number;
  onFilter?: (filteredItems: Row[]) => void;
}

const OperatorDashboardFilter: React.FC<OperatorDashboardFilterProps> = ({
  items = [],
  className,
  placeholder,
  debounceDelay = 150,
  onFilter,
}) => {
  const [query, setQuery] = useState<string>("");
  const [deboucenQuery, setDebounceQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    const query = deboucenQuery.toLocaleLowerCase();
    return items.filter((item) => {
      // Search in project name and URL
      const projectNameMatch = item.project.name.toLocaleLowerCase().includes(query);
      const projectUrlMatch = item.project.url.toLocaleLowerCase().includes(query);
      
      // Search in categories (array of strings)
      const categoryMatch = item.category.some(cat => 
        cat.toLocaleLowerCase().includes(query)
      );
      
      // Search in status
      const statusMatch = item.status.toLocaleLowerCase().includes(query);
      
      // Search in entry type and condition
      const entryMatch = 
        item.entry.type.toLocaleLowerCase().includes(query) ||
        item.entry.condition.toLocaleLowerCase().includes(query);
      
      // Search in hardware specs
      const hardwareMatch = 
        item.hardware.cpu.toLocaleLowerCase().includes(query) ||
        item.hardware.ram.toLocaleLowerCase().includes(query) ||
        item.hardware.storage.toLocaleLowerCase().includes(query) ||
        item.hardware.bandwith.toLocaleLowerCase().includes(query);
      
      return projectNameMatch || projectUrlMatch || categoryMatch || statusMatch || entryMatch || hardwareMatch;
    });
  }, [items, deboucenQuery]);

  // debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(query);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, debounceDelay]);

  // callback after filtering
  useEffect(() => {
    onFilter?.(filteredItems);
  }, [filteredItems, onFilter]);

  return (
    <div
      className={
        `${className ?? ""} w-[567px] max-w-[calc(100vw-2rem)] h-[48px] md:h-[46px] px-[16px] py-[10px] mx-auto ` +
        "group flex justify-center items-center gap-[8px] rounded-[8px] border border-[var(--color-light-gray)]/20 " +
        "hover:border-[var(--color-light-gray)]/40 transition-colors duration-300"
      }
    >
      <div className="group-hover:[&>svg>path]:stroke-[var(--color-light-orange)] transition-colors duration-300">
        <SearchIcon />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "FIND YOUR PROJECT..."}
        className={
          "bg-transparent outline-none font-geist-mono font-medium w-full " +
          "text-[14px] text-[var(--color-light-gray)] placeholder:text-[var(--color-light-gray)]"
        }
      />
    </div>
  );
};

export default OperatorDashboardFilter;
