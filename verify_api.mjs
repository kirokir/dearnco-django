async function run() {
    try {
        const postRes = await fetch('http://localhost:4321/api/ideas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Manual Verifier',
                email: 'manual@kinbo.tech',
                idea_title: 'API Check',
                idea_description: 'Validating Idea Submissions',
                project_type: 'web_app'
            })
        });
        const postData = await postRes.json();
        console.log('POST /api/ideas =>', postRes.status, postData);

        const getRes = await fetch('http://localhost:4321/api/ideas');
        const getData = await getRes.json();
        console.log('GET /api/ideas =>', getRes.status, 'Total Ideas:', getData.length);
        if (getData.length > 0) {
            console.log('Latest Idea:', getData[0].idea_title);
        }

        const configGet = await fetch('http://localhost:4321/api/config?key=enterprise_assets');
        const configData = await configGet.json();
        console.log('GET /api/config =>', configGet.status, configData);

        const newConfig = { ...configData, locations: 'INDIA | CHINA | GCC | TEST' };
        const configPost = await fetch('http://localhost:4321/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                key: 'enterprise_assets',
                value: newConfig
            })
        });
        const configPostData = await configPost.json();
        console.log('POST /api/config =>', configPost.status, configPostData);

    } catch (err) {
        console.error('Error:', err);
    }
}

run();
