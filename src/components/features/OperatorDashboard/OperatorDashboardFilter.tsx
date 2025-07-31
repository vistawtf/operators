"use client";

import React, { useEffect, useMemo, useState } from "react";
import SearchIcon from "@/components/ui/svg/SearchIcon";
import { Row } from "./OperatorDashboardTable";

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
  placeholder = "FIND YOUR PROJECT...",
  debounceDelay = 150,
  onFilter,
}) => {
  const [query, setQuery] = useState<string>("");
  const [deboucenQuery, setDebounceQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    const query = deboucenQuery.toLocaleLowerCase();
    return items.filter((item) =>
      item.project.name.toLocaleLowerCase().includes(query)
    );
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
        `${className ?? ""} w-[567px] h-[46px] px-[16px] py-[10px] mx-auto ` +
        "flex justify-center items-center gap-[8px] rounded-[8px]  border border-[var(--color-light-gray)]"
      }
    >
      <SearchIcon />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={
          "bg-transparent outline-none font-geist-mono font-medium " +
          "text-[14px] text-[var(--color-light-gray)] placeholder:text-[var(--color-light-gray)]"
        }
      />
    </div>
  );
};

export default OperatorDashboardFilter;
