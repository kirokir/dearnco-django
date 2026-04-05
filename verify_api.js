const http = require('http');

const optionsIdeasPost = {
    hostname: 'localhost',
    port: 4321,
    path: '/api/ideas',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const optionsIdeasGet = {
    hostname: 'localhost',
    port: 4321,
    path: '/api/ideas',
    method: 'GET'
};

const req = http.request(optionsIdeasPost, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        console.log('Ideas POST Status:', res.statusCode);
        console.log('Ideas POST Response:', body);

        // Now GET ideas
        http.get(optionsIdeasGet, (resGet) => {
            let getBody = '';
            resGet.on('data', chunk => getBody += chunk);
            resGet.on('end', () => {
                console.log('Ideas GET Status:', resGet.statusCode);
                console.log('Ideas GET Response:', getBody.substring(0, 100) + '...');
            });
        }).on('error', console.error);

    });
});

req.on('error', console.error);

req.write(JSON.stringify({
    name: 'Test Setup',
    email: 'test@kinbo.tech',
    idea_title: 'Backend Verification',
    idea_description: 'Ensuring APIs work 100% locally',
    project_type: 'automation'
}));

req.end();
