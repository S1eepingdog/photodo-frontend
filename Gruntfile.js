module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/index.js',
                dest: 'build/js/<%=pkg.name%>-<%=pkg.version%>.min.js'
            }
        },
        //css压缩
        cssmin: {
            options: {
                report: 'gzip'
            },
            build: {
                expand: true,
                cwd: 'src/css',
                src: ['index.css'],
                dest: 'build/css'
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            build: {
                expand: true,
                cwd: 'src',
                src: ['*.html'],
                dest: 'build'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify'); //加载完成任务所需要的模块
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // 默认任务
    grunt.registerTask('default', [
        'uglify',
        'cssmin',
        'htmlmin'
    ]); //定义任务
}