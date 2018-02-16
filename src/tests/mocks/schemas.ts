import { buildSchema } from "@lchemy/orm";

import { db } from "./db";

export const $schoolsSchema = buildSchema(db).defineTable("schools", (column) => {
	return {
		id: column.int("id"),
		name: column.string("name")
	};
}).withPrimaryKey((schema) => schema.id);

export const $classesSchema = buildSchema(db).defineTable("classes", (column) => {
	return {
		id: column.int("id"),
		schoolId: column.int("school_id"),
		teacherId: column.int("teacher_id"),
		name: column.string("name")
	};
}).withPrimaryKey((schema) => schema.id);

export const $teachersSchema = buildSchema(db).defineTable("teachers", (column) => {
	return {
		id: column.int("id"),
		schoolId: column.int("school_id"),
		name: column.string("name")
	};
}).withPrimaryKey((schema) => schema.id);

export const $studentsSchema = buildSchema(db).defineTable("students", (column) => {
	return {
		id: column.int("id"),
		schoolId: column.int("school_id"),
		name: column.string("name")
	};
}).withPrimaryKey((schema) => schema.id);

export const $studentsClassesSchema = buildSchema(db).defineTable("students_classes", (column) => {
	return {
		id: column.int("id"),
		studentId: column.int("student_id"),
		classId: column.int("class_id")
	};
}).withPrimaryKey((schema) => schema.id);
