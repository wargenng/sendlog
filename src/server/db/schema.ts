import { sql } from "drizzle-orm";
import {
    integer,
    pgTableCreator,
    serial,
    timestamp,
    varchar,
    boolean,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `sendlog_${name}`);

export const climbs = createTable("climb", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    grade: varchar("grade", { length: 10 }),
    attempts: integer("attempts"),
    rating: integer("rating"),
    location: integer("location"),
    notes: varchar("notes", { length: 256 }),
    sendDate: timestamp("sent_on", { withTimezone: true }).default(
        sql`CURRENT_TIMESTAMP`,
    ),
    isRepeat: boolean("is_repeat"),
    isSend: boolean("is_send"),
    userId: varchar("userId", { length: 256 }).notNull(),
    sessionId: varchar("sessionId", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const sessions = createTable("session", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    date: timestamp("date", { withTimezone: true }).notNull(),
    location: integer("location"),
    notes: varchar("notes", { length: 256 }),
    groupId: varchar("groupId", { length: 256 }),
    userId: varchar("userId", { length: 256 }).notNull(),
    sessionDate: timestamp("sent_on", { withTimezone: true }).default(
        sql`CURRENT_TIMESTAMP`,
    ),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const friendships = createTable("friendship", {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 256 }).notNull(),
    friendId: varchar("friendId", { length: 256 }).notNull(),
    status: varchar("status", { length: 256 }).default(sql`'pending'`),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const goals = createTable("goal", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    grade: varchar("grade", { length: 10 }),
    priority: integer("priority"),
    location: integer("location"),
    notes: varchar("notes", { length: 256 }),
    userId: varchar("userId", { length: 256 }).notNull(),
    climbId: varchar("climbId", { length: 256 }),
    completedOn: timestamp("created_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});
