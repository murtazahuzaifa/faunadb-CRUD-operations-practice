require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query; // creating a query variable

(async () => {

    if (process.env.FAUNADB_CHILD_DB_SERVER_SECRET) {

        const client = new faunadb.Client({ secret: process.env.FAUNADB_CHILD_DB_SERVER_SECRET });

        try {
            var result = await client.query(
                q.CreateCollection({
                    name:'products',
                })
            );

            console.log(result);
        }
        catch (error) {
            if (error.request === 400 && error.message === 'instance already exists') {
                console.log(error);
            }
            else {
                console.log("UnKnown Error ==>>> ", error);
            }
        }

    } else {
        console.log('No FAUNADB_ADMIN_SECRET in .env file, kindly add one first');
    }

})()