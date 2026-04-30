import { Header } from "@/components/dashboardui/header"
import { Outlet } from "react-router-dom"

const DashBoard = ()=>{
    return(
       <>
        <Header/>
        <Outlet/>
       </>
    )
}

export default DashBoard

