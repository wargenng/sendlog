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
    name: varchar("name", { length: 256 }).notNull(),
    grade: varchar("grade", { length: 10 }).notNull(),
    attempts: integer("attempts"),
    rating: integer("rating"),
    location: integer("location").notNull(),
    pitches: integer("pitches").default(sql`1`),
    notes: varchar("notes", { length: 256 }).default(sql`''`),
    sendDate: timestamp("sent_on", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    isRepeat: boolean("is_repeat").default(sql`false`),
    isSend: boolean("is_send").default(sql`true`),
    isFavorite: boolean("is_favorite").default(sql`false`),
    type: varchar("type", { length: 256 }),
    userId: varchar("userId", { length: 256 }).notNull(),
    sessionId: varchar("sessionId", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export type Climb = {
    id: number;
    name: string;
    grade: string;
    attempts: number | null;
    rating: number | null;
    location: number;
    notes: string | null;
    type: string | null;
    sendDate: Date;
    isRepeat: boolean | null;
    isSend: boolean | null;
    userId: string;
    sessionId: string | null;
    createdAt: Date;
    updatedAt: Date | null;
};

export const sessions = createTable("session", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    date: timestamp("date", { withTimezone: true }).notNull(),
    location: integer("location").notNull(),
    notes: varchar("notes", { length: 256 }).default(sql`''`),
    groupId: varchar("groupId", { length: 256 }),
    userId: varchar("userId", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export type Session = {
    id: number;
    name: string;
    date: Date;
    location: number;
    notes: string;
    groupId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

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

export type Friendship = {
    id: number;
    userId: string;
    friendId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};

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

export type Goal = {
    id: number;
    name: string;
    grade: string;
    priority: number;
    location: number;
    notes: string;
    userId: string;
    climbId: string;
    completedOn: Date;
    createdAt: Date;
    updatedAt: Date;
};

export const workouts = createTable("workout", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    type: varchar("type", { length: 256 }).notNull(),
    notes: varchar("notes", { length: 256 }).default(sql`''`),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});

export const notifications = createTable("notification", {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 256 }).notNull(),
    message: varchar("message", { length: 256 }).notNull(),
    read: boolean("read").default(sql`false`),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
        () => new Date(),
    ),
});
