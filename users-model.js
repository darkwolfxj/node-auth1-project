const knex = require("knex")
const knexConfig = require("./knexfile")
const users = knex(knexConfig.development)

const getUsers = () => {
    return users("users")
}
const findUser = (filter) => {
    return users("users")
        .where(filter)
}
const insert = user => {
    return users("users")
        .insert(user)
}

module.exports = {
    getUsers,
    insert
}