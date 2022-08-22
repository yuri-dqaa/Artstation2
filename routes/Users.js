import express from 'express';

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
    let id = req.params.id
    const user = Users.find(u => u.id === parseInt(id))
    if (!user) return res.status(404).send("User not found");
    
    res.send(user);
});

router.post("/", (req, res) => {
    const user = {
        id: Users.length + 1,
        username: req.body.username,
        password: req.body.password
    }

    Users.push(user);
    res.send(Users);
});

router.put("/", (req, res) => {
    
});

router.delete("/", (req, res) => {
    
});


export default router;