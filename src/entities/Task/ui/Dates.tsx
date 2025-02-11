import s from "./Dates.module.scss";
import React from "react";
import {ITask} from "../model/types";
import {formatDistance} from "date-fns";
import {monthYearTimeFormat} from "../model/taskHelper";

interface IProps {
  createdAt: ITask['createdAt'],
  endedAt: ITask['endedAt']
}

export const Dates = ({createdAt, endedAt}: IProps) => {
  const formattedCreatedAt = monthYearTimeFormat(createdAt)
  const formattedEndedAt =  monthYearTimeFormat(endedAt);
  const formattedTimeAtWork = formatDistance(createdAt, new Date());

  return <>
    <div className={s.dates}>This task created: {formattedCreatedAt}</div>
    <div className={s.dates}>Time at work: {formattedTimeAtWork}</div>
    {formattedEndedAt ? <div className={s.dates}>Done at {formattedEndedAt}</div> : null}
  </>
}