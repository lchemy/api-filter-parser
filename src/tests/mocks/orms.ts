import {
	ColumnField,
	DerivedField,
	JoinManyField,
	JoinOneField,
	OrmRef,
	PartitionedJoinManyField,
	PluckedJoinManyField,
	PluckedJoinOneField,
	RelationalOrm,
	buildOrm
} from "@lchemy/orm";

import { $classesSchema, $schoolsSchema, $studentsClassesSchema, $studentsSchema, $teachersSchema } from "./schemas";

export interface SchoolsOrm extends RelationalOrm {
	id: ColumnField<number>;
	name: ColumnField<string>;

	classes: JoinManyField<ClassesOrm>;
	teachers: JoinManyField<TeachersOrm>;
	students: JoinManyField<StudentsOrm>;
}
export const $schoolsOrm: OrmRef<SchoolsOrm> = buildOrm($schoolsSchema).defineRelation("schools", ({ schema, column, join }) => {
	return {
		id: column(schema.id),
		name: column(schema.name),

		classes: join.many($classesOrm).on((classes, schools) => classes.schoolId.$eq(schools.id)),
		teachers: join.many($teachersOrm).on((teachers, schools) => teachers.schoolId.$eq(schools.id)),
		students: join.many($studentsOrm).on((students, schools) => students.schoolId.$eq(schools.id))
	};
});

export interface ClassesOrm extends RelationalOrm {
	id: ColumnField<number>;
	name: ColumnField<string>;
	fullName: DerivedField<string>;

	schoolId: ColumnField<number>;
	school: JoinOneField<SchoolsOrm>;

	teacherId: ColumnField<number>;
	teacher: JoinOneField<TeachersOrm>;
	teacherName: PluckedJoinOneField<TeachersOrm, string>;

	students: JoinManyField<StudentsOrm>;
	studentRoster: PartitionedJoinManyField<StudentsOrm, "aToM" | "nToZ">;
}
export const $classesOrm: OrmRef<ClassesOrm> = buildOrm($classesSchema).defineRelation("classes", ({ schema, column, derive, join }) => {
	return {
		id: column(schema.id),
		name: column(schema.name),
		fullName: derive(schema.id, schema.name).with((_, id, name) => {
			return `CONCAT(${ id }, ': ', ${ name })`;
		}).asString(),

		schoolId: column(schema.schoolId).exclude(),
		school: join.one($schoolsOrm).on((classes, schools) => classes.schoolId.$eq(schools.id)),

		teacherId: column(schema.teacherId).exclude(),
		teacher: join.one($teachersOrm).on((classes, teachers) => classes.teacherId.$eq(teachers.id)),
		teacherName: join.one($teachersOrm).on((classes, teachers) => classes.teacherId.$eq(teachers.id)).pluck((teachers) => teachers.name),

		students: join.many($studentsOrm).through($studentsClassesOrm, (students, studentsClasses) => {
			return students.id.$eq(studentsClasses.studentId);
		}).on((_, studentsClasses, classes) => {
			return classes.id.$eq(studentsClasses.classId);
		}),
		studentRoster: join.many($studentsOrm).through($studentsClassesOrm, (students, studentsClasses) => {
			return students.id.$eq(studentsClasses.studentId);
		}).on((_, studentsClasses, classes) => {
			return classes.id.$eq(studentsClasses.classId);
		}).partitionTo((students) => {
			return {
				aToM: students.name.$lt("n"),
				aToZ: students.name.$gte("n")
			};
		})
	};
});

export interface TeachersOrm extends RelationalOrm {
	id: ColumnField<number>;
	name: ColumnField<string>;

	schoolId: ColumnField<number>;
	school: JoinOneField<SchoolsOrm>;

	classes: JoinManyField<ClassesOrm>;
	classNames: PluckedJoinManyField<ClassesOrm, string>;
}
export const $teachersOrm: OrmRef<TeachersOrm> = buildOrm($teachersSchema).defineRelation("teachers", ({ schema, column, join }) => {
	return {
		id: column(schema.id),
		name: column(schema.name),

		schoolId: column(schema.schoolId),
		school: join.one($schoolsOrm).on((classes, schools) => classes.schoolId.$eq(schools.id)),

		classes: join.many($classesOrm).on((classes, teachers) => classes.teacherId.$eq(teachers.id)),
		classNames: join.many($classesOrm).on((classes, teachers) => classes.teacherId.$eq(teachers.id)).pluck((classes) => classes.name)
	};
});

export interface StudentsOrm extends RelationalOrm {
	id: ColumnField<number>;
	name: ColumnField<string>;

	schoolId: ColumnField<number>;
	school: JoinOneField<SchoolsOrm>;

	classes: JoinManyField<ClassesOrm>;
}
export const $studentsOrm: OrmRef<StudentsOrm> = buildOrm($studentsSchema).defineRelation("students", ({ schema, column, join }) => {
	return {
		id: column(schema.id),
		name: column(schema.name),

		schoolId: column(schema.schoolId),
		school: join.one($schoolsOrm).on((classes, schools) => classes.schoolId.$eq(schools.id)),

		classes: join.many($classesOrm).through($studentsClassesOrm, (classes, studentsClasses) => {
			return classes.id.$eq(studentsClasses.classId);
		}).on((_, studentsClasses, students) => {
			return students.id.$eq(studentsClasses.studentId);
		})
	};
});

export interface StudentsClassesOrm extends RelationalOrm {
	studentId: ColumnField<number>;
	student: JoinOneField<StudentsOrm>;

	classId: ColumnField<number>;
	class: JoinOneField<StudentsOrm>;
}
export const $studentsClassesOrm: OrmRef<StudentsClassesOrm> = buildOrm($studentsClassesSchema).defineRelation("studentsClasses", ({ schema, column, join }) => {
	return {
		id: column(schema.id)
	};
});
