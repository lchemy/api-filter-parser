module.exports = () => {
	return {
		files: [
			"tsconfig.json",
			"src/**/*.ts",
			{ pattern: "src/codegen/**/*.ts", instrument: false },
			"!src/**/*.spec.ts",
			"!dist/**/*.*"
		],
		tests: [
			"src/**/*.spec.ts"
		],
		filesWithNoCoverageCalculated: [
			"src/codegen/**/*.ts",
			"src/tests/**/*.ts"
		],
		env: {
			type: "node",
			runner: "node"
		},
		testFramework: "jest",
		setup: (wallaby) => {
			const path = require("path");
			wallaby.testFramework.configure({
				setupTestFrameworkScriptFile: path.join(wallaby.projectCacheDir, "src/tests/bootstrap.js")
			});
		}
	};
};
