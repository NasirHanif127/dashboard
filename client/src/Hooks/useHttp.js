import axios from "axios";
import { useState, useEffect } from "react";

const useHttp = (request) => {
    const [httpResponse, sethttpResponse] = useState(null)
    const [httpError, setHttpError] = useState(null)
    const [httpLoader, setHttpLoader] = useState(true)

    const ajax = () => {
        axios(request)
            .then((response) => {
                sethttpResponse(response.data)
            }).catch((error) => {
                setHttpError(error.response)
            }).finally(()=>{
                setHttpLoader(false)
            })
    }

    // call auto ajax request
      useEffect(()=>{
      if(request){
          ajax()
      }
    },[request])
return [httpResponse , httpError ,httpLoader]


}

export default useHttp  
