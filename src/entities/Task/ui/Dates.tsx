import React from "react";
import {formatDistance} from "date-fns";

import {monthYearTimeFormat} from "../lib/helpers";

import type {ITask} from "../model/types";

import s from "./Dates.module.scss";

interface IProps {
  createdAt: ITask['createdAt'],
  endedAt: ITask['endedAt']
}

export const Dates = ({createdAt, endedAt}: IProps) => {
  const formattedCreatedAt = monthYearTimeFormat(createdAt)
  const formattedEndedAt =  monthYearTimeFormat(endedAt);
  const formattedTimeAtWork = formatDistance(createdAt, new Date());

  return <div>
    <div className={s.dates}>This task created: {formattedCreatedAt}</div>
    <div className={s.dates}>Time at work: {formattedTimeAtWork}</div>
    {formattedEndedAt ? <div className={s.dates}>Done at {formattedEndedAt}</div> : null}
  </div>
}