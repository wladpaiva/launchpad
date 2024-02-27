CREATE TABLE `interest` (
	`id` text PRIMARY KEY NOT NULL,
	`waitlist` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`waitlist`) REFERENCES `waitlist`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `waitlist` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `interest_waitlist_email_unique` ON `interest` (`waitlist`,`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_slug_unique` ON `waitlist` (`slug`);