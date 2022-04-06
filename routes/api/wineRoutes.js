const express = require('express')
const router = express.Router()
const fetch = (...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
 
fetch('https://api.sampleapis.com/wines/sparkling')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })
 
//all sparkling wines
//localhost:3000/sparkling
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/wines/sparkling'
 
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/wines', {
                title: 'All Sparkling Wines',
                name: 'Sparkling Wines List',
                body: 'all',
                data
            })
        })
})
 
//single-wine
//localhost:3000/whites/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/wines/sparkling/${id}`
 
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 2) {
                res.render('pages/single-wine', {
                    title: `${data.wine}`,
                    name: `${data.wine}`,
                    body: 'single',
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - Page not found',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})
 
module.exports = router