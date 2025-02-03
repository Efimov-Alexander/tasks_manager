import React from 'react';

import {IProject} from "src/entities/Project";

import s from './ProjectCard.module.scss';
import {Link} from "react-router-dom";

interface IProps {
  id: IProject['id'],
  title: IProject['title'],
  description: IProject['description'],
  status: IProject['status'],
  imageSrc: IProject['imageSrc'],
}

const ProjectCard = ({ id, description, status, title, imageSrc }: IProps) => {
  return <li className={s.projectCard}>
    <Link to={`projects/${id}`}>
      <div className={s.projectCard__imageContainer}>
        <img className={s.projectCard__image} src={imageSrc}/>
      </div>
      <div>
        <div>{title}</div>
        <p>{description}</p>
        <div>{status}</div>
      </div>
    </Link>
  </li>;
}

export default ProjectCard;
