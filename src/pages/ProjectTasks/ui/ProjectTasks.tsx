import React, {ChangeEvent, useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import {TasksColumn} from "./TasksColumn";
import {ITask, TaskStatus} from "src/entities/Task";

import s from './ProjectTasks.module.scss'
import { useAddTask} from "../model/hooks";
import { ProjectsContext} from "../../../app/model/appHelper";
import {Button} from "../../../shared/ui/Button";
import {ROUTES} from "../../../app/constants/routes";
import {SearchedTask} from "./SearchedTask";
import cn from "classnames";
import {getFilteredTasks, getProjectById, getSearchedTasks} from "../model/projectTasksHelper";


const columns = Object.values(TaskStatus);

function ProjectTasks() {
  const { projectId } = useParams();
  const { projects } = useContext(ProjectsContext);
  const { addTask } = useAddTask();
  const [searchText, setSearchText] = useState<string>('');
  const [visibleSearchedTasks, setVisibleSearchedTasks] = useState<boolean>(false);

  if (!projectId) return null;

  const project = getProjectById({ projects, id: parseInt(projectId) });
  const filteredTasks = getFilteredTasks(project);
  const searchedTasks = getSearchedTasks(project, searchText);
  const className = cn(s.projectTasks__searchResult, {
    [s.projectTasks__searchResult_hidden]: !visibleSearchedTasks,
  })

  const onAddTask = (status: TaskStatus) => addTask({project, status})
  const onBlurOrFocus = () => setVisibleSearchedTasks(!visibleSearchedTasks)
  const renderSearchedTasks = (tasks: ITask[]) => tasks.map((task) => <SearchedTask key={task.id} task={task} />)
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)

  return <div className={s.projectTasks}>
    <div className={s.projectTasks__searchWrapper}>
      Search
      <div className={s.projectTasks__inputWrapper}>
        <input onBlur={onBlurOrFocus} onFocus={onBlurOrFocus} className={s.projectTasks__searchInput} onChange={onChangeSearch} value={searchText} type="text"/>
        {searchText ? <div className={className}>
          {searchedTasks.length ? renderSearchedTasks(searchedTasks) : 'Not Found'}
        </div> : null}
      </div>
    </div>

    <div className={s.projectTasks__columnsContainer}>
      { filteredTasks ? columns.map((column) => <TasksColumn onAddTask={onAddTask} key={column} title={column} tasks={filteredTasks[column]}/>) : null}
    </div>
    <Button isRouterLink url={ROUTES.tasks_manager.index} className={s.projectTasks__backButton}>⬅</Button>
  </div>;
}

export default ProjectTasks;
