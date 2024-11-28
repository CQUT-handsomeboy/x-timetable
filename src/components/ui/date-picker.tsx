"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useStore } from '@nanostores/react';
import { selectedDate } from "../stores/date-picker-store"

export default function Component() {
  const $selectedDate = useStore(selectedDate)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !$selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {$selectedDate ? format($selectedDate, "PPP") : <span>选择日期</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={$selectedDate}
          onSelect={selectedDate.set}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
