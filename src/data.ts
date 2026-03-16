import { StylesConfig } from "react-select"
import { TaskOption } from "./types"

export const dataMock = [
  { title: 'Backlog', issues: [] },
  { title: 'Ready', issues: [] },
  { title: 'In Progress', issues: [] },
  { title: 'Finished', issues: [] },
]

export const SELECT_STYLE: StylesConfig<TaskOption, false> = {
  container: (base) => ({ 
    ...base, 
    width: '100%',
    marginBottom: '5px'
  }),
  control: (base, state) => ({ 
    ...base, 
    borderRadius: '5px',
    boxShadow: state.isFocused ? '0 0 0 1px #0079BF' : 'none', 
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '18px',
    cursor: 'pointer',
  }),
  menu: (base) => ({ ...base, width: '100%' }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
}