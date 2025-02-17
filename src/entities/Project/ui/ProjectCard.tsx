import React from 'react';
import cn from "classnames";
import {Link} from "react-router-dom";

import {IProject, ProjectStatus} from "../model/types";
import {IMAGES} from "../constants/data";

import s from './ProjectCard.module.scss';

interface IProps {
  project: IProject
}

export const ProjectCard = ({project}: IProps) => {
  const { id, description, status, title, imageSrc } = project;

  const statusClassnames = cn(s.projectCard__status, {
    [s.projectCard__status_pending]: status === ProjectStatus.pending,
    [s.projectCard__status_active]: status === ProjectStatus.active,
    [s.projectCard__status_closed]: status === ProjectStatus.closed,
  });

  const projectClassnames = cn(s.projectCard, {
    [s.projectCard_closed]: status === ProjectStatus.closed,
  })

  return <li className={projectClassnames}>
    <Link className={s.projectCard__link} to={`projects/${id}`}>
      <div className={s.projectCard__imageContainer}>
        <img className={s.projectCard__image} src={IMAGES[imageSrc]} alt={'Project'}/>
      </div>
      <div className={s.projectCard__infoWrapper}>
        <div className={s.projectCard__title}>{title}</div>
        <p className={s.projectCard__description} >{description}</p>
        <div className={statusClassnames} >{status}</div>
      </div>
    </Link>
  </li>;
}

export default ProjectCard;
