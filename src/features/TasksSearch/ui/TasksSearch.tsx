import React, {ChangeEvent, useState} from "react";
import cn from "classnames";

import {onFindTask, ITask} from "src/entities/Task";

import {getSearchedTasks} from "../lib/helpers";

import type {IProject} from "src/entities/Project";

import s from './TasksSearch.module.scss'

interface IProps {
  project: IProject,
}

export const TasksSearch = ({project}: IProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [visibleSearchedTasks, setVisibleSearchedTasks] = useState<boolean>(false);
  const searchedTasks = getSearchedTasks(project, searchText);

  const className = cn(s.tasksSearch__searchResult, {
    [s.tasksSearch__searchResult_hidden]: !visibleSearchedTasks,
  })

  const onBlurOrFocus = () => setVisibleSearchedTasks(!visibleSearchedTasks)
  const renderSearchedTasks = (tasks: ITask[]) => tasks.map((task) => <div className={s.tasksSearch__searchedTask} onClick={() => onFindTask(task.id)}>{`${task.id} - ${task.title}`}</div>)
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)

  return <div className={s.tasksSearch__searchWrapper}>
    Search
    <div className={s.tasksSearch__inputWrapper}>
      <input onBlur={onBlurOrFocus} onFocus={onBlurOrFocus} className={s.tasksSearch__searchInput} onChange={onChangeSearch} value={searchText} type="text"/>
      {searchText ? <div className={className}>
        {searchedTasks.length ? renderSearchedTasks(searchedTasks) : 'Not Found'}
      </div> : null}
    </div>
  </div>
}