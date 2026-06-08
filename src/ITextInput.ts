import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from 'src/components/StrictModeDroppable/StrictModeDroppable';
import TaskItem from 'src/components/TaskItem/TaskItem';
import { ITaskState } from 'src/views/TaskHome/ITaskHomeProps';
import { COMMON_TEXT, SORT_MODES, SORT_LABELS, SortMode } from 'src/helper/constants';
import "./TaskList.css";

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };

const TaskList = ({ tasks, setTasks }: ITaskState) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('none');

  const cycleSort = () => {
    const idx = SORT_MODES.indexOf(sortMode);
    setSortMode(SORT_MODES[(idx + 1) % SORT_MODES.length]);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterPriority('');
    setFilterStatus('');
    setSortMode('none');
  };

  const sortItems = (items: typeof tasks[0]['items']) => {
    const arr = [...items];
    if (sortMode === 'name-asc') arr.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortMode === 'name-desc') arr.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortMode === 'date-asc') arr.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    else if (sortMode === 'date-desc') arr.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    else if (sortMode === 'priority') arr.sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9));
    return arr;
  };

  const filterItems = (items: typeof tasks[0]['items']) => {
    return sortItems(items.filter(i => {
      const matchQ = !searchQuery || i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.priority.includes(searchQuery.toLowerCase());
      const matchP = !filterPriority || i.priority === filterPriority;
      return matchQ && matchP;
    }));
  };

  const handleDragAndDrop = (results: DropResult) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === 'group') {
      const reordered = [...tasks];
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      return setTasks(reordered);
    }

    const srcIdx = tasks.findIndex(t => t.id === source.droppableId);
    const dstIdx = tasks.findIndex(t => t.id === destination.droppableId);
    const srcItems = [...tasks[srcIdx].items];
    const dstItems = source.droppableId !== destination.droppableId ? [...tasks[dstIdx].items] : srcItems;
    const [deleted] = srcItems.splice(source.index, 1);
    dstItems.splice(destination.index, 0, deleted);
    const newTasks = [...tasks];
    newTasks[srcIdx] = { ...tasks[srcIdx], items: srcItems };
    newTasks[dstIdx] = { ...tasks[dstIdx], items: dstItems };
    localStorage.setItem(COMMON_TEXT.STORAGE_TASK, JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const filteredTasks = filterStatus ? tasks.filter(t => t.status === filterStatus) : tasks;
  const totalVisible = filteredTasks.reduce((s, t) => s + filterItems(t.items).length, 0);
  const totalAll = tasks.reduce((s, t) => s + t.items.length, 0);
  const hasFilters = searchQuery || filterPriority || filterStatus;
  const activeTags = [
    ...(searchQuery ? [{ label: `"${searchQuery}"`, key: 'search' }] : []),
    ...(filterPriority ? [{ label: `Priority: ${filterPriority}`, key: 'priority' }] : []),
    ...(filterStatus ? [{ label: `Status: ${filterStatus}`, key: 'status' }] : []),
    ...(sortMode !== 'none' ? [{ label: `Sort: ${SORT_LABELS[sortMode]}`, key: 'sort' }] : []),
  ];

  const removeFilter = (key: string) => {
    if (key === 'search') setSearchQuery('');
    if (key === 'priority') setFilterPriority('');
    if (key === 'status') setFilterStatus('');
    if (key === 'sort') setSortMode('none');
  };

  return (
    <div className="boardWrapper">
      <div className="filterBar">
        <div className="searchWrap">
          <span className="searchIcon">🔍</span>
          <input
            className="searchInput"
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <select className="filterSelect" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select className="filterSelect" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="ADDED">Added</option>
          <option value="STARTED">Started</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button className="sortBtn" onClick={cycleSort}>Sort: {SORT_LABELS[sortMode]}</button>
        <button className="clearBtn" onClick={clearFilters}>Clear</button>
      </div>

      {activeTags.length > 0 && (
        <div className="activeFilters">
          {activeTags.map(tag => (
            <button key={tag.key} className="filterTag" onClick={() => removeFilter(tag.key)}>
              {tag.label} ×
            </button>
          ))}
          {hasFilters && (
            <span className="resultsCount">Showing {totalVisible} of {totalAll} tasks</span>
          )}
        </div>
      )}

      <DragDropContext onDragEnd={handleDragAndDrop}>
        <StrictModeDroppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="board">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  {...task}
                  items={filterItems(task.items)}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
