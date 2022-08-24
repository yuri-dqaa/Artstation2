import express from 'express';
import Joi from 'joi';

const router = express.Router();
router.use(express.json());


let Users =[
    {id: 1, username: "jotaro", password: "123"},
    {id: 2, username: "kakyoin", password: "123"},
    {id: 3, username: "avdol", password: "123"},
    {id: 4, username: "polnareff", password: "123"},
];


router.get("/", (req, res) => {
    res.send(Users);
});

router.get("/:id", (req, res) => {
    let id = req.params.id;
    const user = Users.find(u => u.id === parseInt(id));
    if (!user) return res.status(404).send("User not found");
    
    res.send(user);
});

router.post("/", (req, res) => {
    const validation = isUserValid(req.body);
    if (validation.error) return res.status(400).send(result.error.details[0].message);
    
    const user = {
        id: Users.length + 1,
        username: req.body.username,
        password: req.body.password
    }

    Users.push(user);
    res.send(Users);
});

router.put("/:id", (req, res) => {
    let id = req.params.id;
    const user = Users.find(u => u.id === parseInt(id));
    if (!user) return res.status(404).send("User not found");
    
    const validation = isUserValid(req.body);
    if (validation.error) return res.status(400).send(result.error.details[0].message);

    user.username = req.body.username;
    user.password = req.body.password;
    res.send(user);
});

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    const user = Users.find(u => u.id === parseInt(id));
    if (!user) return res.status(404).send("User not found");

    res.send(`User ${user.username} has been deleted\n\n`)
    const index = Users.indexOf(user)
    Users.splice(index, 1);

    res.send(Users);
});


function isUserValid(user) {
    const schema = Joi.object ({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(3).required()
    });

    return schema.validate(user);
};



export default router;