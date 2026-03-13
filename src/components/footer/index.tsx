import s from './style.module.scss'

interface FooterProps {
  activeTasks?: number | string;
  finishedTasks?: number | string;
}

const Footer = ({ activeTasks, finishedTasks }: FooterProps ) => {
  return(
    <footer className={s.footer}>
      <div className={s.tasks}> 
        {/* <span>Active tasks: {activeTasks ? activeTasks.length : 'N/A'}</span> */}
        <span>Active tasks: {activeTasks}</span>
        {/* <span>Finished tasks: {finishedTasks ? finishedTasks.length : 'N/A'}</span> */}
        <span>Finished tasks: {finishedTasks}</span>
      </div>
      <div className={s.about}>
        <span>Kanban board by Nox1ee, 2026</span>
      </div>
    </footer>
  )
}

export default Footer;