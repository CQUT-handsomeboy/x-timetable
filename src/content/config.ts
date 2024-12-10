import { z,defineCollection } from 'astro:content';

const classesInfoSchema = z.array(z.object({
    name:  z.string(),
    time:  z.string().time()
}))

const classesRecordSchema = z.record(z.string().date(),classesInfoSchema)


const timetableCollections = defineCollection({
    schema: classesRecordSchema,
    type: 'data',
})

export const collections = {
    'timetable': timetableCollections,
};

export type classRecord =  z.infer<typeof classesRecordSchema>

