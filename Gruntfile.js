module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['/lib/axios/dist/axios.standalone.js','/lib/CryptoJS/rollups/hmac-sha256.js',
                    '/lib/CryptoJS/rollups/sha256.js','/lib/CryptoJS/components/hmac.js',
                    '/lib/CryptoJS/components/enc-base64.js','/lib/url-template/url-template.js',
                    '/lib/apiGatewayCore/sigV4Client.js','/lib/apiGatewayCore/apiGatewayClient.js',
                    '/lib/apiGatewayCore/simpleHttpClient.js', '/lib/apiGatewayCore/utils.js', 'src/js/apigClient.js',
                    'src/js/api.mjs', 'src/js/transcribe.mjs', 'src/js/index.js'],
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