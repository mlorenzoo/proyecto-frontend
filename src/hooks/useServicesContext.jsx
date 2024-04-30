import { useContext } from "react"
import ServicesContext from "../contexts/ServicesContext"

const useServicesContext = () => useContext(ServicesContext)

export default useServicesContext