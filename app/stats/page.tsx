"use client";
import History from "@/utils/store/History";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

type Props = {};

const page = observer((props: Props) => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    setStats(
      //@ts-ignore
      Object.entries(
        History.getStats(
          moment().subtract(moment().isoWeekday(), "d"),
          moment().add(7 - moment().isoWeekday(), "d")
        )
        //@ts-ignore
      ).reduce(
        (acc, [key, value]) => [
          ...acc,
          { ...value, date: `${key[0]}${key[1]}.${key[2]}${key[3]}` },
        ],
        []
      )
    );
  }, []);
  return (
    <main className="gap-2 text-zinc-100 flex items-center justify-center flex-col p-4">
      {/* <p>{JSON.stringify(stats, null, 2)}</p> */}
      <h1 className="text-2xl text-zinc-100  font-bold">Statistics</h1>
      <ResponsiveContainer height="100%" aspect={0.6}>
        <BarChart data={stats}>
          <XAxis
            dataKey="date"
            fontSize={"12pt"}
            stroke="#d4d4d8"
            strokeWidth={0}
          />
          <Bar dataKey="completed" radius={[12, 12, 0, 0]} fill="#f4f4f5" />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
});

export default page;
