const express = require('express');
const app = express();


const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4002;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    let randomQuote = getRandomElement(quotes);
    randomQuote = randomQuote  
    res.send({ quote: randomQuote });
});

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        const filteredQuotes = quotes.filter(q => q.person === req.query.person);
        res.send({ quotes: filteredQuotes });
    } else {
        res.send({ quotes: quotes });
        }
});


app.post('/api/quotes', (req, res, next) => {
    const personAdd = req.query.person
    const quoteAdd = req.query.quote
    console.log({ quote: quoteAdd, person: personAdd })
    quotes.push({ quote: quoteAdd, person: personAdd })
    //res.quote.quote = quoteAdd
    //res.quote.person = personAdd
    res.send({ quote: quoteAdd, person: personAdd })
    
})


app.listen(PORT)
console.log(`listening to ${PORT}`)