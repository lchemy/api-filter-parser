import { Client, Knex, knex } from "knex";

class NullClient extends Client {
	dialect = "test";

	constructor(config: Knex.Config) {
		super(config);
	}

	_driver(): any {
		return;
	}
}

export const db = knex({
	client: NullClient
});
