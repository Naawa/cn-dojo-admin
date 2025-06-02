CREATE TABLE "center_attendees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location" text NOT NULL,
	"student_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "center_attendees" ADD CONSTRAINT "center_attendees_location_center_location_fk" FOREIGN KEY ("location") REFERENCES "public"."center"("location") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "center_attendees" ADD CONSTRAINT "center_attendees_student_id_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE no action ON UPDATE no action;