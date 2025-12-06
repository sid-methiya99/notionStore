import { relations } from "drizzle-orm/relations";
import { user, storeId, session, account } from "./schema";

export const storeIdRelations = relations(storeId, ({one}) => ({
	user: one(user, {
		fields: [storeId.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	storeIds: many(storeId),
	sessions: many(session),
	accounts: many(account),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));