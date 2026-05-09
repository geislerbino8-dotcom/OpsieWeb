
import {  createContext, useState, useEffect} from "react"
import WebContentLayout from "./WebContentLayout"
import { getContent } from "@/api/getContent"

type ContentType = Record<string, any>

export const WebContentContext = createContext<ContentType | null>(null)


function WebContentFrom() {
  const [ content, setContent ] = useState<ContentType | null>(null)

  useEffect(()=> {
      const fetchContent = async()=> {
        let res = await getContent()
        setContent(res.data[0])
      }
  
      fetchContent()
    }, [])

    console.log(content)

  return (
      <WebContentContext.Provider value={content}>
        <WebContentLayout />
      </WebContentContext.Provider>
  )
}

export default WebContentFrom
