.formCard {
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.formTitle {
  font-family: var(--font-head);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink2);
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
}

.formField {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.selectInput {
  background: var(--paper3);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 0.5rem 0.75rem;
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--ink);
  outline: none;
  cursor: pointer;
  width: 100%;
  transition: border-color 0.15s;
}

.selectInput:focus { border-color: var(--amber); }

.buttonRow {
  display: flex;
  gap: 0.5rem;
}

.btnPrimary {
  flex: 1;
  padding: 0.55rem 1rem;
  border-radius: var(--r);
  border: none;
  cursor: pointer;
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  background: var(--amber);
  color: var(--ink);
  transition: all 0.15s;
}

.btnPrimary:hover { background: var(--amber-d); color: var(--paper); }

.btnGhost {
  flex: 1;
  padding: 0.55rem 1rem;
  border-radius: var(--r);
  border: 1px solid var(--border);
  cursor: pointer;
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  background: transparent;
  color: var(--ink2);
  transition: all 0.15s;
}

.btnGhost:hover { background: var(--paper3); }
