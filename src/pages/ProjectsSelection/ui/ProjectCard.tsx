import React from 'react';

import {IProject, ProjectStatus} from "src/entities/Project";

import s from './ProjectCard.module.scss';
import {Link} from "react-router-dom";
import cn from "classnames";

interface IProps {
  id: IProject['id'],
  title: IProject['title'],
  description: IProject['description'],
  status: IProject['status'],
  imageSrc: IProject['imageSrc'],
}

const ProjectCard = ({ id, description, status, title, imageSrc }: IProps) => {
  const statusClassnames = cn(s.projectCard__status, {
    [s.projectCard__status_active]: status === ProjectStatus.active,
    [s.projectCard__status_closed]: status === ProjectStatus.closed,
  });

  const projectClassnames = cn(s.projectCard, {
    [s.projectCard_closed]: status === ProjectStatus.closed,
  })

  return <li className={projectClassnames}>
    <Link className={s.projectCard__link} to={`projects/${id}`}>
      <div className={s.projectCard__imageContainer}>
        <img className={s.projectCard__image} src={require('src/assets/images/handball.jpg')} alt={'Project image'}/>
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
