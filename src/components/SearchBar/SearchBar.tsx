import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import css from "./SearchBar.module.css";
import clsx from 'clsx';

interface Props {
  onSubmit: (searchText: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSubmit }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchText.trim() === '') {
      toast.error('You must enter text to search for images');
    } else {
      onSubmit(searchText);
      setSearchText('');
    }
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          placeholder="🔎 Search images and photos"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button type="submit" className={css.searchBtn}>Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
