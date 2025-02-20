import { useEffect, useRef, useState } from "react";
import { Input } from "./Input";

interface SearchProps {
  search?: string;
  onSearch?: (search: string) => void;
}

export const SearchInput = ({ search, onSearch }: SearchProps) => {
  const [searchValue, setSearchValue] = useState(search || "");
  const [rendered, setRendered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (rendered && inputRef?.current) {
      const submitInput = document.createElement("input");
      submitInput.type = "submit";
      submitInput.value = "Найти";
      inputRef.current.parentElement?.appendChild(submitInput);
    }
  }, [rendered]);

  return (
    <form onSubmit={onSearchSubmit} role="search">
      <Input
        inputClassName="input"
        wrapperClassName="form"
        labelText="Поиск"
        placeholder="Напишите что-нибудь"
        ref={inputRef}
        value={searchValue}
        onChange={(v) => setSearchValue(v)}
        type="search"
      />
    </form>
  );
};
