import {
	JoinManyField,
	Orm,
	PartitionedJoinManyField,
	PluckedJoinManyField
} from "@lchemy/orm/models";

export interface VisitorContext {
	orm: Orm;
	maxDepth?: number;
	subqueryTarget?: JoinManyField | PartitionedJoinManyField | PluckedJoinManyField;
}
