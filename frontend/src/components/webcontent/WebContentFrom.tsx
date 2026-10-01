
import { useState, useEffect} from "react"
import WebContentLayout from "./WebContentLayout"
import { getContent } from "@/api/getContent"
import { WebContentContext, type ContentType } from "./WebContentContext"

function WebContentFrom() {
  const [ content, setContent ] = useState<ContentType | null>(null)


  useEffect(()=> {
      const fetchContent = async()=> {
        const res = await getContent()
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
