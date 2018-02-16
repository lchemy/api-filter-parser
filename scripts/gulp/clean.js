const gulp = require("gulp"),
	del = require("del");

gulp.task("clean:dist", () => {
	return del("dist");
});

gulp.task("clean:test", () => {
	return del("coverage");
});

gulp.task("clean:codegen", () => {
	return del("src/codegen");
});

gulp.task("clean", gulp.parallel([
	"clean:dist",
	"clean:test",
	"clean:codegen"
]));
