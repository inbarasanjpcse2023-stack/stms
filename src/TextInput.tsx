.boardWrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filterBar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.searchWrap {
  position: relative;
  flex: 1;
  min-width: 160px;
}

.searchIcon {
  position: absolute;
  left: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  color: var(--ink3);
  pointer-events: none;
}

.searchInput {
  background: var(--paper3);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 0.5rem 0.75rem 0.5rem 2rem;
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}

.searchInput:focus { border-color: var(--amber); background: var(--paper); }

.filterSelect {
  background: var(--paper3);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 0.5rem 0.75rem;
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--ink);
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
}

.filterSelect:focus { border-color: var(--amber); }

.sortBtn {
  background: var(--paper3);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 0.5rem 0.75rem;
  font-size: 12px;
  color: var(--ink2);
  cursor: pointer;
  white-space: nowrap;
  font-family: var(--font-mono);
  transition: all 0.15s;
}

.sortBtn:hover { border-color: var(--amber); color: var(--amber); }

.clearBtn {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 0.5rem 0.75rem;
  font-size: 12px;
  color: var(--ink3);
  cursor: pointer;
  font-family: var(--font-mono);
  transition: all 0.15s;
}

.clearBtn:hover { color: var(--red); border-color: var(--red); }

.activeFilters {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  align-items: center;
}

.filterTag {
  background: var(--amber-l);
  color: var(--amber-d);
  border: none;
  border-radius: 2rem;
  padding: 0.2rem 0.6rem;
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.15s;
}

.filterTag:hover { background: var(--amber); color: var(--ink); }

.resultsCount {
  font-size: 11px;
  color: var(--ink3);
  font-family: var(--font-mono);
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  align-items: start;
}
