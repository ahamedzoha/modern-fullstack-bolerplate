"use client"

import { Button } from "../ui/button"
import { useStore } from "@/lib/store"

const WelcomeBox = () => {
  const { bears, increasePopulation, updateBears } = useStore()
  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p className="mt-2 text-gray-500">You have {bears} bears</p>
        <div className="flex w-64 items-center justify-between">
          <Button variant={"outline"} onClick={() => increasePopulation()}>
            Add Bear
          </Button>
          <Button variant={"destructive"} onClick={() => updateBears(0)}>
            Remove All Bears
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBox
