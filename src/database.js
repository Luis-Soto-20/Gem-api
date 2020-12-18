const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://luissoto:zXOBXYkDB9B3qsVd@gems-db.srieu.mongodb.net/gems?retryWrites=true&w=majority", {
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : false,
    useUnifiedTopology : true
})
.then(db => console.log('Db is connected' + db))
.then(err => console.log(err))