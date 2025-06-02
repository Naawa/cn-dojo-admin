import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { student } from "./student";

export const center = pgTable('center', {
    id: uuid('id').defaultRandom().primaryKey(),
    location: text('location').notNull().unique(),
});

export const centerAttendee = pgTable('center_attendee', {
    id: uuid('id').defaultRandom().primaryKey(),
    location: text('location').notNull().references(() => center.location),
    studentId: uuid('student_id').notNull().references(() => student.id)
});
export type Center = typeof center.$inferSelect;
export type CenterAttendee = typeof center.$inferSelect;
