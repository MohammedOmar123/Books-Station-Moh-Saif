const supertest = require("supertest")
const router = require("../src/router")

const fs = require('fs')
const path = require('path')
const { search } = require("../src/logic")

const filteredArr1 = [
  { bookName: 'Madame Bovary' },
  { bookName: 'Mrs Dalloway' },
  { bookName: 'Team Foundation Server 2008 in Action' },
  { bookName: 'Data Munging with Perl' },
  { bookName: 'LDAP Programming, Management and Integration' },
  { bookName: 'Java Foundation Classes' },
  { bookName: 'Validating Data with Validator' },
  {
    bookName: "SharePoint 2007 Developer's Guide to Business Data Catalog"
  },
  { bookName: 'Oracle8i Database Administration' },
  { bookName: 'Big Data' },
  { bookName: 'Linked Data' }
]

const filteredArr2 = [
  { bookName: 'The Book Of Job' },
  { bookName: 'The Brothers Karamazov' },
  { bookName: 'The Devil to Pay in the Backlands' },
  { bookName: 'The recognition of Shakuntala' },
  { bookName: 'Zorba the Greek' },
  { bookName: 'The Golden Notebook' },
  { bookName: 'Pippi Longstocking' },
  { bookName: 'Buddenbrooks' },
  { bookName: 'Moby Dick' },
  { bookName: 'The Book of Disquiet' },
  { bookName: 'King Lear' }
]

describe('Make Test for book handler', () => {
  test('Test for book handler filteredArr-1', (done) => {
    supertest(router).get('/books/da').expect(200).expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          expect(res.text).toBe(JSON.stringify(filteredArr1))
          done()
        }
      })
  })
  test('Test for book handler filteredArr-2', (done) => {
    supertest(router).get('/books/k').expect(200).expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          expect(res.text).toBe(JSON.stringify(filteredArr2))
          done()
        }
      })
  })
  test('Test for book handler empty Array', (done) => {
    supertest(router).get('/books/kama').expect(200).expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          expect(res.text).toBe(JSON.stringify([]))
          done()
        }
      })
  })
})


describe('Make Test for home handler', () => {
  test('result should be home.html page', (done) => {
    supertest(router).get('/home').expect(200).expect('Content-Type', 'text/html')
      .end((err, res) => {
        if (err) {
          return done(err)
        } else {
          const homeData = fs.readFileSync(path.join(__dirname, '..', 'public', 'home.html'))
          expect(res.text).toBe(homeData.toString())
          done()
        }
      })
  })
})


describe('Make Test for search function in logic.js', () => {
  test('search for "the" word in filteredArr-2', () => {
    const expected = [
      { bookName: 'The Book Of Job' },
      { bookName: 'The Brothers Karamazov' },
      { bookName: 'The Devil to Pay in the Backlands' },
      { bookName: 'The recognition of Shakuntala' },
      { bookName: 'Zorba the Greek' },
      { bookName: 'The Golden Notebook' },
      { bookName: 'The Book of Disquiet' }
    ]

    expect(search(JSON.stringify(filteredArr2), 'the')).toEqual(expected)
  })
})



describe('Make Test for public handler', done => {
  test('for this case, result should be style.css', () => {
    supertest(router).get('/public/css/style.css')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        const CssFile = fs.readFileSync(path.join(__dirname, '..', 'public/css/style.css'));
        expect(res.text).toBe(CssFile.toString());

      })
  });
  test('for this case, result should be fetch.js', () => {
    supertest(router).get('/public/js/fetch.js')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        const fetchFile = fs.readFileSync(path.join(__dirname, '..', '/public/js/fetch.js'));
        expect(res.text).toBe(fetchFile.toString());

      })
  });
  test('for this case, result should be script.js', () => {
    supertest(router).get('/public/js/script.js')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        const scriptFile = fs.readFileSync(path.join(__dirname, '..', '/public/js/script.js'));
        expect(res.text).toBe(scriptFile.toString());

      })
  });
});

describe('Make Test for notFound handler', done => {
  test('for this case, result should be notFound.html', () => {
    supertest(router).get('/public/notFound.html')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        const notFoundFile = fs.readFileSync(path.join(__dirname, '..', '/public/notFound.html'));
        expect(res.text).toBe(notFoundFile.toString());

      })

  });
})
describe('Make Test for index handler', done => {
  test('for this case, result should be index.html', () => {
    supertest(router).get('/public/index.html')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        const indexFile = fs.readFileSync(path.join(__dirname, '..', '/public/index.html'));
        expect(res.text).toBe(indexFile.toString());

      })

  });
})