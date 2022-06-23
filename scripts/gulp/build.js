const gulp = require("gulp"),
	ts = require("gulp-typescript"),
	map = require("vinyl-map"),
	merge = require("merge2"),
	shell = require("shelljs"),
	path = require("path");

gulp.task("build:package", () => {
	return gulp.src("package.json").pipe(map((pkgJson) => {
		const pkg = JSON.parse(pkgJson);

		delete pkg.private;
		delete pkg.scripts;
		delete pkg.devDependencies;
		pkg.main = "index.js";

		// const dependencies = pkg.dependencies;
		// pkg.dependencies = Object.keys(dependencies).reduce((memo, key) => {
		// 	if (dependencies[key].startsWith("file:")) {
		// 		const file = dependencies[key].substr(5);
		// 		memo[key] = `file:${ path.join("..", file) }`;
		// 	} else {
		// 		memo[key] = dependencies[key];
		// 	}
		// 	return memo;
		// }, {});

		return JSON.stringify(pkg, undefined, 2) + "\n";
	})).pipe(gulp.dest("dist"));
});

gulp.task("build:codegen", () => {
	shell.mkdir("-p", "./src/codegen");
	const out = shell.exec("antlr4ts -o ../codegen -visitor ApiFilter.g4", {
		cwd: path.join(__dirname, "../../src/grammar")
	});
	if (out.code !== 0) {
		console.error(out.stderr);
		throw new Error(`antlr4ts exited with exit code ${ out.code }`);
	}

	// need to replace all the imports with @lchemy/antlr4ts
	return gulp.src("./src/codegen/*.ts").pipe(map((code) => {
		return code.toString("utf8").replace(/(^import .+? from ')antlr4ts(.*?');/gm, "$1@lchemy/antlr4ts$2");
	})).pipe(gulp.dest("./src/codegen"));
});

gulp.task("build:ts", () => {
	const tsProject = ts.createProject("tsconfig.build.json");

	const tsResult = gulp.src([
			"./src/**/*.ts",
			"!./src/**/tests/**/*.ts",
			"!./src/**/*.spec.ts"
		])
		.pipe(tsProject());

	return merge([
		tsResult.dts,
		tsResult.js
	]).pipe(gulp.dest("dist"));
});

gulp.task("build", gulp.series(
	"clean:dist",
	"build:package",
	"build:codegen",
	"build:ts"
));
