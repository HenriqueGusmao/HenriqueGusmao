const fileSystem = require('fs');
const { join } = require('path');
const filePath = join(__dirname, 'users.json');

const getUsers = () => {
    const data = fileSystem.existsSync(filePath)
        ? fileSystem.readFileSync(filePath)
        : []

    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

const saveUser = (users) => fileSystem.writeFileSync(filePath, JSON.stringify(users, null, '\t'));

const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers();
            res.send({ users });
        })
        .post((req, res) => {
            const users = getUsers();
            users.push(req.body)
            saveUser(users);
            res.status(201).send("Salvo com sucesso!");
        })
        .put((req, res) => {
            const users = getUsers();
            console.log(users);
            saveUser(users.map(user => {
                console.log(user);
                console.log(req.params);
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user;
            }))
            res.status(200).send("Alterado com sucesso!");
        })
        .delete((req, res) => {
            const users = getUsers();
            saveUser(users.filter(user => user.id !== req.params.id));
            res.status(200).send("Deletado com sucesso!");
        })
}

module.exports = userRoute;