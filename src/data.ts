import { StylesConfig } from "react-select"
import { TaskOption } from "./types"

export const dataMock = [
  { title: 'Backlog', issues: [] },
  { title: 'Ready', issues: [] },
  { title: 'In Progress', issues: [] },
  { title: 'Finished', issues: [] },
]

export const SELECT_STYLE: StylesConfig<TaskOption, false> = {
  container: (base) => ({ ...base, width: '100%' }),
  control: (base) => ({ ...base, borderRadius: '5px' }),
  menu: (base) => ({ ...base, width: '100%' })
}