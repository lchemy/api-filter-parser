import * as models from "@lchemy/orm/models";

import { parseApiFilter } from "./parse-api-filter";
import { $classesOrm, $schoolsOrm, $studentsOrm, $teachersOrm } from "./tests/mocks";

describe("parse api filter", () => {
	it("should parse types correctly", async () => {
		const filter0 = await parseApiFilter($schoolsOrm, `"a" eq 1`),
			filter1 = await parseApiFilter($schoolsOrm, `id eq $now`);

		const { left: left0, right: right0 } = filter0 as models.EqualFilterNode,
			{ left: left1, right: right1 } = filter1 as models.EqualFilterNode;

		expect(typeof left0).toBe("string");
		expect(typeof right0).toBe("number");
		expect(left1).toBeInstanceOf(models.ColumnField);
		expect(right1).toBeInstanceOf(models.WrappedRaw);
	});

	it("should parse nested expressions", async () => {
		const filter0 = await parseApiFilter($schoolsOrm, `("a" eq 1)`),
			filter1 = await parseApiFilter($schoolsOrm, `(((id eq 1) and (id eq 2))) or ((id eq 3))`);

		expect(filter0).toBeInstanceOf(models.EqualFilterNode);

		expect(filter1).toBeInstanceOf(models.OrFilterGroup);
		expect((filter1 as models.OrFilterGroup).expressions[0]).toBeInstanceOf(models.AndFilterGroup);
		expect((filter1 as models.OrFilterGroup).expressions[1]).toBeInstanceOf(models.EqualFilterNode);
	});

	describe("field operations", () => {
		it("should parse is null", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id is null`);
			expect(filter).toBeInstanceOf(models.IsNullFilterNode);

			const { left } = filter as models.IsNullFilterNode;
			expect(left.toString()).toBe("schools.id");
		});

		it("should parse is not null", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id is not null`);
			expect(filter).toBeInstanceOf(models.IsNotNullFilterNode);

			const { left } = filter as models.IsNotNullFilterNode;
			expect(left.toString()).toBe("schools.id");
		});

		it("should parse equals", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id eq 1`);
			expect(filter).toBeInstanceOf(models.EqualFilterNode);

			const { left, right } = filter as models.EqualFilterNode;
			expect(left.toString()).toBe("schools.id");
			expect(right).toBe(1);
		});

		it("should parse not equals", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id neq 1`);
			expect(filter).toBeInstanceOf(models.NotEqualFilterNode);

			const { left, right } = filter as models.NotEqualFilterNode;
			expect(left.toString()).toBe("schools.id");
			expect(right).toBe(1);
		});

		it("should parse greater than", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id gt 1`);
			expect(filter).toBeInstanceOf(models.GreaterThanFilterNode);

			const { left, right } = filter as models.GreaterThanFilterNode;
			expect(left.toString()).toBe("schools.id");
			expect(right).toBe(1);
		});

		it("should parse greater than or equal", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id gte 1`);
			expect(filter).toBeInstanceOf(models.GreaterThanEqualFilterNode);

			const { left, right } = filter as models.GreaterThanEqualFilterNode;
			expect(left.toString()).toBe("schools.id");
			expect(right).toBe(1);
		});

		it("should parse less than", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id lt 1`);
			expect(filter).toBeInstanceOf(models.LessThanFilterNode);

			const { left, right } = filter as models.LessThanFilterNode;
			expect(left.toString()).toBe("schools.id");
			expect(right).toBe(1);
		});

		it("should parse less than or equal", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id lte 1`);
			expect(filter).toBeInstanceOf(models.LessThanEqualFilterNode);

			const { left, right } = filter as models.LessThanEqualFilterNode;
			expect(left.toString()).toBe("schools.id");
			expect(right).toBe(1);
		});

		it("should parse like", async () => {
			const filter = await parseApiFilter($schoolsOrm, `name like "a%"`);
			expect(filter).toBeInstanceOf(models.LikeFilterNode);

			const { left, right } = filter as models.LikeFilterNode;
			expect(left.toString()).toBe("schools.name");
			expect(right).toBe("a%");
		});

		it("should parse not like", async () => {
			const filter = await parseApiFilter($schoolsOrm, `name not like "a%"`);
			expect(filter).toBeInstanceOf(models.NotLikeFilterNode);

			const { left, right } = filter as models.NotLikeFilterNode;
			expect(left.toString()).toBe("schools.name");
			expect(right).toBe("a%");
		});

		it("should parse case-insensitive like", async () => {
			const filter = await parseApiFilter($schoolsOrm, `name ilike "a%"`);
			expect(filter).toBeInstanceOf(models.ILikeFilterNode);

			const { left, right } = filter as models.ILikeFilterNode;
			expect(left.toString()).toBe("schools.name");
			expect(right).toBe("a%");
		});

		it("should parse not case-insensitive like", async () => {
			const filter = await parseApiFilter($schoolsOrm, `name not ilike "a%"`);
			expect(filter).toBeInstanceOf(models.NotILikeFilterNode);

			const { left, right } = filter as models.NotILikeFilterNode;
			expect(left.toString()).toBe("schools.name");
			expect(right).toBe("a%");
		});

		it("should parse between", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id between 1 and 2`);
			expect(filter).toBeInstanceOf(models.BetweenFilterNode);

			const { left, right } = filter as models.BetweenFilterNode;
			expect(left.toString()).toBe("schools.id");
			expect(right).toBeInstanceOf(Array);

			const [min, max] = right;
			expect(min).toBe(1);
			expect(max).toBe(2);
		});

		it("should parse not between", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id not between 1 and 2`);
			expect(filter).toBeInstanceOf(models.NotBetweenFilterNode);

			const { left, right } = filter as models.NotBetweenFilterNode;
			expect(left.toString()).toBe("schools.id");
			expect(right).toBeInstanceOf(Array);

			const [min, max] = right;
			expect(min).toBe(1);
			expect(max).toBe(2);
		});

		it("should parse in", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id in (1, 2, 3, 4)`);
			expect(filter).toBeInstanceOf(models.InFilterNode);

			const { left, right } = filter as models.InFilterNode;
			expect(left.toString()).toBe("schools.id");
			expect(right).toBeInstanceOf(Array);
			expect(right).toEqual([1, 2, 3, 4]);
		});

		it("should parse not in", async () => {
			const filter = await parseApiFilter($schoolsOrm, `id not in (1, 2, 3, 4)`);
			expect(filter).toBeInstanceOf(models.NotInFilterNode);

			const { left, right } = filter as models.NotInFilterNode;
			expect(left.toString()).toBe("schools.id");
			expect(right).toBeInstanceOf(Array);
			expect(right).toEqual([1, 2, 3, 4]);
		});
	});

	describe("join one operations", () => {
		it("should parse exists", async () => {
			const filter = await parseApiFilter($teachersOrm, `school exists`);
			expect(filter).toBeInstanceOf(models.ExistsOneFilterNode);

			const { field } = filter as models.ExistsOneFilterNode;
			expect(field).toBeInstanceOf(models.JoinOneField);
			expect(field.toString()).toBe("teachers.school");
		});

		it("should parse not exists", async () => {
			const filter = await parseApiFilter($teachersOrm, `school not exists`);
			expect(filter).toBeInstanceOf(models.NotExistsOneFilterNode);

			const { field } = filter as models.NotExistsOneFilterNode;
			expect(field).toBeInstanceOf(models.JoinOneField);
			expect(field.toString()).toBe("teachers.school");
		});

		it("should not parse exists with subquery", async () => {
			const filterPromise = parseApiFilter($teachersOrm, `school exists (id eq 1)`);
			await expect(filterPromise).rejects.toThrow();
		});

		it("should parse for plucked join one", async () => {
			const filter = await parseApiFilter($classesOrm, `teacherName exists`);
			expect(filter).toBeInstanceOf(models.AndFilterGroup);

			// one should be exists check, the other is a null check
			const { expressions } = filter as models.AndFilterGroup;
			expect(expressions).toHaveLength(2);

			const { field } = expressions.find((expr) => expr instanceof models.ExistsOneFilterNode) as models.ExistsOneFilterNode;
			expect(field.toString()).toBe("classes.teacherName");

			const { left } = expressions.find((expr) => expr instanceof models.IsNotNullFilterNode) as models.IsNotNullFilterNode;
			expect(left.toString()).toBe("classes.teacherName.name");
		});
	});

	describe("join many operations", () => {
		it("should parse exists", async () => {
			const filter = await parseApiFilter($teachersOrm, `classes exists`);
			expect(filter).toBeInstanceOf(models.ExistsManyFilterNode);

			const { field, value } = filter as models.ExistsManyFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classes");
			expect(value).toBeUndefined();
		});

		it("should parse not exists", async () => {
			const filter = await parseApiFilter($teachersOrm, `classes not exists`);
			expect(filter).toBeInstanceOf(models.NotExistsManyFilterNode);

			const { field, value } = filter as models.NotExistsManyFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classes");
			expect(value).toBeUndefined();
		});

		it("should parse exists with subquery", async () => {
			const filter = await parseApiFilter($teachersOrm, `classes exists (id eq 1)`);
			expect(filter).toBeInstanceOf(models.ExistsManyFilterNode);

			const { field, value } = filter as models.ExistsManyFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classes");

			expect(value).toBeInstanceOf(models.EqualFilterNode);
			const { left, right } = value as models.EqualFilterNode;
			expect(left.toString()).toBe("teachers.classes.id");
			expect(right).toBe(1);
		});

		it("should parse not exists with subquery", async () => {
			const filter = await parseApiFilter($teachersOrm, `classes not exists (id eq $parent.id)`);
			expect(filter).toBeInstanceOf(models.NotExistsManyFilterNode);

			const { field, value } = filter as models.NotExistsManyFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classes");

			expect(value).toBeInstanceOf(models.EqualFilterNode);
			const { left, right } = value as models.EqualFilterNode;
			expect(left.toString()).toBe("teachers.classes.id");
			expect(right.toString()).toBe("teachers.id");
		});

		it("should parse having count equals", async () => {
			const filter = await parseApiFilter($teachersOrm, `classes have count eq 1`);
			expect(filter).toBeInstanceOf(models.CountManyEqualFilterNode);

			const { field, count } = filter as models.CountManyEqualFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classes");
			expect(count).toBe(1);
		});

		it("should parse having count not equals", async () => {
			const filter = await parseApiFilter($teachersOrm, `classes have count neq 1`);
			expect(filter).toBeInstanceOf(models.CountManyNotEqualFilterNode);

			const { field, count } = filter as models.CountManyNotEqualFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classes");
			expect(count).toBe(1);
		});

		it("should parse having count greater than", async () => {
			const filter = await parseApiFilter($teachersOrm, `classes have count gt 1`);
			expect(filter).toBeInstanceOf(models.CountManyGreaterThanFilterNode);

			const { field, count } = filter as models.CountManyGreaterThanFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classes");
			expect(count).toBe(1);
		});

		it("should parse having count greater than or equal", async () => {
			const filter = await parseApiFilter($teachersOrm, `classes have count gte 1`);
			expect(filter).toBeInstanceOf(models.CountManyGreaterThanEqualFilterNode);

			const { field, count } = filter as models.CountManyGreaterThanEqualFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classes");
			expect(count).toBe(1);
		});

		it("should parse having count less than", async () => {
			const filter = await parseApiFilter($teachersOrm, `classes have count lt 1`);
			expect(filter).toBeInstanceOf(models.CountManyLessThanFilterNode);

			const { field, count } = filter as models.CountManyLessThanFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classes");
			expect(count).toBe(1);
		});

		it("should parse having count less than or equal", async () => {
			const filter = await parseApiFilter($teachersOrm, `classes have count lte 1`);
			expect(filter).toBeInstanceOf(models.CountManyLessThanEqualFilterNode);

			const { field, count } = filter as models.CountManyLessThanEqualFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classes");
			expect(count).toBe(1);
		});

		it("should parse for partitioned join many", async () => {
			const filter = await parseApiFilter($classesOrm, `studentRoster exists`);
			expect(filter).toBeInstanceOf(models.ExistsManyFilterNode);

			const { field, value } = filter as models.ExistsManyFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("classes.studentRoster");
			expect(value).toBeUndefined();
		});

		it("should parse for plucked join many", async () => {
			const filter = await parseApiFilter($teachersOrm, `classNames exists`);
			expect(filter).toBeInstanceOf(models.ExistsManyFilterNode);

			const { field, value } = filter as models.ExistsManyFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classNames");
			expect(value).toBeUndefined();
		});

		it("should parse for plucked join many with subquery", async () => {
			const filter = await parseApiFilter($teachersOrm, `classNames exists ($field like "a%")`);
			expect(filter).toBeInstanceOf(models.ExistsManyFilterNode);

			const { field, value } = filter as models.ExistsManyFilterNode;
			expect(field).toBeInstanceOf(models.JoinManyField);
			expect(field.toString()).toBe("teachers.classNames");

			expect(value).toBeInstanceOf(models.LikeFilterNode);
			const { left, right } = value as models.LikeFilterNode;
			expect(left.toString()).toBe("teachers.classNames.name");
			expect(right).toBe("a%");
		});
	});

	describe("grouping expressions", () => {
		it("should parse and", async () => {
			const filter = await parseApiFilter($studentsOrm, `id eq 1 and id eq 2 and id eq 3 and id eq 4`);

			expect(filter).toBeInstanceOf(models.AndFilterGroup);

			const expressions = (filter as models.AndFilterGroup).expressions;
			expect(expressions).toHaveLength(4);
		});

		it("should parse or", async () => {
			const filter = await parseApiFilter($studentsOrm, `id eq 1 or id eq 2 or id eq 3 or id eq 4`);

			expect(filter).toBeInstanceOf(models.OrFilterGroup);

			const expressions = (filter as models.OrFilterGroup).expressions;
			expect(expressions).toHaveLength(4);
		});

		it("should parse complex nested structures", async () => {
			// this should parse as ((id eq 1 or id eq 2) and id eq 3) or id eq 4
			const filter = await parseApiFilter($studentsOrm, `id eq 1 or id eq 2 and id eq 3 or id eq 4`);

			expect(filter).toBeInstanceOf(models.OrFilterGroup);

			// (...) or id eq 4
			const expressions0 = (filter as models.OrFilterGroup).expressions;
			expect(expressions0).toHaveLength(2);
			expect(expressions0[0]).toBeInstanceOf(models.AndFilterGroup);

			// (...) and id eq 3
			const expressions1 = (expressions0[0] as models.AndFilterGroup).expressions;
			expect(expressions1).toHaveLength(2);
			expect(expressions1[0]).toBeInstanceOf(models.OrFilterGroup);

			// id eq 1 or id eq 2
			const expressions2 = (expressions1[0] as models.OrFilterGroup).expressions;
			expect(expressions2).toHaveLength(2);
		});
	});

	it("should support a max depth for fields", async () => {
		const filterExpression = `students.classes.students.classes.students exists (id eq 1)`;

		const resolveFilterPromise = parseApiFilter($classesOrm, filterExpression, 5),
			rejectFilterPromise = parseApiFilter($classesOrm, filterExpression, 4);

		await expect(resolveFilterPromise).resolves.toBeDefined();
		await expect(rejectFilterPromise).rejects.toThrow();
	});

	it("should throw an error on lexer failure", async () => {
		await expect(parseApiFilter($classesOrm, "first %% line #\nsome#")).rejects.toThrow("Failed to parse");
	});

	it("should throw an error on parser failure", async () => {
		await expect(parseApiFilter($classesOrm, "eq bad expression")).rejects.toThrow("Failed to parse");
	});

	it("should throw an error on invalid field", async () => {
		await expect(parseApiFilter($classesOrm, "field.that.doesnt.exist eq 1")).rejects.toThrow("Invalid field");
	});
});
