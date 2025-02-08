import { Loader2 } from "lucide-react"

function SpinnerLoader() {
  return (
    <div className="flex items-center justify-center animate-spin">
      <Loader2/>
    </div>
  )
}

export default SpinnerLoader
