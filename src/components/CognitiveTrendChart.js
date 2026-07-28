// File: components/CognitiveTrendChart.js
'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const defaultData = [
  { date: 'Mon', cognitiveScore: 72, sleepHours: 6.0 },
  { date: 'Tue', cognitiveScore: 78, sleepHours: 7.0 },
  { date: 'Wed', cognitiveScore: 65, sleepHours: 5.5 },
  { date: 'Thu', cognitiveScore: 85, sleepHours: 8.0 },
  { date: 'Today', cognitiveScore: 88, sleepHours: 7.5 },
]

export default function CognitiveTrendChart({ data = defaultData }) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-white">Cognitive Index vs. Sleep Trend</h3>
        <span className="text-xs text-indigo-400 font-semibold">Weekly View</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
            <YAxis yAxisId="left" stroke="#818cf8" fontSize={12} domain={[0, 100]} />
            <YAxis yAxisId="right" orientation="right" stroke="#38bdf8" fontSize={12} domain={[0, 12]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                borderColor: '#374151',
                borderRadius: '12px',
                color: '#fff'
              }}
            />
            <Line yAxisId="left" type="monotone" dataKey="cognitiveScore" stroke="#818cf8" strokeWidth={3} name="Cognitive Score" />
            <Line yAxisId="right" type="monotone" dataKey="sleepHours" stroke="#38bdf8" strokeWidth={2} strokeDasharray="4 4" name="Sleep (hrs)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}