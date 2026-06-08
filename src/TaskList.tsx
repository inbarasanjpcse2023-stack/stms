.colWrapper {
  background: var(--paper2);
  border: 1px solid var(--border);
  border-radius: var(--r);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.colHead {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
}

.colAdded { border-top: 3px solid #5b8dee; }
.colStarted { border-top: 3px solid var(--amber); }
.colCompleted { border-top: 3px solid var(--green); }

.colLabel {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.colAdded .colLabel { color: #3b5db8; }
.colStarted .colLabel { color: var(--amber-d); }
.colCompleted .colLabel { color: var(--green); }

.countBadge {
  background: var(--paper3);
  border: 1px solid var(--border);
  border-radius: 2rem;
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 600;
  padding: 0.1rem 0.5rem;
  color: var(--ink2);
}

.colBody {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 80px;
  flex: 1;
}

.taskCard {
  background: var(--paper);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 0.75rem;
  cursor: grab;
  transition: all 0.15s;
  position: relative;
}

.taskCard:hover {
  border-color: var(--amber);
  box-shadow: var(--shadow);
}

.taskName {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 0.2rem;
  text-transform: capitalize;
  line-height: 1.35;
}

.taskDate {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--ink4);
  margin-bottom: 0.35rem;
}

.taskMeta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chip {
  font-size: 10px;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 2rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.chipHigh { background: #fde8e6; color: var(--red); border: 1px solid #f5b8b4; }
.chipMedium { background: #fff3e0; color: var(--orange); border: 1px solid #f9d090; }
.chipLow { background: #e8f5e9; color: var(--green); border: 1px solid #a5d6a7; }

.daysTag {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  background: var(--paper3);
  color: var(--ink2);
}

.daysTag.overdue { background: #fde8e6; color: var(--red); }
.daysTag.today { background: #fff3e0; color: var(--orange); }

.removeBtn {
  position: absolute;
  top: 0.4rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: var(--ink4);
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  padding: 0;
  opacity: 0;
  transition: opacity 0.15s;
}

.taskCard:hover .removeBtn { opacity: 1; }
.removeBtn:hover { color: var(--red); }

.emptyCol {
  text-align: center;
  padding: 1.5rem 0.5rem;
  color: var(--ink4);
  font-size: 12px;
  font-family: var(--font-mono);
  border: 2px dashed var(--border);
  border-radius: var(--r);
}
