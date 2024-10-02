import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await setTimeout(() => {
                i += 1;
                if (i >= 10) {
                    reject(new Error('Could not connect to MongoDB'));
                }
                else if (!dbClient.isAlive()) {
                    repeatFct();
                }
                else {
                    resolve();
                }
            }, 1000);
        };
        repeatFct();
    });
};

// Wrap it in a try...catch
(async () => {
    try {
        console.log(dbClient.isAlive());
        await waitConnection();
        console.log(dbClient.isAlive());
        console.log(await dbClient.nbUsers());
        console.log(await dbClient.nbFiles());
    } catch (error) {
        console.error('Error:', error);  // Catch any errors here
    }
})();
