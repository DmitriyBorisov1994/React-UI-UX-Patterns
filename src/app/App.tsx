import "./styles/App.scss";
import { SearchInput } from "../components/ui";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { PatternList } from "../components/PatternList/PatternList";

function App() {
  return (
    <main aria-labelledby="title-main" className="main">
      <AppHeader />
      <section aria-labelledby="title-search" className="search-section">
        <h2 id="title-search">Поиск</h2>
        <SearchInput onSearch={(v) => console.log(v)} />
      </section>
      <PatternList />
    </main>
  );
}

export default App;
