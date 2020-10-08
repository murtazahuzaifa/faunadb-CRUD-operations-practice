require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query; // creating a query variable

(async () => {

    if (process.env.FAUNADB_CHILD_DB_SERVER_SECRET) {

        const client = new faunadb.Client({ secret: process.env.FAUNADB_CHILD_DB_SERVER_SECRET });

        try {
            // for creating single document
            /*var result = await client.query(
                q.Create(
                    q.Collection('products'),
                    { data: { 
                        code: 1,
                        name: 'silicone mat',
                        price: {amount:430, currency:'pkr'}
                     } },
                )
            );*/

            // for creating multiple document
            var result = await client.query(
                q.Map([
                    {
                        code: 2,
                        name: 'tea cup',
                        price: { amount: 50, currency: 'pkr' }
                    },
                    {
                        code: 3,
                        name: 'wooden tray',
                        price: { amount: 550, currency: 'pkr' }
                    },
                    {
                        code: 4,
                        name: 'sport bottle',
                        price: { amount: 430, currency: 'pkr' }
                    },
                ],
                    q.Lambda(
                        "product entry",
                        q.Create(q.Collection('products'), { data: q.Var("product entry") })
                    )
                )
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