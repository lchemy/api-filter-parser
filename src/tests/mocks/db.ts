// TODO: https://github.com/Microsoft/TypeScript/issues/21621
import { Client, Config } from "knex";
import Knex from "knex";

class NullClient extends Client {
	dialect = "test";

	constructor(config: Config) {
		super(config);
	}

	_driver(): any {
		return;
	}
}

export const db = Knex({
	client: NullClient
});
