const http = require('http');
// linux下需要root权限才能监听1024以下的端口，给了权限后需要降权。
http.createServer((req, res) => {

}).listen(80, () => {
    var env = process.env,
        uid = parseInt(env['SUDO_UID'] || process.getuid(), 10),
        gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);
    process.setgid(gid);
    process.setuid(uid);
    // 降权时必须先降GID再降UID，
});