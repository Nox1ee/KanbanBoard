import { StylesConfig } from "react-select"
import { TaskOption } from "./types"

export const dataMock = [
  { title: 'Backlog', issues: [] },
  { title: 'Ready', issues: [] },
  { title: 'In Progress', issues: [] },
  { title: 'Finished', issues: [] },
  // {
  //   title: 'Backlog',
  //   issues: [
  //     {
  //       id: '1',
  //       name: 'Sprint bugfix',
  //       description: '‘Fix all the bugs’'
  //     },
  //     {
  //       id: '2',
  //       name: 'Login page – performance issues',
  //       description: 'sldfjklj1k23m12'
  //     }
  //   ]
  // },
  // {
  //   title: 'Ready',
  //   issues: [
  //     {
  //       id: '11',
  //       name: 'Shop page – performance issues',
  //       description: '‘Fix all the bugs’'
  //     },
  //     {
  //       id: '12',
  //       name: 'Checkout bugfix',
  //       description: '‘Fix all the bugs’'
  //     }
  //   ]
  // },
  // {
  //   title: 'In Progress',
  //   issues: [
  //     {
  //       id: '21',
  //       name: 'User page – performance issues',
  //       description: '‘Fix all the bugs’'
  //     },
  //     {
  //       id: '22',
  //       name: 'Auth bugfix',
  //       description: '‘Fix all the bugs’'
  //     }
  //   ]
  // },
  // {
  //   title: 'Finished',
  //   issues: [
  //     {
  //       id: '31',
  //       name: 'Main page – performance issues',
  //       description: '‘Fix all the bugs’'
  //     },
  //     {
  //       id: '32',
  //       name: 'Main page bugfix',
  //       description: '‘Fix all the bugs’'
  //     }
  //   ]
  // },
]

export const SELECT_STYLE: StylesConfig<TaskOption, false> = {
  container: (base) => ({ ...base, width: '100%' }),
  control: (base) => ({ ...base, borderRadius: '5px' }),
  menu: (base) => ({ ...base, width: '100%' })
}