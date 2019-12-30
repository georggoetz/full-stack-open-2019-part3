const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0-evkvi.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

/*
const person = new Person({
  name: 'Georg Goetz',
  number: '1234567890'
})

person.save().then(response => {
  console.log('person saved!')
  mongoose.connection.close()
})
*/

if (newName && newNumber) {
  const person = new Person({
    name: newName,
    number: newNumber
  })

  person
    .save()
    .then(reponse => {
      console.log(`added ${newName} number ${newNumber} to phonebook`)
      mongoose.connection.close()
    })
} else {
  Person
    .find({})
    .then(people => {
      people.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
}