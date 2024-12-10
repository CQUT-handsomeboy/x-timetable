import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { type classRecord } from "../content/config";
import { getTimeStamp } from "../lib/utils";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

export default function Table({ data }: { data: classRecord }) {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );

  return (
    <Card className="mb-12 shadow-lg">
      <CardHeader>
        <CardTitle>
          {selectedDate} {dayjs(selectedDate).format("dddd")}
        </CardTitle>
        <CardDescription>
          {selectedDate in data
            ? `⚡有${data[selectedDate].length}节课`
            : "😪无课。"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-2 gap-4">
          {selectedDate in data
            ? data[selectedDate]
                .sort((a, b) => getTimeStamp(a.time) - getTimeStamp(b.time))
                .map((item) => (
                  <>
                    <li>⏲️ {item.time} </li>
                    <li>{item.name} </li>
                  </>
                ))
            : ""}
        </ul>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button
          onClick={() => {
            setSelectedDate(
              dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD")
            );
          }}
        >
          👈前一天
        </Button>
        <Button
          onClick={() => {
            setSelectedDate(dayjs().format("YYYY-MM-DD"));
          }}
        >
          🤪今天
        </Button>
        <Button
          onClick={() => {
            setSelectedDate(
              dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD")
            );
          }}
        >
          👉后一天
        </Button>
      </CardFooter>
    </Card>
  );
}
