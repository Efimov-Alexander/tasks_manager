import {IProject, ProjectStatus} from "src/entities/Project";
import {TaskPriority, TaskStatus} from "src/entities/Task";

import football from 'src/assets/images/football.webp'
import handball from 'src/assets/images/handball.jpg'

const DATES = [
  new Date(2025, 0, 11, 13, 26),
  new Date(2025, 0, 2, 13, 40),
  new Date(2025, 0, 15, 17, 28),
  new Date(2024, 9, 2, 18, 54),
  new Date(2024, 3, 3, 12, 29),
  new Date(2025, 0, 4, 15, 29),
  new Date(2025, 0, 7, 9, 29),
];

export const IMAGES = [football, handball]

export const INIT_PROJECTS: IProject[] = [
  {
    id: 2,
    status: ProjectStatus.active,
    title: 'Handball',
    description: 'Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.',
    imageSrc: 1,
    tasks: [
      {
        id: 1,
        title: 'Cone Dribbling Maze',
        description: '<h3 style="text-align: center;"><em>Set up a zig-zag pattern with cones. Dribble through them as fast as possible while<span style="color: #3598db;"> keeping close control.Set up a zig-zag pattern with cones. Dribble through them as fast as possible while keeping close control.Set up a zig-zag pattern with cones. Dribble through them as fast as possible while keeping close control.Set up a zig-zag pattern with cones. Dribble</span></em></h3>\n' +
          '<h3 style="text-align: center;"><em>tern with cones. Dribble through them as fast as possible while<span style="color: #3598db;"> keeping close control.Set up a zig-zag pattern with cones. Dribble through them as fast as possible while keeping close control.Set up a zig-zag pattern with cones. Dribble through them as fast as possible while ke</span></em></h3>\n' +
          '<h3 style="text-align: center;"><em>tern with cones. Dribble through them as fast as possible while<span style="color: #3598db;"> keeping close control.Set up a zig-zag pattern with cones. Dribble through them as fast as possible while keeping close control.Set up a zig-zag pattern with cones. Dribble through them as fast as possible while ke</span></em></h3>\n' +
          '<h3 style="text-align: center;"><em>tern with cones. Dribble through them as fast as possible while<span style="color: #3598db;"> keeping close control.Set up a zig-zag pattern with cones. Dribble through them as fast as possible while keeping close control.Set up a zig-zag pattern with cones. Dribble through them as fast as possible while ke</span></em></h3>\n' +
          '<h3 style="text-align: center;"><em>tern with cones. Dribble through them as fast as possible while<span style="color: #3598db;"> keeping close control.Set up a zig-zag pattern with cones. Dribble through them as fast as possible while keeping close control.Set up a zig-zag pattern with cones. Dribble through them as fast as possible while ke</span></em></h3>\n' +
          '<p>&nbsp;</p>',
        priority: TaskPriority.urgent,
        status: TaskStatus.queue,
        createdAt: DATES[0],
      },
      {
        id: 3,
        title: '1v1 Dribbling Challenge',
        description: 'Partner up with another player. Try to dribble past them and reach a target zone within 5 seconds.',
        priority: TaskPriority.medium,
        status: TaskStatus.development,
        createdAt: DATES[1],
        subTasks: [
          {
            id: 17,
            title: 'Ball Mastery Circuit',
            description: 'Perform a sequence of ball control moves (toe taps, step-overs, drag-backs) for 2 minutes without stopping.',
            priority: TaskPriority.high,
            status: TaskStatus.queue,
            createdAt: DATES[2],
            mainTask: {
              title: '1v1 Dribbling Challenge',
              id: 3
            },
          },
          {
            id: 18,
            title: 'Ball Mastery Circuit',
            description: 'Perform a sequence of ball control moves (toe taps, step-overs, drag-backs) for 2 minutes without stopping.',
            priority: TaskPriority.medium,
            status: TaskStatus.queue,
            createdAt: DATES[2],
            mainTask: {
              title: '1v1 Dribbling Challenge',
              id: 3
            },
          },
        ],
        comments: [
          {
            id: 1,
            text: 'Nice idea!',
            createdAt: DATES[3],
            userName: 'Alex',
          },
          {
            id: 2,
            text: 'Nice idea!',
            createdAt: DATES[3],
            userName: 'Alex',
            comments: [
              {
                id: 3,
                text: 'Nice idea!',
                createdAt: DATES[1],
                userName: 'Alex',
              },
              {
                id: 4,
                text: 'Nice idea!',
                createdAt: DATES[3],
                userName: 'Alex',
              },
              {
                id: 5,
                text: 'Nice idea!',
                createdAt: DATES[2],
                userName: 'Alex',
                comments: [
                  {
                    id: 6,
                    text: 'Nice idea!',
                    createdAt: DATES[3],
                    userName: 'Alex',
                    comments: [
                      {
                        id: 7,
                        text: 'Nice idea!',
                        createdAt: DATES[3],
                        userName: 'Alex',
                      },
                      {
                        id: 8,
                        text: 'Nice idea!',
                        createdAt: DATES[3],
                        userName: 'Alex',
                      }
                    ]
                  },
                  {
                    id: 9,
                    text: 'Nice idea!',
                    createdAt: DATES[3],
                    userName: 'Alex',
                  },
                  {
                    id: 10,
                    text: 'Nice idea!',
                    createdAt: DATES[3],
                    userName: 'Alex',
                  }
                ]
              }
            ]
          },
          {
            id: 11,
            text: 'I\'m agree, but need to repair! I\'m agree, but need to repair! I\'m agree, but need to repair! I\'m agree, but need to repair! I\'m agree, but need to repair! I\'m agree, but need to repair! ',
            createdAt: DATES[4],
            userName: 'Martin',
          },
          {
            id: 12,
            text: 'We\'ll repair it! ',
            createdAt: DATES[6],
            userName: 'John',
            comments: [
              {
                id: 13,
                text: 'Nice idea!',
                createdAt: DATES[3],
                userName: 'Alex',
              },
              {
                id: 14,
                text: 'Nice idea!',
                createdAt: DATES[3],
                userName: 'Alex',
              }
            ]
          },
        ],
      },
      {
        id: 6,
        title: 'Wall Passing Accuracy',
        description: 'Pass the ball against a wall from different distances, focusing on one-touch and two-touch passing accuracy.',
        priority: TaskPriority.urgent,
        status: TaskStatus.done,
        endedAt: new Date(),
        createdAt: DATES[4],
      },
    ],
  },
  {
    id: 1,
    status: ProjectStatus.closed,
    title: 'Football',
    description: 'Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.',
    imageSrc: 1,
    tasks: [
      {
        id: 9,
        title: 'title1',
        description: 'descdes cdescde scd escdescd escdescd escde scdescd escd escdes cdescde scdes cdesc descdesc',
        priority: TaskPriority.high,
        status: TaskStatus.development,
        createdAt: DATES[5],
      },
      {
        id: 10,
        title: 'title2',
        description: 'descdes cdescde scd escdescd escdescd escde scdescd escd escdes cdescde scdes cdesc descdesc',
        priority: TaskPriority.urgent,
        status: TaskStatus.done,
        endedAt: new Date(),
        createdAt: DATES[6],
      },
    ],
  },
  {
    id: 3,
    status: ProjectStatus.pending,
    title: 'Football',
    description: 'Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.',
    imageSrc: 1,
    tasks: [
      {
        id: 11,
        title: 'title1',
        description: 'descdes cdescde scd escdescd escdescd escde scdescd escd escdes cdescde scdes cdesc descdesc',
        priority: TaskPriority.high,
        status: TaskStatus.development,
        createdAt: DATES[5],
      },
      {
        id: 12,
        title: 'title2',
        description: 'descdes cdescde scd escdescd escdescd escde scdescd escd escdes cdescde scdes cdesc descdesc',
        priority: TaskPriority.urgent,
        status: TaskStatus.done,
        endedAt: new Date(),
        createdAt: DATES[6],
      },
    ],
  },
  {
    id: 4,
    status: ProjectStatus.pending,
    title: 'Football',
    description: 'Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.',
    imageSrc: 0,
    tasks: [
      {
        id: 13,
        title: 'title1',
        description: 'descdes cdescde scd escdescd escdescd escde scdescd escd escdes cdescde scdes cdesc descdesc',
        priority: TaskPriority.high,
        status: TaskStatus.development,
        createdAt: DATES[5],
      },
      {
        id: 14,
        title: 'title2',
        description: 'descdes cdescde scd escdescd escdescd escde scdescd escd escdes cdescde scdes cdesc descdesc',
        priority: TaskPriority.urgent,
        status: TaskStatus.done,
        endedAt: new Date(),
        createdAt: DATES[6],
      },
    ],
  },
  {
    id: 5,
    status: ProjectStatus.pending,
    title: 'Football',
    description: 'Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.',
    imageSrc: 0,
    tasks: [
      {
        id: 15,
        title: 'title1',
        description: 'descdes cdescde scd escdescd escdescd escde scdescd escd escdes cdescde scdes cdesc descdesc',
        priority: TaskPriority.high,
        status: TaskStatus.development,
        createdAt: DATES[5],
      },
      {
        id: 16,
        title: 'title2',
        description: 'descdes cdescde scd escdescd escdescd escde scdescd escd escdes cdescde scdes cdesc descdesc',
        priority: TaskPriority.urgent,
        status: TaskStatus.done,
        endedAt: new Date(),
        createdAt: DATES[6],
      },
    ],
  },
]
