import Header from "../header";
import Footer from "../footer";
import s from './style.module.scss'
import { ColumnData } from '../../types'
import { Outlet } from "react-router-dom";

const Layout = ({ tasks }: { tasks: ColumnData[] }) => {

  return (
    <div className={s.layout}>
      <header className={s.header}>
        <Header />
      </header>
      <main className={s.main}>
        <Outlet />
      </main>
      <footer className={s.footer}>
        <Footer 
        activeTasks={tasks[0]?.issues.length || 0}
        finishedTasks={tasks[tasks.length - 1]?.issues.length || 0}
        />
      </footer>
    </div>
  )
}

export default Layout;