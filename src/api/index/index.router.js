const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { getAll } = require('../../commonService');

router.get('/', (req, res) => {
    res.send('landing');
})

router.get('/prereqcheck', async (request, response, next) => {
    const result = await getAll();

    // // Mock API
    // const result = {
    //     data: [{
    //         event_id: 'event_id_1',
    //         enrollment_id: 'enrollment_id_1',
    //         email: 'email_1',
    //         full_name : 'fullname_1',
    //         status : 'status_1',
    //         F3: 'f3_1',
    //         ASnR: 'asnr_1',
    //         CD: 'cd_1',
    //         CCLabs: 'cclabs_1',
    //         ArchCert: 'archcert_1'
    //     }, {
    //         event_id: 'event_id_2',
    //         enrollment_id: 'enrollment_id_2',
    //         email: 'email_2',
    //         full_name : 'fullname_2',
    //         status : 'status_2',
    //         F3: 'f3_2',
    //         ASnR: 'asnr_2',
    //         CD: 'cd_2',
    //         CCLabs: 'cclabs_2',
    //         ArchCert: 'archert_2'
    //     }]
    // };
    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    // await delay(1000)
    return response.send({ data: result})
})

// router.get('/getAll', async (request, response) => {
//     const result = await getAll();
//     // res.render('prereqcheck');
//     return response.send({ data: result });
// });

module.exports = router;