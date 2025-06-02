ALTER TABLE "center_attendees" RENAME TO "center_attendee";--> statement-breakpoint
ALTER TABLE "center_attendee" DROP CONSTRAINT "center_attendees_location_center_location_fk";
--> statement-breakpoint
ALTER TABLE "center_attendee" DROP CONSTRAINT "center_attendees_student_id_student_id_fk";
--> statement-breakpoint
ALTER TABLE "center_attendee" ADD CONSTRAINT "center_attendee_location_center_location_fk" FOREIGN KEY ("location") REFERENCES "public"."center"("location") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "center_attendee" ADD CONSTRAINT "center_attendee_student_id_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;