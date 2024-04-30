import { toast } from "react-toastify"

export const asyncHandler=(fn)=>{
    return async ()=>{
        try{
await fn()
        }catch(error){
toast.error(error.response.data.message || "Something went wrong!")
        }
    }
}