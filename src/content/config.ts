import { z, defineCollection } from 'astro:content'

const timetableRecordSchema = z.array(z.object({
  "time":z.string().time(),
  "name":z.string(),
}))

const TimetableSchema = z.record(z.string().date(),timetableRecordSchema)

export type Timetable = z.infer<typeof TimetableSchema>;

const timetableCollection = defineCollection({
  type: 'data',
  schema: TimetableSchema
})

export const collections = {
  timetable: timetableCollection,
}
